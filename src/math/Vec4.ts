import { Mat4 } from "./Mat4";

export class Vec4 {
    public d: number[];

    public constructor(x=0, y=0, z=0, w=0) {
        this.d = [x, y, z, w];
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

    public add(rhs: Vec4): Vec4 {
        let res = new Vec4();
        res.d[0] = this.d[0] + rhs.d[0];
        res.d[1] = this.d[1] + rhs.d[1];
        res.d[2] = this.d[2] + rhs.d[2];
        res.d[3] = this.d[3] + rhs.d[3];
        return res;
    }

    public sub(rhs: Vec4): Vec4 {
        let res = new Vec4();
        res.d[0] = this.d[0] - rhs.d[0];
        res.d[1] = this.d[1] - rhs.d[1];
        res.d[2] = this.d[2] - rhs.d[2];
        res.d[3] = this.d[3] - rhs.d[3];
        return res;
    }

    public mul(rhs: Vec4): Vec4 {
        let res = new Vec4();
        res.d[0] = this.d[0] * rhs.d[0];
        res.d[1] = this.d[1] * rhs.d[1];
        res.d[2] = this.d[2] * rhs.d[2];
        res.d[3] = this.d[3] * rhs.d[3];
        return res;
    }

    public div(rhs: Vec4): Vec4 {
        let res = new Vec4();
        res.d[0] = this.d[0] / rhs.d[0];
        res.d[1] = this.d[1] / rhs.d[1];
        res.d[2] = this.d[2] / rhs.d[2];
        res.d[3] = this.d[3] / rhs.d[3];
        return res;
    }

    public scale(x: number): Vec4 {
        let res = new Vec4();
        res.d[0] = this.d[0] * x;
        res.d[1] = this.d[1] * x;
        res.d[2] = this.d[2] * x;
        res.d[3] = this.d[3] * x;
        return res;
    }

    public magnitude(): number {
        return this.d[0] * this.d[0] + 
            this.d[1] * this.d[1] + 
            this.d[2] * this.d[2] + 
            this.d[3] * this.d[3];
    }

    public normalize(): Vec4 {
        let mag = this.magnitude();
        let inv = 1.0 / mag;
        return new Vec4(
            this.d[0] * inv, 
            this.d[1] * inv, 
            this.d[2] * inv, 
            this.d[3] * inv
        );
    }

    public dot(rhs: Vec4): number {
        return this.d[0] * rhs.d[0] + 
            this.d[1] * rhs.d[1] + 
            this.d[2] * rhs.d[2] + 
            this.d[3] * rhs.d[3];
    }

    public cross(rhs: Vec4): Vec4 {
        let res = new Vec4();
        res.d[0] = this.d[1] * rhs.d[2] - this.d[2] * rhs.d[1];
        res.d[1] = this.d[2] * rhs.d[0] - this.d[0] * rhs.d[2];
        res.d[2] = this.d[0] * rhs.d[1] - this.d[1] * rhs.d[0];
        res.d[3] = 0;
        return res;
    }

    public apply(m: Mat4): Vec4 {
        let res = new Vec4();
		res.x = m.d[0][0] * this.x + m.d[0][1] * this.y + m.d[0][2] * this.z + m.d[0][3] * this.w;
		res.y = m.d[1][0] * this.x + m.d[1][1] * this.y + m.d[1][2] * this.z + m.d[1][3] * this.w;
		res.z = m.d[2][0] * this.x + m.d[2][1] * this.y + m.d[2][2] * this.z + m.d[2][3] * this.w;
		res.w = m.d[3][0] * this.x + m.d[3][1] * this.y + m.d[3][2] * this.z + m.d[3][3] * this.w;
		return res;
    }
}
