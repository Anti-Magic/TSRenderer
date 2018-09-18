import { FrameBuffer } from "./FrameBuffer";
import { Vec4 } from "./math/Vec4";
import { MeshPrimitive } from "./MeshPrimitive";
import { Draw } from "./Engine/Draw";
import { Device } from "./Device";

let device = new Device();

let fbo = new FrameBuffer(new Vec4(device.width, device.height));
for (let x = 0; x < fbo.size.x; x++) {
	for (let y = 0; y < fbo.size.y; y++) {
		fbo.setColor(new Vec4(x, y), new Vec4(0, 0, 1, 1));
	}
}

device.start(fbo, (n: number) => {
	// let cube = MeshPrimitive.cube();
	// for (let i = 0; i < cube.vertices.length; i += 3) {
	// 	let v0 = cube.vertices[i];
	// 	let v1 = cube.vertices[i+1];
	// 	let v2 = cube.vertices[i+2];
	// 	Draw.drawLine(fbo, v0.position.mul(fbo.size), v1.position.mul(fbo.size));
	// 	Draw.drawLine(fbo, v0.position.mul(fbo.size), v2.position.mul(fbo.size));
	// 	Draw.drawLine(fbo, v1.position.mul(fbo.size), v2.position.mul(fbo.size));
	// }

	let v0 = new Vec4(100, 100);
	let v1 = new Vec4(500, 100);
	let v2 = new Vec4(300, 400);
	Draw.drawLine(fbo, v0, v1);
	Draw.drawLine(fbo, v0, v2);
	Draw.drawLine(fbo, v1, v2);
});
