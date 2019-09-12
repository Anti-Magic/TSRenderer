import { Scene } from "../engine/Scene";
import { FrameBuffer } from "../FrameBuffer";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { Vec4 } from "../math/Vec4";
import { MeshPrimitive } from "../MeshPrimitive";
import { Rasterization } from "../Rasterization";
import { Device } from "../Device";
import { Mat4 } from "../math/Mat4";
import { Quat } from "../math/Quat";
import { Texture2D } from "../Texture2D";
import { TextureCube } from "../TextureCube";
import { ShaderBlinnPhong } from "../shader/ShaderBlinnPhong";
import { ShaderSimple } from "../shader/ShaderSimple";
import { ShaderTest } from "../shader/ShaderTest";
import { ShaderSkybox } from "../shader/ShaderSkybox";

export class SceneSkyboxTest extends Scene {
    public start() {
        super.start();
        let fbo = new FrameBuffer(new Vec2(this.device.width, this.device.height));
        let cameraPos = new Vec3(0, 0, -3);
        let model = new Mat4();
        // model = model.post(Mat4.rotate(Quat.fromAxisAngle(new Vec4(0, 1, 0), Math.PI / 3)));
        model = model.post(Mat4.translate(new Vec3(0, 0, -3)));
        let view = Mat4.lookAt(cameraPos, new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        // let view = Mat4.lookAt(new Vec3(0, 0, -3), new Vec3(0, 0, 0), new Vec4(0, 1, 0));
        let projection = Mat4.perspective(Math.PI / 3, 1.0 * fbo.size.x / fbo.size.y, 0.1, 1000);
        let mvp = model.post(view).post(projection);

        let meshCube = MeshPrimitive.skybox();
        let shaderCube = new ShaderSkybox();
        shaderCube.texture0 = new TextureCube([
            "res/skybox/right.jpg", "res/skybox/left.jpg",
            "res/skybox/top.jpg", "res/skybox/bottom.jpg",
            "res/skybox/back.jpg", "res/skybox/front.jpg",

            // "res/skybox2/right.jpg", "res/skybox2/left.jpg",
            // "res/skybox2/top.jpg", "res/skybox2/bottom.jpg",
            // "res/skybox2/back.jpg", "res/skybox2/front.jpg",
        ]);

        this.device.setFrameBuffer(fbo);
        this.device.start((dt: number) => {
            fbo.clear();
            let pos = Mat4.translate(new Vec3(0, 0, -0.5 * dt));
            // let rot = Mat4.rotate(Quat.fromAxisAngle(new Vec4(0, 1, 0), Math.PI / 3 * dt));
            // model = model.post(pos);
            mvp = model.post(view).post(projection);
            
            shaderCube.mvp = mvp;
        
            Rasterization.drawTriangles(fbo, shaderCube, meshCube);
        });
    }
}
