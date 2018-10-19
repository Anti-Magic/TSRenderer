import { FrameBuffer } from "./FrameBuffer";
import { Vec4 } from "./math/Vec4";
import { MeshPrimitive } from "./MeshPrimitive";
import { Rasterization } from "./Rasterization";
import { Device } from "./Device";
import { Mat4 } from "./math/Mat4";
import { Quat } from "./math/Quat";
import { Texture2D } from "./Texture2D";
import { BlinnPhong } from "./shader/BlinnPhong";

let device = new Device();

let fbo = new FrameBuffer(new Vec4(device.width, device.height));
for (let x = 0; x < fbo.size.x; x++) {
	for (let y = 0; y < fbo.size.y; y++) {
		fbo.setColor(x, y, new Vec4(0, 0, 1, 1));
	}
}

let model = new Mat4();
let cameraPos = new Vec4(0, 2, -3, 1);
let view = Mat4.lookAt(cameraPos, new Vec4(0, 0, 0, 1), new Vec4(0, 1, 0));
// let view = Mat4.lookAt(new Vec4(0, 0, -3, 1), new Vec4(0, 0, 0, 1), new Vec4(0, 1, 0));
let projection = Mat4.perspective(Math.PI / 3, 1.0 * fbo.size.x / fbo.size.y, 0.1, 1000);
let mvp = model.post(view).post(projection);
let mesh = MeshPrimitive.cube();
let diffuse = new Texture2D();
diffuse.loadAsync("res/container.png");
let specular = new Texture2D();
specular.loadAsync("res/container_specular.png");
let shader = new BlinnPhong();
device.start(fbo, (dt: number) => {
	fbo.clear();
	let rot = Mat4.rotate(Quat.fromAxisAngle(new Vec4(0, 1, 0), Math.PI / 3 * dt));
	model = model.post(rot);
	mvp = model.post(view).post(projection);
	shader.mvp = mvp;
	shader.mModel = model;
	shader.mNormal = model.inverse().transpose();
	shader.posView = cameraPos;
	shader.gloss = 32;
	shader.lighting.ambient = new Vec4(0.2, 0.2, 0.2, 1);
	shader.lighting.color = new Vec4(1, 1, 1, 1);
	shader.lighting.dir = new Vec4(2, 1, -1, 0);
	shader.texture0 = diffuse;
	shader.texture1 = specular;
	Rasterization.drawTriangles(fbo, shader, mesh.vertices);
});
