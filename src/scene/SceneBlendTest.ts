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

export class SceneBlendTest extends Scene {
    public start() {
        super.start();
        let fbo = new FrameBuffer(new Vec2(this.device.width, this.device.height));
        let cameraPos = new Vec3(0, 3, -3);
        let view = Mat4.lookAt(cameraPos, new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        // let view = Mat4.lookAt(new Vec3(0, 0, -3), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        let projection = Mat4.perspective(Math.PI / 3, 1.0 * fbo.size.x / fbo.size.y, 0.1, 1000);

        // alpha blend test
        let mesh1 = MeshPrimitive.quad();
        let shaderMesh1 = new ShaderTest();
        shaderMesh1.color = new Vec4(1, 0, 0, 0.4);
        let mesh2 = MeshPrimitive.quad();
        let shaderMesh2 = new ShaderTest();
        shaderMesh2.color = new Vec4(0, 1, 0, 0.4);
        
        let modelMesh1 = Mat4.translate(new Vec3(-0.2, 0, 0));
        let modelMesh2 = Mat4.translate(new Vec3(0.2, 0, -0.1));

        this.device.setFrameBuffer(fbo);
        this.device.start((dt: number) => {
            fbo.clear();

            let rot = Mat4.rotate(Quat.fromAxisAngle(new Vec3(0, 1, 0), Math.PI / 3 * dt));
            modelMesh1 = modelMesh1.post(rot);
            modelMesh2 = modelMesh2.post(rot);

            shaderMesh1.mvp = modelMesh1.post(view).post(projection);
            shaderMesh2.mvp = modelMesh2.post(view).post(projection);

            Rasterization.drawTriangles(fbo, shaderMesh2, mesh2);
        	Rasterization.drawTriangles(fbo, shaderMesh1, mesh1);
        	
        });
    }
}
