import { FrameBuffer } from "./FrameBuffer";
import { Vec4 } from "./math/Vec4";
import { MeshPrimitive } from "./MeshPrimitive";
import { Draw } from "./Draw";
import { Device } from "./Device";
import { Mat4 } from "./math/Mat4";
import { Quat } from "./math/Quat";

let device = new Device();

let fbo = new FrameBuffer(new Vec4(device.width, device.height));
for (let x = 0; x < fbo.size.x; x++) {
	for (let y = 0; y < fbo.size.y; y++) {
		fbo.setColor(new Vec4(x, y), new Vec4(0, 0, 1, 1));
	}
}

let model = new Mat4();
let view = Mat4.lookAt(new Vec4(0, 2, -3, 1), new Vec4(0, 0, 0, 1), new Vec4(0, 1, 0));
let projection = Mat4.perspective(Math.PI / 3, 1.0 * fbo.size.x / fbo.size.y, 0.1, 1000);
let mvp = model.post(view).post(projection);
let cube = MeshPrimitive.cube();
device.start(fbo, (dt: number) => {
	fbo.clear();
	let rot = Mat4.rotate(Quat.fromAxisAngle(new Vec4(0, 1, 0), Math.PI / 3 * dt));
	model = model.post(rot);
	mvp = model.post(view).post(projection);
	for (let i = 0; i < cube.vertices.length; i += 3) {
		let v0 = cube.vertices[i].position.apply(mvp);
		let v1 = cube.vertices[i+1].position.apply(mvp);
		let v2 = cube.vertices[i+2].position.apply(mvp);
		v0.x /= v0.w;
		v0.y /= v0.w;
		v0.z /= v0.w;
		v1.x /= v1.w;
		v1.y /= v1.w;
		v1.z /= v1.w;
		v2.x /= v2.w;
		v2.y /= v2.w;
		v2.z /= v2.w;
		v0.x = (v0.x + 1) * 0.5 * fbo.size.x;
		v0.y = (v0.y + 1) * 0.5 * fbo.size.y;
		v1.x = (v1.x + 1) * 0.5 * fbo.size.x;
		v1.y = (v1.y + 1) * 0.5 * fbo.size.y;
		v2.x = (v2.x + 1) * 0.5 * fbo.size.x;
		v2.y = (v2.y + 1) * 0.5 * fbo.size.y;
		Draw.drawTriangle(fbo, v0, v1, v2);
	}
});
