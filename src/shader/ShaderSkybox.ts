import { Shader } from "../Shader";
import { Vec4 } from "../math/Vec4";
import { Vertex } from "../Vertex";
import { ShaderV2F } from "../ShaderV2F";
import { Mathf } from "../math/Mathf";

export class ShaderSkybox extends Shader {
    public vert(v: Vertex): ShaderV2F {
        let o = new ShaderV2F();
        o.texcoord0 = v.position;
        o.position = v.position.apply(this.mvp);
        o.position = new Vec4(o.position.x, o.position.y, o.position.w, o.position.w);
        return o;
    }

    public frag(f: ShaderV2F): Vec4 {
        let diffColor = this.texture0.getColor(f.texcoord0);
        return diffColor;
    }
}
