import { FrameBuffer } from "./FrameBuffer";
import { Vec4 } from "./math/Vec4";
import { MeshPrimitive } from "./MeshPrimitive";
import { Rasterization } from "./Rasterization";
import { Device } from "./Device";
import { Mat4 } from "./math/Mat4";
import { Quat } from "./math/Quat";
import { Texture2D } from "./Texture2D";
import { ShaderBlinnPhong } from "./shader/BlinnPhong";
import { ShaderSimple } from "./shader/ShaderSimple";
import { ShaderTest } from "./shader/ShaderTest";

let device = new Device();

let fbo = new FrameBuffer(new Vec4(device.width, device.height));
for (let x = 0; x < fbo.size.x; x++) {
	for (let y = 0; y < fbo.size.y; y++) {
		fbo.setColor(x, y, new Vec4(0, 0, 1, 1));
	}
}

let model = new Mat4();
let cameraPos = new Vec4(0, 3, -3, 1);
let view = Mat4.lookAt(cameraPos, new Vec4(0, 0, 0, 1), new Vec4(0, 1, 0));
// let view = Mat4.lookAt(new Vec4(0, 0, -3, 1), new Vec4(0, 0, 0, 1), new Vec4(0, 1, 0));
let projection = Mat4.perspective(Math.PI / 3, 1.0 * fbo.size.x / fbo.size.y, 0.1, 1000);
let mvp = model.post(view).post(projection);

let meshCube = MeshPrimitive.cube();
let shaderCube = new ShaderBlinnPhong();
shaderCube.texture0 = new Texture2D("res/container.png");
shaderCube.texture1 = new Texture2D("res/container_specular.png");

let meshGrandma = MeshPrimitive.FitnessGrandma();
let shaderGrandma = new ShaderSimple();
shaderGrandma.texture0 = new Texture2D("res/FitnessGrandma_diffuse.jpg");
shaderGrandma.texture1 = new Texture2D("res/FitnessGrandma_spec.jpg");

// alpha blend test
// let mesh1 = MeshPrimitive.quad();
// let shaderMesh1 = new ShaderTest();
// shaderMesh1.color = new Vec4(1, 0, 0, 0.4);
// let mesh2 = MeshPrimitive.quad();
// let shaderMesh2 = new ShaderTest();
// shaderMesh2.color = new Vec4(0, 1, 0, 0.4);
// let modelMesh1 = Mat4.translate(new Vec4(-0.2, 0, 0, 1));
// let modelMesh2 = Mat4.translate(new Vec4(0.2, 0, -0.1, 1));
// shaderMesh1.mvp = modelMesh1.post(view).post(projection);
// shaderMesh2.mvp = modelMesh2.post(view).post(projection);
// device.start(fbo, (dt: number) => {
// 	fbo.clear();
// 	Rasterization.drawTriangles(fbo, shaderMesh1, mesh1);
// 	Rasterization.drawTriangles(fbo, shaderMesh2, mesh2);
// });

device.start(fbo, (dt: number) => {
	fbo.clear();
	let rot = Mat4.rotate(Quat.fromAxisAngle(new Vec4(0, 1, 0), Math.PI / 3 * dt));
	model = model.post(rot);
	mvp = model.post(view).post(projection);
	
	shaderCube.mvp = mvp;
	shaderCube.mModel = model;
	shaderCube.mNormal = model.inverse().transpose();
	shaderCube.posView = cameraPos;
	shaderCube.gloss = 32;
	shaderCube.lighting.ambient = new Vec4(0.2, 0.2, 0.2, 1);
	shaderCube.lighting.color = new Vec4(1, 1, 1, 1);
	shaderCube.lighting.dir = new Vec4(2, 1, -1, 0);

	shaderGrandma.mvp = mvp;
	shaderGrandma.mModel = model;
	shaderGrandma.mNormal = model.inverse().transpose();
	shaderGrandma.posView = cameraPos;
	shaderGrandma.gloss = 32;
	shaderGrandma.lighting.ambient = new Vec4(0.2, 0.2, 0.2, 1);
	shaderGrandma.lighting.color = new Vec4(1, 1, 1, 1);
	shaderGrandma.lighting.dir = new Vec4(2, 1, -1, 0);

	Rasterization.drawTriangles(fbo, shaderCube, meshCube);
	Rasterization.drawTriangles(fbo, shaderGrandma, meshGrandma);
});
