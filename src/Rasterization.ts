import { Vec4 } from "./math/Vec4";
import { FrameBuffer } from "./FrameBuffer";
import { Vertex } from "./Vertex";
import { Mathf } from "./math/Mathf";
import { Shader } from "./Shader";
import { ShaderV2F } from "./ShaderV2F";
import { Mesh } from "./Mesh";

class RasterizationParam {
    public fbo: FrameBuffer;
    public shader: Shader;
    public v: ShaderV2F[];
    // 插值用
    public vfl: ShaderV2F;
    public vfr: ShaderV2F;
    public vfm: ShaderV2F;

    public constructor(fbo: FrameBuffer, shader: Shader) {
        this.fbo = fbo;
        this.shader = shader;
        this.v = [new ShaderV2F(), new ShaderV2F(), new ShaderV2F()];
        this.vfl = new ShaderV2F();
        this.vfr = new ShaderV2F();
        this.vfm = new ShaderV2F();
    }
}

export class Rasterization {
    public static drawLine(fbo: FrameBuffer, begin: Vec4, end: Vec4) : void {
        let dx = Math.floor(end.x) - Math.floor(begin.x);
        let dy = Math.floor(end.y) - Math.floor(begin.y);
        let ux = (dx >= 0) ? 1 : -1;
        let uy = (dy >= 0) ? 1 : -1;
        let x = Math.floor(begin.x);
        let y = Math.floor(begin.y);
        let endx = Math.floor(end.x);
        let endy = Math.floor(end.y);
        let eps = 0;
        dx = Math.abs(dx);
        dy = Math.abs(dy);
        if (dx > dy) {
            for (; x != endx; x += ux) {
                if (x >= 0 && x < fbo.size.x && y >= 0 && y < fbo.size.y) {
                    fbo.setColor(x, y, new Vec4(1, 0, 0, 1));
                }
                eps += dy;
                if ((eps << 1) >= dx) {
                    y += uy;
                    eps -= dx;
                }
            }
        }
        else {
            for (; y != endy; y += uy) {
                if (x >= 0 && x < fbo.size.x && y >= 0 && y < fbo.size.y) {
                    fbo.setColor(x, y, new Vec4(1, 0, 0, 1));
                }
                eps += dx;
                if ((eps << 1) >= dy) {
                    x += ux;
                    eps -= dy;
                }
            }
        }
    }

    public static drawTriangles(fbo: FrameBuffer, shader: Shader, mesh: Mesh) {
        let param = new RasterizationParam(fbo, shader);
        let vertices = mesh.vertices;
        let indices = mesh.indices;
        if (indices != null) {
            for (let i = 0; i < indices.length; i += 3) {
                this.drawTriangle(param, 
                    vertices[indices[i]], 
                    vertices[indices[i+1]], 
                    vertices[indices[i+2]]);
            }
        }
        else {
            for (let i = 0; i < vertices.length; i += 3) {
                this.drawTriangle(param, 
                    vertices[i], 
                    vertices[i+1], 
                    vertices[i+2]);
            }
        }
    }

    public static drawTriangle(param: RasterizationParam, v0: Vertex, v1: Vertex, v2: Vertex) {
        param.v[0] = param.shader.vert(v0);
        param.v[1] = param.shader.vert(v1);
        param.v[2] = param.shader.vert(v2);
        for (let i = 0; i < 3; i++) {
            let v = param.v[i];
            // 透视除法
            v.position.x /= v.position.w;
            v.position.y /= v.position.w;
            v.position.z /= v.position.w;

            // 注意这里w分量实际存储的是1/w，因为1/w才与xyz成正比
            v.position.w = 1.0 / v.position.w;

            v.position.x = (v.position.x + 1) * 0.5 * param.fbo.size.x;
            v.position.y = (v.position.y + 1) * 0.5 * param.fbo.size.y;
            
            // 除以w，即乘1/w，透视插值
            v.mul(v.position.w);
        }

        // profiler看下来，sort的性能较低，改成3个if排序
        // param.v.sort((a: ShaderV2F, b: ShaderV2F): number => {
        //     return a.position.y - b.position.y;
        // });
        if (param.v[2].position.y < param.v[1].position.y) {
            let tmp = param.v[2];
            param.v[2] = param.v[1];
            param.v[1] = tmp;
        }
        if (param.v[1].position.y < param.v[0].position.y) {
            let tmp = param.v[1];
            param.v[1] = param.v[0];
            param.v[0] = tmp;
        }
        if (param.v[2].position.y < param.v[1].position.y) {
            let tmp = param.v[2];
            param.v[2] = param.v[1];
            param.v[1] = tmp;
        }

        if (param.v[0].position.y == param.v[1].position.y) {
            this.drawFlatBotTriangle(param);
        }
        else if (param.v[1].position.y == param.v[2].position.y) {
            this.drawFlatTopTriangle(param);
        }
        else {
            // 先暂存
            let vd = param.v[0];
            let vm = param.v[1];
            let vu = param.v[2];
            // 多插入一个点，切成平顶和平底2个三角形
            let t = (vm.position.y - vd.position.y) / (vu.position.y - vd.position.y);
            let vEx = new ShaderV2F();
            vEx.fromLerp(vd, vu, t);
            
            param.v[0] = vd;
            param.v[1] = vm;
            param.v[2] = vEx;
            this.drawFlatTopTriangle(param);
            
            param.v[0] = vEx;
            param.v[1] = vm;
            param.v[2] = vu;
            this.drawFlatBotTriangle(param);
        }
    }

    private static drawFlatTopTriangle(param: RasterizationParam) {
        //  1-------2
        //   \     /
        //    \   /
        //     \ /
        //      0
        if (param.v[1].position.x > param.v[2].position.x) {
            let tmp = param.v[1];
            param.v[1] = param.v[2];
            param.v[2] = tmp;
        }
        
        let ys = Math.floor(param.v[0].position.y);
        let ye = Math.floor(param.v[2].position.y);
        let t = 0.0;
	    let dt = 1.0 / (ye - ys);
        for (let y = ys; y < ye; y++) {
            param.vfl.fromLerp(param.v[0], param.v[1], t);
            param.vfr.fromLerp(param.v[0], param.v[2], t);
            this.drawScanLine(param);
            t += dt;
        }
    }

    private static drawFlatBotTriangle(param: RasterizationParam) {
        //      2
        //     / \
        //    /   \
        //   /     \
        //  0-------1
        if (param.v[0].position.x > param.v[1].position.x) {
            let tmp = param.v[0];
            param.v[0] = param.v[1];
            param.v[1] = tmp;
        }
        
        let ys = Math.floor(param.v[0].position.y);
        let ye = Math.floor(param.v[2].position.y);
        let t = 0.0;
	    let dt = 1.0 / (ye - ys);
        for (let y = ys; y < ye; y++) {
            param.vfl.fromLerp(param.v[0], param.v[2], t);
            param.vfr.fromLerp(param.v[1], param.v[2], t);
            this.drawScanLine(param);
            t += dt;
        }
    }

    private static drawScanLine(param: RasterizationParam) {
        let xs = Math.floor(param.vfl.position.x);
        let xe = Math.floor(param.vfr.position.x);
        let y = Math.floor(param.vfl.position.y);
        let t = 0.0;
	    let dt = 1.0 / (xe - xs);
        for (let x = xs; x <= xe; x++) {
            param.vfm.fromLerp(param.vfl, param.vfr, t);
            
            // 为了性能，先进行深度测试，然后执行fragment shader
            // 通常做法应该是先fragment shader的
            if (param.vfm.position.z <= param.fbo.getDepth(x, y)) {
                param.vfm.mul(1.0 / param.vfm.position.w);
                let color = param.shader.frag(param.vfm);
                param.fbo.setColor(x, y, color);
                param.fbo.setDepth(x, y, param.vfm.position.z);
            }

            t += dt;
        }
    }
}
