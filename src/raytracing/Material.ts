import { Vec4 } from "../math/Vec4";
import { Ray } from "./Ray";
import { RaycastInfo } from "./RaycastInfo";

export interface Material {
    getAlbedo(pos: Vec4): Vec4;
    getScatteredRay(ray: Ray, hit: RaycastInfo): Ray;
    getEmit(pos: Vec4): Vec4;
}
