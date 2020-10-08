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
import { Camera } from "../engine/Camera";
import { Entity } from "../engine/Entity";
import { MeshEntity } from "../engine/MeshEntity";
import { Texture } from "../Texture";

export class SceneDebug extends Scene {
    public fbo = new FrameBuffer(new Vec2(this.device.width, this.device.height));
    public camera = new Camera();
    public cube1 = new MeshEntity();
    public cube2 = new MeshEntity();

    public start() {
        super.start();
        this.device.setFrameBuffer(this.fbo);

        let cameraPos = new Vec3(0, 1, -2);
        this.camera.viewMatrix = Mat4.lookAt(cameraPos, new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        this.camera.projMatrix = Mat4.perspective(Math.PI / 3, 1.0 * this.fbo.size.x / this.fbo.size.y, 0.1, 1000);

        this.cube1.mesh = MeshPrimitive.cube();
        this.cube1.shader = new ShaderBlinnPhong();
        this.cube1.shader.texture0 = new Texture2D("res/container.png", Texture.FilterMode.Point);
        this.cube1.shader.texture1 = new Texture2D("res/container_specular.png", Texture.FilterMode.Point);
        this.cube1.shader.posView = Vec4.fromVec3(cameraPos, 0);
        this.cube1.shader.gloss = 32;
        this.cube1.shader.lighting.ambient = new Vec4(0.2, 0.2, 0.2, 1);
        this.cube1.shader.lighting.color = new Vec4(1, 1, 1, 1);
        this.cube1.shader.lighting.dir = new Vec4(0, 1, -1, 0);

        this.cube2.mesh = MeshPrimitive.cube();
        this.cube2.shader = new ShaderBlinnPhong();
        this.cube2.shader.texture0 = new Texture2D("res/container.png");
        this.cube2.shader.texture1 = new Texture2D("res/container_specular.png");
        this.cube2.shader.posView = Vec4.fromVec3(cameraPos, 0);
        this.cube2.shader.gloss = 32;
        this.cube2.shader.lighting.ambient = new Vec4(0.2, 0.2, 0.2, 1);
        this.cube2.shader.lighting.color = new Vec4(1, 1, 1, 1);
        this.cube2.shader.lighting.dir = new Vec4(0, 1, -1, 0);

        this.cube1.position = new Vec3(-1, 0, 0);
        this.cube2.position = new Vec3(1, 0, 0);
    }

    public update(dt: number) {
        this.fbo.clear();

        this.cube1.shader.mvp = this.cube1.modelMatrix.post(this.camera.viewProjMatrix);
        this.cube1.shader.mModel = this.cube1.modelMatrix;
        this.cube1.shader.mNormal = this.cube1.modelMatrix.inverse().transpose();

        this.cube2.shader.mvp = this.cube2.modelMatrix.post(this.camera.viewProjMatrix);
        this.cube2.shader.mModel = this.cube2.modelMatrix;
        this.cube2.shader.mNormal = this.cube2.modelMatrix.inverse().transpose();

        Rasterization.drawTriangles(this.fbo, this.cube1.shader, this.cube1.mesh);
        Rasterization.drawTriangles(this.fbo, this.cube2.shader, this.cube2.mesh);
    }
}
