import { FrameBuffer } from "./FrameBuffer";
import { Vec4 } from "./math/Vec4";

let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let context = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

let fbo = new FrameBuffer(new Vec4(width, height));
for (let y = 0; y < height; y++) {
	for (let x = 0; x < width; x++) {
		fbo.setColor(new Vec4(x, y), new Vec4(0, 0, 1, 1));
	}
}

let buffer = new ImageData(width, height);
for (let x = 0; x < width; x++) {
	for (let y = 0; y < height; y++) {
		let color = fbo.getColor(new Vec4(x, y));
		let index = (x + y * width) * 4;
        buffer.data[index] = color.x * 255;
        buffer.data[index + 1] = color.y * 255;
        buffer.data[index + 2] = color.z * 255;
        buffer.data[index + 3] = color.w * 255;
	}
}
context.putImageData(buffer, 0, 0);
