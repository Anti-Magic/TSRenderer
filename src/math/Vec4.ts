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
        res.x = this.x + rhs.x;
        res.y = this.y + rhs.y;
        res.z = this.z + rhs.z;
        res.w = this.w + rhs.w;
        return res;
    }

    public sub(rhs: Vec4): Vec4 {
        let res = new Vec4();
        res.x = this.x - rhs.x;
        res.y = this.y - rhs.y;
        res.z = this.z - rhs.z;
        res.w = this.w - rhs.w;
        return res;
    }

    public mul(rhs: Vec4): Vec4 {
        let res = new Vec4();
        res.x = this.x * rhs.x;
        res.y = this.y * rhs.y;
        res.z = this.z * rhs.z;
        res.w = this.w * rhs.w;
        return res;
    }

    public div(rhs: Vec4): Vec4 {
        let res = new Vec4();
        res.x = this.x / rhs.x;
        res.y = this.y / rhs.y;
        res.z = this.z / rhs.z;
        res.w = this.w / rhs.w;
        return res;
    }

    public scale(x: number): Vec4 {
        let res = new Vec4();
        res.x = this.x * x;
        res.y = this.y * x;
        res.z = this.z * x;
        res.w = this.w * x;
        return res;
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + 
            this.y * this.y + 
            this.z * this.z + 
            this.w * this.w);
    }

    public normalize(): Vec4 {
        let mag = this.magnitude();
        let inv = 1.0 / mag;
        return new Vec4(
            this.x * inv, 
            this.y * inv, 
            this.z * inv, 
            this.w * inv
        );
    }

    public dot(rhs: Vec4): number {
        return this.x * rhs.x + 
            this.y * rhs.y + 
            this.z * rhs.z + 
            this.w * rhs.w;
    }

    public cross(rhs: Vec4): Vec4 {
        return new Vec4(
            this.y * rhs.z - this.z * rhs.y,
            this.z * rhs.x - this.x * rhs.z,
            this.x * rhs.y - this.y * rhs.x,
        );
    }

    public apply(m: Mat4): Vec4 {
        return new Vec4(
            this.x * m.d[0][0] + this.y * m.d[1][0] + this.z * m.d[2][0] + this.w * m.d[3][0],
            this.x * m.d[0][1] + this.y * m.d[1][1] + this.z * m.d[2][1] + this.w * m.d[3][1],
            this.x * m.d[0][2] + this.y * m.d[1][2] + this.z * m.d[2][2] + this.w * m.d[3][2],
            this.x * m.d[0][3] + this.y * m.d[1][3] + this.z * m.d[2][3] + this.w * m.d[3][3],
        );
    }

    public static lerp(start: Vec4, end: Vec4, n: number): Vec4 {
        return new Vec4(
            start.x + ((end.x - start.x) * n),
            start.y + ((end.y - start.y) * n),
            start.z + ((end.z - start.z) * n),
            start.w + ((end.w - start.w) * n),
        );
    }
}
