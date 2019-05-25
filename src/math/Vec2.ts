export class Vec2 {
    public x: number;
    public y: number;

    public constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    public add(rhs: Vec2): Vec2 {
        let res = new Vec2();
        res.x = this.x + rhs.x;
        res.y = this.y + rhs.y;
        return res;
    }

    public sub(rhs: Vec2): Vec2 {
        let res = new Vec2();
        res.x = this.x - rhs.x;
        res.y = this.y - rhs.y;
        return res;
    }

    public mul(rhs: Vec2): Vec2 {
        let res = new Vec2();
        res.x = this.x * rhs.x;
        res.y = this.y * rhs.y;
        return res;
    }

    public div(rhs: Vec2): Vec2 {
        let res = new Vec2();
        res.x = this.x / rhs.x;
        res.y = this.y / rhs.y;
        return res;
    }

    public scale(x: number): Vec2 {
        let res = new Vec2();
        res.x = this.x * x;
        res.y = this.y * x;
        return res;
    }

    public magnitude(): number {
        return Math.sqrt(
            this.x * this.x + 
            this.y * this.y
        );
    }

    public normalize(): Vec2 {
        let mag = this.magnitude();
        let inv = 1.0 / mag;
        return new Vec2(
            this.x * inv, 
            this.y * inv, 
        );
    }

    public dot(rhs: Vec2): number {
        return this.x * rhs.x + this.y * rhs.y;
    }

    public fromLerp(start: Vec2, end: Vec2, n: number) {
        this.x = start.x + (end.x - start.x) * n;
        this.y = start.y + (end.y - start.y) * n;
    }

    public static lerp(start: Vec2, end: Vec2, n: number): Vec2 {
        return new Vec2(
            start.x + (end.x - start.x) * n,
            start.y + (end.y - start.y) * n,
        );
    }
}
