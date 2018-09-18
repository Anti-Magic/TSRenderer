import { Vec4 } from "../math/Vec4";
import { FrameBuffer } from "../FrameBuffer";

export class Draw {
    public static drawLine(fbo: FrameBuffer, begin : Vec4, end : Vec4) : void {
        let dx = end.x - begin.x;
        let dy = end.y - begin.y;
        let ux = (dx > 0) ? 1 : -1;
        let uy = (dy > 0) ? 1 : -1;
        let x = begin.x;
        let y = begin.y;
        let eps = 0;
        dx = Math.abs(dx);
        dy = Math.abs(dy);
        if (dx > dy) {
            for (x = begin.x; x != end.x; x += ux) {
                fbo.setColor(new Vec4(x, y), new Vec4(1, 0, 0, 1));
                eps += dy;
                if ((eps << 1) >= dx) {
                    y += uy; eps -= dx;
                }
            }
        }
        else {
            for (y = begin.y; y != end.y; y += uy) {
                fbo.setColor(new Vec4(x, y), new Vec4(1, 0, 0, 1));
                eps += dx;
                if ((eps << 1) >= dy) {
                    x += ux; eps -= dy;
                }
            }
        }
    }

    public static drawTriangle(begin : Vec4, end : Vec4) : void {
        
    }
}
