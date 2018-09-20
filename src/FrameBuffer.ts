import { Vec4 } from "./math/Vec4";

export class FrameBuffer {
    public size: Vec4;
    private color: Vec4[];
    private depth: number[];
    private stencil: number[];

    public constructor(size: Vec4) {
        this.size = size;
        this.color = new Array<Vec4>(size.x * size.y);
        this.depth = new Array<number>(size.x * size.y);
        this.stencil = new Array<number>(size.x * size.y);
        this.clear();
    }

    public clear() {
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                let index = x + y * this.size.x;
                this.color[index] = new Vec4(0, 0, 0, 1);
                this.depth[index] = 0;
                this.stencil[index] = 0;
            }
        }
    }

    public setColor(pos: Vec4, value: Vec4) {
        let index = pos.x + pos.y * this.size.x;
        this.color[index] = value;
    }

    public getColor(pos: Vec4): Vec4 {
        let index = pos.x + pos.y * this.size.x;
        return this.color[index];
    }

    public setDepth(pos: Vec4, value: number) {
        let index = pos.x + pos.y * this.size.x;
        this.depth[index] = value;
    }

    public getDepth(pos: Vec4): number {
        let index = pos.x + pos.y * this.size.x;
        return this.depth[index]; 
    }

    public setStencil(pos: Vec4, value: number) {
        let index = pos.x + pos.y * this.size.x;
        this.stencil[index] = value;
    }

    public getStencil(pos: Vec4): number {
        let index = pos.x + pos.y * this.size.x;
        return this.stencil[index]; 
    }
}
