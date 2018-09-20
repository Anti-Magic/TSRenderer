import { Vec4 } from "./math/Vec4";

export class Texture2D {
    public size: Vec4;
    private d: Vec4[][];
    private static offScreenCanvas: HTMLCanvasElement;

    public constructor() {
        this.size = new Vec4(2, 2);
        this.d = new Array<Vec4[]>(this.size.x);
        for (let x = 0; x < this.size.x; x++) {
            this.d[x] = new Array<Vec4>(this.size.y);
            for (let y = 0; y < this.size.y; y++) {
                this.d[x][y] = new Vec4(0, 0, 0, 1);
            }
        }
    }

    public loadAsync(path: string) {
        if (Texture2D.offScreenCanvas == null) {
            Texture2D.offScreenCanvas = document.createElement('canvas') as HTMLCanvasElement;
        }

        let image = new HTMLImageElement();
        image.onload = () => {
            let context = Texture2D.offScreenCanvas.getContext('2d');
            context.drawImage(image, 0, 0);
            let imgData = context.getImageData(0, 0, image.width, image.height);

            this.size.x = image.width;
            this.size.y = image.height;
            this.d = new Array<Vec4[]>(this.size.x);
            for (let x = 0; x < this.size.x; x++) {
                this.d[x] = new Array<Vec4>(this.size.y);
                for (let y = 0; y < this.size.y; y++) {
                    let index = (x + y * image.width) * 4;
                    this.d[x][y] = new Vec4(
                        imgData.data[index],
                        imgData.data[index + 1],
                        imgData.data[index + 2],
                        imgData.data[index + 3]
                    );
                }
            }
        };
        image.src = path;
    }
}
