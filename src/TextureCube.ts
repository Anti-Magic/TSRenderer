import { Vec4 } from "./math/Vec4";
import { Mathf } from "./math/Mathf";
import { Texture } from "./Texture";
import { Texture2D } from "./Texture2D";

export class TextureCube extends Texture {
    public texs: Texture2D[];

    // path: posX, negX, posY, negY, posZ, negZ
    public constructor(paths: string[] = null) {
        super();

        this.texs = new Array<Texture2D>(6);
        if (paths != null) {
            this.loadAsync(paths);
        }
    }

    public loadAsync(paths: string[]) {
        for (let i = 0; i < this.texs.length; i++) {
            if (this.texs[i] == null) {
                this.texs[i] = new Texture2D(paths[i]);
            }
            else {
                this.texs[i].loadAsync(paths[i]);
            }
        }
    }

    public getColor(pos: Vec4): Vec4 {
        let absx = Math.abs(pos.x);
        let absy = Math.abs(pos.y);
        let absz = Math.abs(pos.z);
        let texIdx;
        let sc;
        let tc;
        let ma;
        if (absx >= absy && absx >= absz) {
            ma = absx;
            // posX
            if (pos.x > 0) {
                texIdx = 0;
                sc = -pos.z;
                tc = -pos.y;
            }
            // negX
            else {
                texIdx = 1;
                sc = pos.z;
                tc = -pos.y;
            }
        }
        else if (absy >= absx && absy >= absz) {
            ma = absy;
            // posY
            if (pos.y > 0) {
                texIdx = 2;
                sc = pos.x;
                tc = pos.z;
            }
            // negY
            else {
                texIdx = 3;
                sc = pos.x;
                tc = -pos.z;
            }
        }
        else if (absz >= absx && absz >= absy) {
            ma = absz;
            // posZ
            if (pos.z > 0) {
                texIdx = 4;
                sc = pos.x;
                tc = -pos.y;
            }
            // negZ
            else {
                texIdx = 5;
                sc = -pos.x;
                tc = -pos.y;
            }
        }
        let s = 0.5 * (sc / ma + 1);
        let t = 0.5 * (tc / ma + 1);
        return this.texs[texIdx].getColor(new Vec4(s, t));
    }
}
