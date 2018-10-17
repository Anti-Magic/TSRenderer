import { Vec4 } from "./math/Vec4";
import { Vertex } from "./Vertex";
import { ShaderV2F } from "./ShaderV2F";
import { Mat4 } from "./math/Mat4";

export class Shader {
    public mvp: Mat4;

    public vert(v: Vertex): ShaderV2F {
        let o = new ShaderV2F();
        o.position = v.position.apply(this.mvp);
        o.normal = v.normal;
        o.texcoord0 = v.texcoord;
        return o;
    }

    public frag(f: ShaderV2F): Vec4 {
        return new Vec4(1, 0, 0, 1);
    }
}
