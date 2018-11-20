import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Printer } from '../../app/models/printersDATECS';
import { PrinterDATAECSService } from '../../app/services/printer-datecs-service';
import { commands } from '../../app/services/print-commands';
import { TestTickets, Ticket } from '../../app/models/tickets';

@IonicPage()
@Component({
	selector: 'page-datecs',
	templateUrl: 'datecs.html'
})
export class DatecsPage {
	selectedPrinter: Printer = null;
	isConnected: boolean = false;
	qrToPrint;
	textToPrint: string = '1234567890';
	ticketList: TestTickets;

	constructor(
		public navCtrl: NavController,
		private printProvider: PrinterDATAECSService,
		private modalCtrl: ModalController
	) {}

	list() {
		this.printProvider
			.listBluetoothDevices()
			.then((datalist: Printer[]) => {
				console.log('paso');
				console.log(datalist);
				this.showList(datalist);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	connectPrinter() {
		this.printProvider
			.connect(this.selectedPrinter.address)
			.then((data) => {
				console.log('Connected OK:' + data);
			})
			.catch((err) => {
				console.log('Connected Fail: ');
				console.log(err);
				this.selectedPrinter = null;
			});
	}
	disconnectPrinter() {
		this.printProvider
			.disconnect()
			.then((data) => {
				console.log('Disconnected OK:' + data);
				this.selectedPrinter = null;
			})
			.catch((err) => {
				console.log('Disconnected Fail: ' + err);
			});
	}
	settings() {
		this.printProvider
			.getStatus()
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	showList(datalist: Printer[]) {
		const mPrinters = this.modalCtrl.create('PrinterListModalPage', { data: datalist });
		mPrinters.onDidDismiss((data: Printer) => {
			console.log(data);
			this.selectedPrinter = data;
			this.connectPrinter();
		});
		mPrinters.present();
	}

	testText() {
		``;
		console.log(this.textToPrint);
		const toPrint: string =
			commands.HARDWARE.HW_INIT +
			`{b}` +
			this.textToPrint +
			`{/b}{br}` +
			`{h}` +
			this.textToPrint +
			`{/h}{br}` +
			`{center}{w}` +
			this.textToPrint +
			`{/w}{br}{br}`;

		this.printProvider
			.printText(toPrint)
			.then((resp) => {
				console.log('WRITE OK');
				console.log(resp);
			})
			.catch((err) => {
				console.log('WRITE ERROR');
				console.log(err);
			});
	}

	testBarcode() {
		this.printProvider
			.printBarcode(this.textToPrint, 75)
			.then((status) => {
				console.log('imprimio');
				console.log(status);
			})
			.catch((err) => {
				console.log('error de impresion');
				console.log(err);
			});
		this.printProvider.write(commands.EOL);
		this.printProvider.write(commands.EOL);
		this.printProvider.write(commands.EOL);
	}

	testQRcode() {
		console.log(this.textToPrint);

		this.qrToPrint = this.textToPrint;
		setTimeout(() => {
			let qrCanvas = document.querySelector('canvas');
			let qrCanvasUrl = qrCanvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
			console.log(qrCanvasUrl);

			this.printProvider
				.printImage(qrCanvasUrl, qrCanvas.width, qrCanvas.height, 1)
				.then((status) => {
					console.log('image printing OK');
					console.log(status);
				})
				.catch((err) => {
					console.log('image printing ERROR');
					console.log(err);
				});
			this.printProvider.write(commands.EOL);
			this.printProvider.write(commands.EOL);
		}, 1000);
	}

	testImage() {
		var image = new Image();
		const me = this;
		image.onload = function() {
			var canvas = document.createElement('canvas');
			canvas.height = 200;
			canvas.width = 200;
			var context = canvas.getContext('2d');
			context.drawImage(image, 0, 0);
			var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, ''); //remove mimetype
			me.printProvider
				.printImage(imageData, canvas.width, canvas.height, 1)
				.then((status) => {
					console.log('image printing OK');
					console.log(status);
				})
				.catch((err) => {
					console.log('image printing ERROR');
					console.log(err);
				});
			me.printProvider.write(commands.EOL);
			me.printProvider.write(commands.EOL);
		};
		image.src = 'assets/imgs/lenin.jpg';
	}

	testTicketList() {
		this.ticketList = new TestTickets();

		this.ticketList.list.forEach((t: Ticket) => {
			const receipt =
				commands.HARDWARE.HW_INIT +
				`{center}{w}My Brand Company{/w}{br}` +
				commands.HORIZONTAL_LINE.HR2_58MM +
				`{left}Passenger: {i}` +
				t.Lastname +
				`, ` +
				t.name +
				`{/i}{br}` +
				`{left}{i}` +
				t.documentType +
				` ` +
				t.document +
				`{/i}{br}{br}` +
				`{center}{b}` +
				t.from +
				`{/b}{br}` +
				`{center}{b}` +
				t.to +
				`{/b}{br}` +
				`{center}{b}` +
				t.dtDeparture +
				`{/b}{br}{br}` +
				`{center}{w}` +
				t.ticket +
				`{/w}{br}`;

			// QRCode
			setTimeout(() => {
				// Pickup QR
				// let qrCanvas = document.querySelector('canvas');
				let qrCanvas = document.getElementById(t.ticket).getElementsByTagName('canvas')[0];
				let qrCanvasUrl = qrCanvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

				this.printProvider
					.printText(receipt)
					.then(() => {
						console.log('text printing OK');

						return this.printProvider.printImage(qrCanvasUrl, qrCanvas.width, qrCanvas.height, 1);
					})
					.then(() => {
						console.log('qr image printing OK');
						return this.printProvider.write(
							commands.EOL + commands.HORIZONTAL_LINE.HR_58MM + commands.EOL + commands.EOL
						);
					})
					.catch((err) => {
						console.log(err);
					});
			}, 500);
		});
	}

	// prepareCanvas(receipt: string, t: Ticket) {
	// 	return new Promise((resolve, reject) => {
	// 		setTimeout(() => {
	// 			// Pickup QR
	// 			// let qrCanvas = document.querySelector('canvas');
	// 			let qrCanvas = document.getElementById(t.ticket).getElementsByTagName('canvas')[0];
	// 			let qrCanvasUrl = qrCanvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

	// 			this.printProvider
	// 				.printText(receipt)
	// 				.then(() => {
	// 					console.log('text printing OK');

	// 					return this.printProvider.printImage(qrCanvasUrl, qrCanvas.width, qrCanvas.height, 1);
	// 				})
	// 				.then(() => {
	// 					console.log('qr image printing OK');
	// 					this.printProvider.write(commands.EOL + commands.HORIZONTAL_LINE.HR_58MM + commands.EOL + commands.EOL);
	// 					resolve();
	// 				})
	// 				.catch((err) => {
	// 					console.log(err);
	// 					reject(err);
	// 				});
	// 		}, 500);
	// 	});
	// }
}
