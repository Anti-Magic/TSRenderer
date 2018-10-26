import { Shader } from "../Shader";
import { Vec4 } from "../math/Vec4";
import { Vertex } from "../Vertex";
import { ShaderV2F } from "../ShaderV2F";
import { Mathf } from "../math/Mathf";

export class ShaderSimple extends Shader {
    public vert(v: Vertex): ShaderV2F {
        let o = new ShaderV2F();
        o.position = v.position.apply(this.mvp);
        o.texcoord0 = v.texcoord;
        return o;
    }

    public frag(f: ShaderV2F): Vec4 {
        let diffColor = this.texture0.getColor(f.texcoord0.x, f.texcoord0.y);
        return diffColor;
    }
}
