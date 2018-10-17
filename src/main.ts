import { FrameBuffer } from "./FrameBuffer";
import { Vec4 } from "./math/Vec4";
import { MeshPrimitive } from "./MeshPrimitive";
import { Draw } from "./Draw";
import { Device } from "./Device";
import { Mat4 } from "./math/Mat4";
import { Quat } from "./math/Quat";
import { Shader } from "./Shader";

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
let mesh = MeshPrimitive.quad();
let shader = new Shader();
device.start(fbo, (dt: number) => {
	fbo.clear();
	let rot = Mat4.rotate(Quat.fromAxisAngle(new Vec4(0, 1, 0), Math.PI / 3 * dt));
	model = model.post(rot);
	mvp = model.post(view).post(projection);
	shader.mvp = mvp;
	Draw.drawTriangles(fbo, shader, mesh.vertices);
});
