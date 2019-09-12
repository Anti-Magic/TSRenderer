import { Device } from "../Device"
import { FrameBuffer } from "../FrameBuffer";
import { Vec2 } from "../math/Vec2";
import { Vec4 } from "../math/Vec4";
import { Vec3 } from "../math/Vec3";
import { Ray } from "./Ray";
import { Sphere } from "./Sphere";
import { RayScene } from "./RayScene";
import { Utils } from "./Utils";
import { LambertMaterial } from "./LambertMaterial";
import { MatelMaterial } from "./MatelMaterial";
import { DielectricMaterial } from "./DielectricMaterial";
import { Mathf } from "../math/Mathf";
import { RayCamera } from "./RayCamera";
import { CheckerTexture2D } from "./CheckerTexture2D";
import { ConstantTexture2D } from "./ConstantTexture2D";
import { NoiseTexture2D } from "./NoiseTexture2D";
import { PerlinNoise } from "./PerlinNoise";
import { Texture2D } from "../Texture2D";
import { Texture } from "../Texture";
import { XYRect } from "./XYRect";
import { DiffuseLightMaterial } from "./DiffuseLightMaterial";
import { YZRect } from "./YZRect";
import { XZRect } from "./XZRect";
import { Box } from "./Box";
import { MeshPrimitive } from "../MeshPrimitive";
import { Vertex } from "../Vertex";
import { Triangle } from "./Triangle";
import { RayMesh } from "./RayMesh";

class Test {
    private device: Device;
    private camera: RayCamera;
    private scene: RayScene = new RayScene();
    private sampleCount: number = 2000;
    private tracingDepth: number = 10;
    public texture: Texture;

    private simpleScene() {
        let eye = new Vec3(-3, 2, 0);
        let target = new Vec3(-1, 0, 1);
        let fov = 75;
        let focusDist = target.sub(eye).magnitude();
        // let camera = new RayCamera(new Vec3(0, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 1, 0), 90, device.width / device.height);
        this.camera = new RayCamera(eye, target, new Vec3(0, 1, 0), fov, this.device.width / this.device.height, 0, focusDist);
        
        this.scene.addGeometry(new Sphere(new Vec3(0, 0, 1), 0.5, new LambertMaterial(new ConstantTexture2D(new Vec4(0.8, 0.3, 0.3, 1)))));
        this.scene.addGeometry(new Sphere(new Vec3(0, -100.5, 1), 100, new LambertMaterial(new ConstantTexture2D(new Vec4(0.8, 0.8, 0, 1)))));
        this.scene.addGeometry(new Sphere(new Vec3(1, 0, 1), 0.5, new MatelMaterial(new Vec4(0.8, 0.6, 0.2, 1), 0)));
        this.scene.addGeometry(new Sphere(new Vec3(-1, 0, 1), 0.5, new DielectricMaterial(1.5)));
        this.scene.addGeometry(new Sphere(new Vec3(-1, 0, 1), -0.45, new DielectricMaterial(1.5)));
    }

    private randomSphereScene() {
        let eye = new Vec3(13, 2, -3);
        let target = new Vec3(0, 0, 0);
        let fov = 20;
        let focusDist = 10;//target.sub(eye).magnitude();
        this.camera = new RayCamera(eye, target, new Vec3(0, 1, 0), fov, this.device.width / this.device.height, 0, focusDist);
        this.scene.addGeometry(new Sphere(new Vec3(0, -1000, 0), 1000, new LambertMaterial(new CheckerTexture2D(new Vec4(0.2, 0.3, 0.1, 1), new Vec4(0.9, 0.9, 0.9, 1)))));
        for (let a = -11; a < 11; a++) {
            for (let b = -11; b < 11; b++) {
                let choostMat = Math.random();
                let center = new Vec3(a + 0.9 * Math.random(), 0.2, b + 0.9 * Math.random());
                if (center.sub(new Vec3(4, 0.2, 0)).magnitude() > 0.9) {
                    if (choostMat < 0.8) {
                        this.scene.addGeometry(new Sphere(center, 0.2, new LambertMaterial(new ConstantTexture2D(new Vec4(Math.random()*Math.random(), Math.random()*Math.random(), Math.random()*Math.random(), 1)))));
                    }
                    else if (choostMat < 0.95) {
                        this.scene.addGeometry(new Sphere(center, 0.2, new MatelMaterial(new Vec4(0.5*(1+Math.random()), 0.5*(1+Math.random()), 0.5*(1+Math.random()), 1), 0)));
                    }
                    else {
                        this.scene.addGeometry(new Sphere(center, 0.2, new DielectricMaterial(1.5)));
                    }
                }
            }
        }
        this.scene.addGeometry(new Sphere(new Vec3(0, 1, 0), 1.0, new DielectricMaterial(1.5)));
        this.scene.addGeometry(new Sphere(new Vec3(-4, 1, 0), 1.0, new LambertMaterial(new ConstantTexture2D(new Vec4(0.4, 0.2, 0.1, 1)))));
        this.scene.addGeometry(new Sphere(new Vec3(4, 1, 0), 1.0, new MatelMaterial(new Vec4(0.7, 0.6, 0.5, 1), 0)));
    }

    private twoPerlinSphereScene() {
        let texture: Texture;
        if (this.texture != null) {
            texture = this.texture;
        }
        else {
            texture = new NoiseTexture2D();
        }
        this.camera = new RayCamera(new Vec3(0, 4, -25), new Vec3(0, 0, 0), new Vec3(0, 1, 0), 20, this.device.width / this.device.height, 0, 10);
        this.scene.addGeometry(new Sphere(new Vec3(0, -1000, 0), 1000, new LambertMaterial(texture)));
        this.scene.addGeometry(new Sphere(new Vec3(0, 2, 0), 2, new LambertMaterial(texture)));
    }

    private simpleLight() {
        let texture = new ConstantTexture2D(new Vec4(0, 1, 0, 1));
        this.camera = new RayCamera(new Vec3(23, 4, -3), new Vec3(0, 0, 0), new Vec3(0, 1, 0), 20, this.device.width / this.device.height, 0, 10);
        this.scene.addGeometry(new Sphere(new Vec3(0, -1000, 0), 1000, new LambertMaterial(texture)));
        // this.scene.addGeometry(new Sphere(new Vec3(0, 2, 0), 2, new LambertMaterial(texture)));
        this.scene.addGeometry(new Box(new Vec3(-2, 0, -2), new Vec3(2, 4, 2), new LambertMaterial(texture)));
        // this.scene.addGeometry(new Sphere(new Vec3(0, 7, 0), 2, new LambertMaterial(texture)));
        this.scene.addGeometry(new XYRect(3, 5, 1, 3, 2, new DiffuseLightMaterial(new ConstantTexture2D(new Vec4(4, 4, 4, 1)))));
    }

    private cornellBox() {
        this.camera = new RayCamera(new Vec3(278, 278, -800), new Vec3(278, 278, 0), new Vec3(0, 1, 0), 40, this.device.width / this.device.height, 0, 10);
        let red = new LambertMaterial(new ConstantTexture2D(new Vec4(0.65, 0.05, 0.05, 1)));
        let white = new LambertMaterial(new ConstantTexture2D(new Vec4(0.73, 0.73, 0.73, 1)));
        let green = new LambertMaterial(new ConstantTexture2D(new Vec4(0.12, 0.45, 0.15, 1)));
        let light = new DiffuseLightMaterial(new ConstantTexture2D(new Vec4(15, 15, 15, 1)));
        this.scene.addGeometry(new XZRect(213, 343, 227, 332, 554, light));
        this.scene.addGeometry(new YZRect(0, 555, 0, 555, 555, red));
        this.scene.addGeometry(new YZRect(0, 555, 0, 555, 0, green));
        this.scene.addGeometry(new XZRect(0, 555, 0, 555, 555, white));
        this.scene.addGeometry(new XZRect(0, 555, 0, 555, 0, white));
        this.scene.addGeometry(new XYRect(0, 555, 0, 555, 555, white));
        // this.scene.addGeometry(new XYRect(0, 555, 0, 555, 0, white));
        this.scene.addGeometry(new Box(new Vec3(130, 0, 65), new Vec3(295, 165, 230), white));
        this.scene.addGeometry(new Box(new Vec3(265, 0, 295), new Vec3(430, 330, 460), white));
    }

    private meshTest() {
        let texture: Texture = new ConstantTexture2D(new Vec4(1, 0, 0, 1));
        if (this.texture != null) {
            texture = this.texture;
        }
        let mesh = MeshPrimitive.FitnessGrandma();
        this.camera = new RayCamera(new Vec3(0, 0, -14), new Vec3(0, 0, 0), new Vec3(0, 1, 0), 20, this.device.width / this.device.height, 0, 10);
        // this.scene.addGeometry(new Triangle(vertices[0], vertices[1], vertices[2], new LambertMaterial(texture)));
        // this.scene.addGeometry(new Sphere(new Vec3(0, 0, 0), 5, new LambertMaterial(new ConstantTexture2D(new Vec4(1, 0, 0, 1)))));
        this.scene.addGeometry(new RayMesh(mesh, new LambertMaterial(texture)));

        let red = new LambertMaterial(new ConstantTexture2D(new Vec4(0.65, 0.05, 0.05, 1)));
        let white = new LambertMaterial(new ConstantTexture2D(new Vec4(0.73, 0.73, 0.73, 1)));
        let green = new LambertMaterial(new ConstantTexture2D(new Vec4(0.12, 0.45, 0.15, 1)));
        let light = new DiffuseLightMaterial(new ConstantTexture2D(new Vec4(2, 2, 2, 1)));
        this.scene.addGeometry(new XZRect(-1, 1, -1, 1, 1.95, light));
        this.scene.addGeometry(new YZRect(-2, 2, -2, 2, 2, red));
        this.scene.addGeometry(new YZRect(-2, 2, -2, 2, -2, green));
        this.scene.addGeometry(new XZRect(-2, 2, -2, 2, 2, white));
        this.scene.addGeometry(new XZRect(-2, 2, -2, 2, -2, white));
        this.scene.addGeometry(new XYRect(-2, 2, -2, 2, 2, white));

        this.scene.addGeometry(new Box(new Vec3(-1.06306306306, -2.0, -1.53153153153), new Vec3(0.126126126126, -0.810810810811, -0.342342342342), white));
        this.scene.addGeometry(new Box(new Vec3(-0.0900900900901, -2.0, 0.126126126126), new Vec3(1.0990990991, 0.378378378378, 1.31531531532), white));
    }

    public start() {
        this.device = new Device();
        let fbo = new FrameBuffer(new Vec2(this.device.width, this.device.height));
        this.device.setFrameBuffer(fbo);

        fbo.clear(new Vec4(0, 0, 0, 1));

        // 测试柏林噪声纹理
        // let perlin = new PerlinNoise();
        // for (let x = 0; x < this.device.width; x++) {
        //     for (let y = 0; y < this.device.height; y++) {
        //         let r = perlin.noise(new Vec3(32.0 * x / this.device.width, 32.0 * y / this.device.height, 0));
        //         let g = perlin.noise(new Vec3(37.0 * x / this.device.width, 37.0 * y / this.device.height, 0));
        //         let b = perlin.noise(new Vec3(42.0 * x / this.device.width, 42.0 * y / this.device.height, 0));
        //         fbo.setColor(x, y, new Vec4(r, g, b, 1));
        //     }
        // }
        // this.device.draw();

        // this.simpleScene();
        // this.randomSphereScene();
        // this.twoPerlinSphereScene();
        // this.simpleLight();
        // this.cornellBox();
        this.meshTest();
        
        console.time("draw");
        console.time("prepare");
        this.scene.prepareRaycast();
        console.timeEnd("prepare");
        let tttSum = this.device.width * this.device.height;
        let tttCur = 0;
        for (let x = 0; x < this.device.width; x++) {
            for (let y = 0; y < this.device.height; y++) {
                let color = new Vec4(0, 0, 0, 0);
                for (let k = 0; k < this.sampleCount; k++) {
                    let xx = (x + Math.random()) / this.device.width;
                    let yy = (y + Math.random()) / this.device.height;
                    
                    let ray = this.camera.getRay(xx, yy);
                    color = color.add(this.getColor(ray, 0));
                }
                // for (let xx = x; xx < x + 1; xx += 0.2) {
                //     for (let yy = y; yy < y + 1; yy += 0.2) {
                //         let xxx = xx / this.device.width;
                //         let yyy = yy / this.device.height;
                //         let ray = this.camera.getRay(xxx, yyy);
                //         color = color.add(this.getColor(ray, 0));
                //     }
                // }
                color = color.scale(1.0 / this.sampleCount);
                color = new Vec4(Math.sqrt(color.x), Math.sqrt(color.y), Math.sqrt(color.z), 1);
                fbo.setColor(x, y, color);

                tttCur += 1;
            }
            console.log(100.0 * tttCur / tttSum);
        }
        console.timeEnd("draw");

        // fbo.hdr2ldr();
        this.device.draw();
    }

    public getColor(ray: Ray, depth: number): Vec4 {
        let raycastInfo = this.scene.raycast(ray, 0.001, Number.MAX_VALUE);
        if (raycastInfo != null) {
            let emit = raycastInfo.material.getEmit(new Vec4(raycastInfo.uv.x, raycastInfo.uv.y, 0, 0));
            if (depth < this.tracingDepth) {
                let newRay = raycastInfo.material.getScatteredRay(ray, raycastInfo);
                if (newRay != null) {
                    // let albedo = raycastInfo.material.getAlbedo(new Vec4(raycastInfo.position.x, raycastInfo.position.y, raycastInfo.position.z, 0));
                    let albedo = raycastInfo.material.getAlbedo(new Vec4(raycastInfo.uv.x, raycastInfo.uv.y, 0, 0));
                    return emit.add(albedo.mul(this.getColor(newRay, depth + 1)));
                }
            }
            return emit;
        }
        else {
            // let t = 0.5 * ray.direction.y + 1;
            // let color = (new Vec4(1, 1, 1, 1)).scale(1 - t).add((new Vec4(0.5, 0.7, 1, 1)).scale(t));
            // color.w = 1;
            // return color;
            return new Vec4(0, 0, 0, 1);
            // return new Vec4(0.1, 0.1, 0.1, 1);
        }
    }
}

let test = new Test();
// test.texture = new Texture2D("res/Earth_Map.jpg");
// test.texture = new Texture2D("res/test.jpg");
test.texture = new Texture2D("res/FitnessGrandma_diffuse.jpg");
setTimeout(() => {
    test.start();
}, 2000);
// test.start();
