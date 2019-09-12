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

export class SceneModelTest extends Scene {
    public start() {
        super.start();
        let fbo = new FrameBuffer(new Vec2(this.device.width, this.device.height));
        let model = new Mat4();
        let cameraPos = new Vec3(0, 3, -3);
        let view = Mat4.lookAt(cameraPos, new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        // let view = Mat4.lookAt(new Vec3(0, 0, -3), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
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

        this.device.setFrameBuffer(fbo);
        this.device.start((dt: number) => {
            fbo.clear();
            let rot = Mat4.rotate(Quat.fromAxisAngle(new Vec3(0, 1, 0), Math.PI / 3 * dt));
            model = model.post(rot);
            mvp = model.post(view).post(projection);
            
            shaderCube.mvp = mvp;
            shaderCube.mModel = model;
            shaderCube.mNormal = model.inverse().transpose();
            shaderCube.posView = Vec4.fromVec3(cameraPos, 0);
            shaderCube.gloss = 32;
            shaderCube.lighting.ambient = new Vec4(0.2, 0.2, 0.2, 1);
            shaderCube.lighting.color = new Vec4(1, 1, 1, 1);
            shaderCube.lighting.dir = new Vec4(2, 1, -1, 0);

            shaderGrandma.mvp = mvp;
            shaderGrandma.mModel = model;
            shaderGrandma.mNormal = model.inverse().transpose();
            shaderGrandma.posView = Vec4.fromVec3(cameraPos, 0);
            shaderGrandma.gloss = 32;
            shaderGrandma.lighting.ambient = new Vec4(0.2, 0.2, 0.2, 1);
            shaderGrandma.lighting.color = new Vec4(1, 1, 1, 1);
            shaderGrandma.lighting.dir = new Vec4(2, 1, -1, 0);

            // Rasterization.drawTriangles(fbo, shaderCube, meshCube);
            Rasterization.drawTriangles(fbo, shaderGrandma, meshGrandma);
        });
    }
}
