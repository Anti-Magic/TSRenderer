import { Material } from "./Material";
import { Vec4 } from "../math/Vec4";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";
import { Utils } from "./Utils";
import { Mathf } from "../math/Mathf";

export class DielectricMaterial implements Material {
    // 某种介质的折射率 n 等于“光在真空中的速度（c）”跟“光在介质中的相速度（v）”之比
    // 比如水的折射率是1.33。表示光在真空中的传播速度是在水中传播速度的1.33倍
    // n1 sinθ1 = n2 sinθ2。其中n1和n2为两种介质的折射率，θ1和θ2为入射角和折射角
    private refractive: number;

    public constructor(refractive: number) {
        this.refractive = refractive;
    }

    public getAlbedo(pos: Vec4) : Vec4 {
        return new Vec4(1, 1, 1, 1);
    }

    public getScatteredRay(ray: Ray, hit: RaycastInfo) : Ray {
        let refractive = this.refractive;
        let normal = hit.normal;
        let cos = 0;
        
        // if (!hit.isFront) {
        //     hit.normal = hit.normal.scale(-1);
        // }
        // if (ray.direction.dot(hit.normal) > 0) {
        //     normal = hit.normal.scale(-1);
        //     // cos = ray.direction.dot(hit.normal) * refractive;
        //     cos = ray.direction.dot(hit.normal);
        //     cos = Math.sqrt(1 - refractive*refractive*(1-cos*cos));
        // }
        // else {
        //     refractive = 1.0 / this.refractive;
        //     cos = -ray.direction.dot(hit.normal);
        // }
        
        if (!hit.isFront) {
            cos = -ray.direction.dot(hit.normal) * refractive;
        }
        else {
            refractive = 1.0 / this.refractive;
            // 根据诱导公式，cos(π-θ) = -cos(θ)。入射向量和法向量成钝角，这里要算补角的余弦
            cos = -ray.direction.dot(hit.normal);
        }

        let reflectProb = 1.0;
        let refractVec = Mathf.refract(ray.direction, normal, refractive);
        if (refractVec != null) {
            reflectProb = Mathf.fresnelSchlick(cos, refractive);
        }
        if (Math.random() < reflectProb) {
            let reflectVec = Mathf.reflect(ray.direction, hit.normal);
            return new Ray(hit.position, reflectVec);
        }
        else {
            return new Ray(hit.position, refractVec);
        }
    }

    public getEmit(pos: Vec4): Vec4 {
        return new Vec4(0, 0, 0, 1);
    }
}
