import { Vec4 } from "./math/Vec4";
import { Mathf } from "./math/Mathf";
import { Texture } from "./Texture";

export class Texture2D extends Texture {
    public size: Vec4;
    public d: Vec4[];
    public filterMode: Texture.FilterMode;
    private static offScreenCanvas: HTMLCanvasElement;

    public constructor(path: string = null) {
        super();
        this.filterMode = Texture.FilterMode.Bilinear;
        this.size = new Vec4(2, 2);
        this.d = new Array<Vec4>(this.size.x * this.size.y);
        for (let i = 0; i < this.d.length; i++) {
            this.d[i] = new Vec4(0, 0, 0, 1);
        }
        if (path != null) {
            this.loadAsync(path);
        }
    }

    public loadAsync(path: string) {
        if (Texture2D.offScreenCanvas == null) {
            Texture2D.offScreenCanvas = document.createElement('canvas') as HTMLCanvasElement;
        }

        let image = document.createElement('img');
        image.onload = () => {
            Texture2D.offScreenCanvas.width = image.width;
            Texture2D.offScreenCanvas.height = image.height;
            let context = Texture2D.offScreenCanvas.getContext('2d');
            context.drawImage(image, 0, 0);
            let imgData = context.getImageData(0, 0, image.width, image.height);

            this.size.x = image.width;
            this.size.y = image.height;
            this.d = new Array<Vec4>(this.size.x * this.size.y);
            for (let i = 0; i < this.d.length; i++) {
                let index = i * 4;
                this.d[i] = new Vec4(
                    imgData.data[index] / 255.0,
                    imgData.data[index + 1] / 255.0,
                    imgData.data[index + 2] / 255.0,
                    imgData.data[index + 3] / 255.0
                );
            }
        };
        image.src = path;
    }

    public getColor(pos: Vec4): Vec4 {
        let x = pos.x * this.size.x;
        let y = (1.0 - pos.y) * this.size.y;
        x = Mathf.clamp(Math.floor(x), 0, this.size.x - 1);
        y = Mathf.clamp(Math.floor(y), 0, this.size.y - 1);
        if (this.filterMode == Texture.FilterMode.Point) {
            return this.d[x + y * this.size.x];
        }
        else {
            let x1 = Mathf.clamp(x + 1, 0, this.size.x - 1);
            let y1 = Mathf.clamp(y + 1, 0, this.size.y - 1);
            return this.d[x + y * this.size.x]
                .add(this.d[x1 + y * this.size.x])
                .add(this.d[x + y1 * this.size.x])
                .add(this.d[x1 + y1 * this.size.x])
                .scale(0.25);
        }
    }
}
