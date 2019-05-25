import { Vec2 } from "./math/Vec2";
import { Vec4 } from "./math/Vec4";

export class FrameBuffer {
    public size: Vec2;
    private color: Float32Array;
    private depth: Float32Array;
    private stencil: Float32Array;

    public constructor(size: Vec2) {
        this.size = size;
        this.color = new Float32Array(size.x * size.y * 4);
        this.depth = new Float32Array(size.x * size.y);
        this.stencil = new Float32Array(size.x * size.y);
        this.clear();
    }

    public clear(color: Vec4 = null) {
        color = color || new Vec4(0, 0, 0, 1);
        for (let i = 0; i < this.depth.length; i++) {
            this.color[i*4] = color.x;
            this.color[i*4 + 1] = color.y;
            this.color[i*4 + 2] = color.z;
            this.color[i*4 + 3] = color.w;
            this.depth[i] = 0;
            this.stencil[i] = 0;
        }
    }

    public setColor(x: number, y: number, value: Vec4) {
        if (x < 0 || x >= this.size.x || y < 0 || y >= this.size.y) {
            return;
        }
        let index = (x + y * this.size.x) * 4;
        this.color[index] = value.x;
        this.color[index + 1] = value.y;
        this.color[index + 2] = value.z;
        this.color[index + 3] = value.w;
    }

    public getColor(x: number, y: number): Vec4 {
        let index = (x + y * this.size.x) * 4;
        return new Vec4(
            this.color[index],
            this.color[index + 1],
            this.color[index + 2],
            this.color[index + 3]
        );
    }

    public setDepth(x: number, y: number, value: number) {
        if (x < 0 || x >= this.size.x || y < 0 || y >= this.size.y) {
            return;
        }
        let index = x + y * this.size.x;
        this.depth[index] = value;
    }

    public getDepth(x: number, y: number): number {
        let index = x + y * this.size.x;
        return this.depth[index]; 
    }

    public setStencil(x: number, y: number, value: number) {
        if (x < 0 || x >= this.size.x || y < 0 || y >= this.size.y) {
            return;
        }
        let index = x + y * this.size.x;
        this.stencil[index] = value;
    }

    public getStencil(x: number, y: number): number {
        let index = x + y * this.size.x;
        return this.stencil[index]; 
    }
}
