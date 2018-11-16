import { Injectable } from '@angular/core';

declare let DatecsPrinter: any;
declare var window: any;

@Injectable()
export class PrinterDATAECSService {
	public listBluetoothDevices() {
		return new Promise((resolve, reject) => {
			window.DatecsPrinter.listBluetoothDevices(
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public connect(address) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.connect(
				address,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public disconnect() {
		return new Promise((resolve, reject) => {
			DatecsPrinter.disconnect(
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public feedPaper(lines) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.feedPaper(
				lines,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public printText(text, charset = 'UTF-8') {
		// ISO-8859-1
		return new Promise((resolve, reject) => {
			DatecsPrinter.printText(
				text,
				charset,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}
	public setBarcode(align, small, scale, hri, height) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.setBarcode(
				align,
				small,
				scale,
				hri,
				height,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public printBarcode(data, type = 73) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.printBarcode(
				type,
				data,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public printQRCode() {
		return new Promise((resolve, reject) => {
			DatecsPrinter.setBarcode(1, false, 2, 0, 100);
			DatecsPrinter.printQRCode(
				4, // qr code size
				2, // qr code error correction
				'http://www.datecs.bg', // barcode data
				function() {
					resolve('success!');
				},
				function(err) {
					reject(err);
				}
			);
		});
	}

	public printSelfTest() {
		return new Promise((resolve, reject) => {
			DatecsPrinter.printSelfTest(
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public getStatus() {
		return new Promise((resolve, reject) => {
			DatecsPrinter.getStatus(
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public getTemperature() {
		return new Promise((resolve, reject) => {
			DatecsPrinter.getTemperature(
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public printImage(image, width, height, align) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.printImage(
				image,
				width,
				height,
				align,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public drawPageRectangle(x, y, width, height, fillMode) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.drawPageRectangle(
				x,
				y,
				width,
				height,
				fillMode,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public drawPageFrame(x, y, width, height, fillMode, thickness) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.drawPageFrame(
				x,
				y,
				width,
				height,
				fillMode,
				thickness,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public selectPageMode() {
		return new Promise((resolve, reject) => {
			DatecsPrinter.selectPageMode(
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public selectStandardMode() {
		return new Promise((resolve, reject) => {
			DatecsPrinter.selectStandardMode(
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public setPageRegion(x, y, width, height, direction) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.setPageRegion(
				x,
				y,
				width,
				height,
				direction,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public printPage() {
		return new Promise((resolve, reject) => {
			DatecsPrinter.printPage(
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public write(bytes) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.write(
				bytes,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}

	public writeHex(hex) {
		return new Promise((resolve, reject) => {
			DatecsPrinter.writeHex(
				hex,
				function(success) {
					resolve(success);
				},
				function(error) {
					reject(error);
				}
			);
		});
	}
}
