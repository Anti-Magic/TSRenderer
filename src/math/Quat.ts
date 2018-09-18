import { Vec4 } from "./Vec4";

export class Quat {
    public d: number[];

    public constructor(x=0, y=0, z=0, w=1) {
        this.d[0] = x;
        this.d[1] = y;
        this.d[2] = z;
        this.d[3] = w;
    }

    get x(): number {
        return this.d[0];
    }
    set x(v: number) {
        this.d[0] = v;
    }

    get y(): number {
        return this.d[1];
    }
    set y(v: number) {
        this.d[1] = v;
    }

    get z(): number {
        return this.d[2];
    }
    set z(v: number) {
        this.d[2] = v;
    }

    get w(): number {
        return this.d[3];
    }
    set w(v: number) {
        this.d[3] = v;
    }

    public static fromAxisAngle(axis: Vec4, rad: number) {
        rad = rad * 0.5;
        let s = Math.sin(rad);
        return new Quat(
            s * axis[0],
            s * axis[1],
            s * axis[2],
            Math.cos(rad)
        );
    }

    public static fromEular(v: Vec4) {
        let halfToRad = 0.5 * Math.PI / 180.0;
        let x = v.d[0] * halfToRad;
        let y = v.d[1] * halfToRad;
        let z = v.d[2] * halfToRad;
        let sx = Math.sin(x);
        let cx = Math.cos(x);
        let sy = Math.sin(y);
        let cy = Math.cos(y);
        let sz = Math.sin(z);
        let cz = Math.cos(z);
        return new Quat(
            sx * cy * cz - cx * sy * sz,
            cx * sy * cz + sx * cy * sz,
            cx * cy * sz - sx * sy * cz,
            cx * cy * cz + sx * sy * sz
        );
    }

    public mul(rhs: Quat): Quat {
        let ax = this.d[0];
        let ay = this.d[1];
        let az = this.d[2];
        let aw = this.d[3];
        let bx = rhs.d[0];
        let by = rhs.d[1];
        let bz = rhs.d[2];
        let bw = rhs.d[3];
        return new Quat(
            ax * bw + aw * bx + ay * bz - az * by,
            ay * bw + aw * by + az * bx - ax * bz,
            az * bw + aw * bz + ax * by - ay * bx,
            aw * bw - ax * bx - ay * by - az * bz
        );
    }
}
