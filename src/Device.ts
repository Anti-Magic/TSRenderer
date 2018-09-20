import { FrameBuffer } from "./FrameBuffer";
import { Vec4 } from "./math/Vec4";

export class Device {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public frameBuffer: FrameBuffer;
    public imgBuffer: ImageData;
    public mainLoop: (dt: number) => void;

    public constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.imgBuffer = new ImageData(this.width, this.height);
    }

    public start(frameBuffer: FrameBuffer, mainLoop: (dt: number) => void) {
        this.frameBuffer = frameBuffer;
        this.mainLoop = mainLoop;
        requestAnimationFrame((dt: number) => {
            this.loop(dt);
        });
    }

    private loop(dt: number) {
        this.mainLoop(dt);
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let color = this.frameBuffer.getColor(new Vec4(x, y));
                let index = (x + (this.height - y) * this.width) * 4;
                this.imgBuffer.data[index] = color.x * 255;
                this.imgBuffer.data[index + 1] = color.y * 255;
                this.imgBuffer.data[index + 2] = color.z * 255;
                this.imgBuffer.data[index + 3] = color.w * 255;
            }
        }
        this.context.putImageData(this.imgBuffer, 0, 0);
        requestAnimationFrame((dt: number) => {
            this.loop(dt);
        });
    }
}