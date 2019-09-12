class Vec41 {
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

    public add(rhs: Vec41): Vec41 {
        let res = new Vec41();
        res.x = this.x + rhs.x;
        res.y = this.y + rhs.y;
        res.z = this.z + rhs.z;
        res.w = this.w + rhs.w;
        return res;
    }
}

class Vec42 {
    public x: number;
    public y: number;
    public z: number;
    public w: number;
    
    public constructor(x=0, y=0, z=0, w=0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public add(rhs: Vec42): Vec42 {
        let res = new Vec42();
        res.x = this.x + rhs.x;
        res.y = this.y + rhs.y;
        res.z = this.z + rhs.z;
        res.w = this.w + rhs.w;
        return res;
    }
}

for (let j = 0; j < 10; j++) {

console.time("Vec41");

for (let i = 0; i < 10000000; i++) {
    let x = new Vec41(1, 2, 3, 4);
    let y = new Vec41(4, 3, 2, 1);
    let z = x.add(y);
}

console.timeEnd("Vec41");

console.time("Vec42");

for (let i = 0; i < 10000000; i++) {
    let x = new Vec42(1, 2, 3, 4);
    let y = new Vec42(4, 3, 2, 1);
    let z = x.add(y);
}

console.timeEnd("Vec42");

}