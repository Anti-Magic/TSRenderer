import { Texture } from "../Texture";
import { Vec4 } from "../math/Vec4";
import { PerlinNoise } from "./PerlinNoise";
import { Vec3 } from "../math/Vec3";

export class NoiseTexture2D extends Texture {
    private noise: PerlinNoise = new PerlinNoise();

    public getColor(pos: Vec4): Vec4 {
        let n = this.noise.noise(new Vec3(pos.x * 32.0, pos.y * 32.0));
        return new Vec4(n, n, n, 1);
    }
}
