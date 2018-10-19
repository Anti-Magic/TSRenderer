import { Vec4 } from "./math/Vec4";
import { Vertex } from "./Vertex";
import { ShaderV2F } from "./ShaderV2F";
import { Mat4 } from "./math/Mat4";
import { Texture2D } from "./Texture2D";

class Lighting {
    public ambient: Vec4;
    public dir: Vec4;
    public color: Vec4;
}

export abstract class Shader {
    public mvp: Mat4;
    public mModel: Mat4;
    public mNormal: Mat4;
    public posView: Vec4;
    public gloss: number;
    public lighting: Lighting;
    public texture0: Texture2D;
    public texture1: Texture2D;

    public constructor() {
        this.lighting = new Lighting();
    }

    public abstract vert(v: Vertex): ShaderV2F;
    public abstract frag(f: ShaderV2F): Vec4;
}
