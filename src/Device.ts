import { FrameBuffer } from "./FrameBuffer";
import { Mathf } from "./math/Mathf";

export class Device {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public frameBuffer: FrameBuffer;
    public imgBuffer: ImageData;
    public mainLoop: (dt: number) => void;
    private lastTime: number;

    public constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.imgBuffer = new ImageData(this.width, this.height);
    }

    public setFrameBuffer(frameBuffer: FrameBuffer) {
        this.frameBuffer = frameBuffer;
    }

    public startLoop(mainLoop: (dt: number) => void) {
        this.mainLoop = mainLoop;
        this.lastTime = 0;
        requestAnimationFrame((timestamp: number) => {
            this.loop(timestamp);
        });
    }

    private loop(timestamp: number) {
        let dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        this.mainLoop(dt);
        this.draw();
        requestAnimationFrame((timestamp: number) => {
            this.loop(timestamp);
        });
    }

    public draw() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let color = this.frameBuffer.getColor(x, y);
                let index = (x + (this.height - y) * this.width) * 4;
                this.imgBuffer.data[index] = Mathf.clamp(color.x * 255, 0, 255);
                this.imgBuffer.data[index + 1] = Mathf.clamp(color.y * 255, 0, 255);
                this.imgBuffer.data[index + 2] = Mathf.clamp(color.z * 255, 0, 255);
                this.imgBuffer.data[index + 3] = Mathf.clamp(color.w * 255, 0, 255);
            }
        }
        this.context.putImageData(this.imgBuffer, 0, 0);
    }
}
