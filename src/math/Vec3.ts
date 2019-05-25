import { Vec2 } from "../math/Vec2";

export class Vec3 {
    public x: number;
    public y: number;
    public z: number;

    public constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(rhs: Vec3): Vec3 {
        let res = new Vec3();
        res.x = this.x + rhs.x;
        res.y = this.y + rhs.y;
        res.z = this.z + rhs.z;
        return res;
    }

    public sub(rhs: Vec3): Vec3 {
        let res = new Vec3();
        res.x = this.x - rhs.x;
        res.y = this.y - rhs.y;
        res.z = this.z - rhs.z;
        return res;
    }

    public mul(rhs: Vec3): Vec3 {
        let res = new Vec3();
        res.x = this.x * rhs.x;
        res.y = this.y * rhs.y;
        res.z = this.z * rhs.z;
        return res;
    }

    public div(rhs: Vec3): Vec3 {
        let res = new Vec3();
        res.x = this.x / rhs.x;
        res.y = this.y / rhs.y;
        res.z = this.z / rhs.z;
        return res;
    }

    public scale(x: number): Vec3 {
        let res = new Vec3();
        res.x = this.x * x;
        res.y = this.y * x;
        res.z = this.z * x;
        return res;
    }

    public magnitude(): number {
        return Math.sqrt(
            this.x * this.x + 
            this.y * this.y + 
            this.z * this.z
        );
    }

    public normalize(): Vec3 {
        let mag = this.magnitude();
        let inv = 1.0 / mag;
        return new Vec3(
            this.x * inv, 
            this.y * inv, 
            this.z * inv
        );
    }

    public dot(rhs: Vec3): number {
        return this.x * rhs.x + 
            this.y * rhs.y + 
            this.z * rhs.z;
    }

    public cross(rhs: Vec3): Vec3 {
        return new Vec3(
            this.y * rhs.z - this.z * rhs.y,
            this.z * rhs.x - this.x * rhs.z,
            this.x * rhs.y - this.y * rhs.x
        );
    }

    public fromLerp(start: Vec3, end: Vec3, n: number) {
        this.x = start.x + (end.x - start.x) * n;
        this.y = start.y + (end.y - start.y) * n;
        this.z = start.z + (end.z - start.z) * n;
    }

    public static lerp(start: Vec3, end: Vec3, n: number): Vec3 {
        return new Vec3(
            start.x + (end.x - start.x) * n,
            start.y + (end.y - start.y) * n,
            start.z + (end.z - start.z) * n
        );
    }

    public static fromVec2(v: Vec2, z: number) {
        return new Vec3(v.x, v.y, z);
    }
}
