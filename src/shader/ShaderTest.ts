import { Shader } from "../Shader";
import { Vec4 } from "../math/Vec4";
import { Vertex } from "../Vertex";
import { ShaderV2F } from "../ShaderV2F";
import { Mathf } from "../math/Mathf";

export class ShaderTest extends Shader {
    public color: Vec4;
    
    public vert(v: Vertex): ShaderV2F {
        let o = new ShaderV2F();
        o.position = v.position.apply(this.mvp);
        return o;
    }

    public frag(f: ShaderV2F): Vec4 {
        return this.color;
    }
}
