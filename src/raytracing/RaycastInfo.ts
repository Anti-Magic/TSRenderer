import { Vec3 } from "../math/Vec3";
import { Material } from "./Material";
import { Vec2 } from "../math/Vec2";

export class RaycastInfo {
    public distance: number;
    public position: Vec3;
    public normal: Vec3;
    public uv: Vec2;
    public material: Material;
    public isFront: boolean;
}
