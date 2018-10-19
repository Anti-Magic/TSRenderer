import { Vec4 } from "./math/Vec4";
import { Vertex } from "./Vertex";
import { ShaderV2F } from "./ShaderV2F";
import { Mat4 } from "./math/Mat4";
import { Texture2D } from "./Texture2D";
import { Mathf } from "./math/Mathf";

export class Shader {
    public mvp: Mat4;
    public texture0: Texture2D;
    public texture1: Texture2D;

    public vert(v: Vertex): ShaderV2F {
        let o = new ShaderV2F();
        o.position = v.position.apply(this.mvp);
        o.normal = v.normal;
        o.texcoord0 = v.texcoord;
        return o;
    }

    public frag(f: ShaderV2F): Vec4 {
        let diffuse = this.texture0.getColor(f.texcoord0.x, f.texcoord0.y);
        return diffuse;
    }
}
