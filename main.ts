let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let context = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
context.clearRect(0, 0, width, height);
let image = context.getImageData(0, 0, width, height);
let buffer = image.data;
for(let y = 0; y < height; y++) {
	for(let x = 0; x < width; x++) {
		let index = (x + y * width) * 4;
		buffer[index] = 1.0 * 255;
		buffer[index + 1] = 0.0 * 255;
		buffer[index + 2] = 0.0 * 255;
		buffer[index + 3] = 1.0 * 255;
	}
}
context.putImageData(image, 0, 0);
