import { Vec3 } from "../math/Vec3";
import { Mathf } from "../math/Mathf";
import { Utils } from "./Utils";

export class PerlinNoise {
    // 0-255 shuffle后的排列表(permutation table)
    public perm: number[];

    public constructor() {
        this.perm = this.generatePerm();
    }

    public noise(p: Vec3): number {
        // 整数部分
        let X0 = Math.floor(p.x) & 255;
        let Y0 = Math.floor(p.y) & 255;
        let Z0 = Math.floor(p.z) & 255;
        let X1 = (X0 + 1) & 255;
        let Y1 = (Y0 + 1) & 255;
        let Z1 = (Z0 + 1) & 255;
        // 小数部分
        let x0 = p.x - Math.floor(p.x);
        let y0 = p.y - Math.floor(p.y);
        let z0 = p.z - Math.floor(p.z);
        let x1 = x0 - 1;
        let y1 = y0 - 1;
        let z1 = z0 - 1;
        // 计算平滑插值
        let u = this.fade(x0);
        let v = this.fade(y0);
        let w = this.fade(z0);
        // 8个顶点与顶点指向(x,y,z)的向量的点乘
        let n000 = this.calcGradientDotV(X0, Y0, Z0, x0, y0, z0);
        let n100 = this.calcGradientDotV(X1, Y0, Z0, x1, y0, z0);
        let n010 = this.calcGradientDotV(X0, Y1, Z0, x0, y1, z0);
        let n001 = this.calcGradientDotV(X0, Y0, Z1, x0, y0, z1);
        let n110 = this.calcGradientDotV(X1, Y1, Z0, x1, y1, z0);
        let n101 = this.calcGradientDotV(X1, Y0, Z1, x1, y0, z1);
        let n011 = this.calcGradientDotV(X0, Y1, Z1, x0, y1, z1);
        let n111 = this.calcGradientDotV(X1, Y1, Z1, x1, y1, z1);

        let k0 = n000;
        let k1 = (n100 - n000);
        let k2 = (n010 - n000);
        let k3 = (n001 - n000);
        let k4 = (n000 + n110 - n100 - n010);
        let k5 = (n000 + n101 - n100 - n001);
        let k6 = (n000 + n011 - n010 - n001);
        let k7 = (n100 + n010 + n001 + n111 - n000 - n110 - n101 - n011);
        let res = k0 + k1 * u + k2 * v + k3 * w + k4 * u * v + k5 * u * w + k6 * v * w + k7 * u * v * w; 

        // 等价于下面的做法
        // // 对8个点乘结果线性插值
        // // 沿x方向插值
        // let nx00 = Mathf.lerp(n000, n100, u);
        // let nx01 = Mathf.lerp(n001, n101, u);
        // let nx10 = Mathf.lerp(n010, n110, u);
        // let nx11 = Mathf.lerp(n011, n111, u);
        // // 沿y方向插值
        // let nxy0 = Mathf.lerp(nx00, nx10, v);
        // let nxy1 = Mathf.lerp(nx01, nx11, v);
        // // 沿z方向插值
        // let nxyz = Mathf.lerp(nxy0, nxy1, w);
        // let res = nxyz;

        // 映射到[0, 1]
        return Mathf.clamp(res, -1, 1) * 0.5 + 0.5;
    }

    private generatePerm(): number[] {
        let perm = [];
        for (let i = 0; i < 256; i++) {
            perm[i] = i;
        }
        // shuffle
        for (let i = 255; i >= 0; i--) {
            let idx = Math.floor(Math.random() * (i + 1));
            let tmp = perm[idx];
            perm[idx] = perm[i];
            perm[i] = tmp;
        }
        // 拷贝一份，省掉取余操作
        for (let i = 256; i < 512; i++) {
            perm[i] = perm[i - 256];
        }
        return perm;
    }

    private hash(X: number, Y: number, Z: number): number {
        return this.perm[this.perm[this.perm[X] + Y] + Z];
    }

    // (X, Y, Z)是晶格顶点，(x, y, z)是被顶点指向的向量。函数返回顶点的梯度向量和被指向向量的点积
    private calcGradientDotV(X: number, Y: number, Z: number, x: number, y: number, z: number): number {
        let perm = this.hash(X, Y, Z);
        switch (perm & 15) {
            case 0: return x + y; // (1,1,0)
            case 1: return -x + y; // (-1,1,0)
            case 2: return x - y; // (1,-1,0)
            case 3: return -x - y; // (-1,-1,0)
            case 4: return x + z; // (1,0,1)
            case 5: return -x + z; // (-1,0,1)
            case 6: return x - z; // (1,0,-1)
            case 7: return -x - z; // (-1,0,-1)
            case 8: return y + z; // (0,1,1)
            case 9: return -y + z; // (0,-1,1)
            case 10: return y - z; // (0,1,-1)
            case 11: return -y - z; // (0,-1,-1)
            case 12: return x + y; // (1,1,0)
            case 13: return -x + y; // (-1,1,0)
            case 14: return -y + z; // (0,-1,1)
            case 15: return -y - z; // (0,-1,-1)
            default: return 0; // never
        }
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
}
