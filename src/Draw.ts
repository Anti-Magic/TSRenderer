import { Vec4 } from "./math/Vec4";
import { FrameBuffer } from "./FrameBuffer";
import { Vertex } from "./Vertex";
import { Mathf } from "./math/Mathf";
import { Shader } from "./Shader";
import { ShaderV2F } from "./ShaderV2F";

class DrawCallModel {
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

    public beforeRaster() {
        for (let i = 0; i < 3; i++) {
            let v = this.v[i];
            v.position.x /= v.position.w;
            v.position.y /= v.position.w;
            v.position.z /= v.position.w;

            // 注意这里w分量实际存储的是1/w，因为1/w才与xyz成正比
            v.position.w = 1.0 / v.position.w;

            v.position.x = (v.position.x + 1) * 0.5 * this.fbo.size.x;
            v.position.y = (v.position.y + 1) * 0.5 * this.fbo.size.y;
            v.mul(1.0 / v.position.w);
        }
    }
}

export class Draw {
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
                    fbo.setColor(new Vec4(x, y), new Vec4(1, 0, 0, 1));
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
                    fbo.setColor(new Vec4(x, y), new Vec4(1, 0, 0, 1));
                }
                eps += dx;
                if ((eps << 1) >= dy) {
                    x += ux;
                    eps -= dy;
                }
            }
        }
    }

    public static drawTriangles(fbo: FrameBuffer, shader: Shader, vertices: Vertex[]) {
        let data = new DrawCallModel(fbo, shader);
        for (let i = 0; i < vertices.length; i += 3) {
            data.v[0] = shader.vert(vertices[i]);
            data.v[1] = shader.vert(vertices[i+1]);
            data.v[2] = shader.vert(vertices[i+2]);
            data.beforeRaster();
            data.v.sort((a: ShaderV2F, b: ShaderV2F): number => {
                return a.position.y - b.position.y;
            });
            if (data.v[0] == data.v[1]) {
                this.drawFlatBotTriangle(data);
            }
            else if (data.v[1] == data.v[2]) {
                this.drawFlatTopTriangle(data);
            }
            else {
                // 先暂存
                let vd = data.v[0];
                let vm = data.v[1];
                let vu = data.v[2];
                // 多插入一个点，切成平顶和平底2个三角形
                let t = (vm.position.y - vd.position.y) / (vu.position.y - vd.position.y);
                let vEx = new ShaderV2F();
                vEx.fromLerp(vd, vu, t);
                
                data.v[0] = vd;
                data.v[1] = vm;
                data.v[2] = vEx;
                this.drawFlatTopTriangle(data);
                
                data.v[0] = vEx;
                data.v[1] = vm;
                data.v[2] = vu;
                this.drawFlatBotTriangle(data);
            }
        }
    }

    private static drawFlatTopTriangle(data: DrawCallModel) {
        //  1-------2
        //   \     /
        //    \   /
        //     \ /
        //      0
        if (data.v[1].position.x > data.v[2].position.x) {
            let tmp = data.v[1];
            data.v[1] = data.v[2];
            data.v[2] = tmp;
        }
        
        let ys = Math.floor(data.v[0].position.y);
        let ye = Math.floor(data.v[2].position.y);
        let t = 0.0;
	    let dt = 1.0 / (ye - ys);
        for (let y = ys; y < ye; y++) {
            data.vfl.fromLerp(data.v[0], data.v[1], t);
            data.vfr.fromLerp(data.v[0], data.v[2], t);
            this.drawScanLine(data);
            t += dt;
        }
    }

    private static drawFlatBotTriangle(data: DrawCallModel) {
        //      2
        //     / \
        //    /   \
        //   /     \
        //  0-------1
        if (data.v[0].position.x > data.v[1].position.x) {
            let tmp = data.v[0];
            data.v[0] = data.v[1];
            data.v[1] = tmp;
        }
        
        let ys = Math.floor(data.v[0].position.y);
        let ye = Math.floor(data.v[2].position.y);
        let t = 0.0;
	    let dt = 1.0 / (ye - ys);
        for (let y = ys; y < ye; y++) {
            data.vfl.fromLerp(data.v[0], data.v[2], t);
            data.vfr.fromLerp(data.v[1], data.v[2], t);
            this.drawScanLine(data);
            t += dt;
        }
    }

    private static drawScanLine(data: DrawCallModel) {
        let xs = Math.floor(data.vfl.position.x);
        let xe = Math.floor(data.vfr.position.x);
        let y = Math.floor(data.vfl.position.y);
        for (let x = xs; x <= xe; x++) {
            data.fbo.setColor(new Vec4(x, y, 0, 1), new Vec4(0, 1, 0, 1));
        }
    }
}
