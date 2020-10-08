import { Vec3 } from "../math/Vec3";
import { Quat } from "../math/Quat";
import { Mat4 } from "../math/Mat4";
import { Mesh } from "../Mesh";
import { Shader } from "../Shader";
import { Entity } from "./Entity";

export class MeshEntity extends Entity {
    public mesh: Mesh;
    public shader: Shader;
}
