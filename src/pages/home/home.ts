import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { PrintService } from '../../app/services/printer-service';
import { Printer } from '../../app/models/printers';
import { commands } from '../../app/services/print-commands';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	selectedPrinter: any = null;
	isConnected: boolean = false;

	constructor(
		public navCtrl: NavController,
		private modalCtrl: ModalController,
		private printProvider: PrintService,
		private alertCtrl: AlertController
	) {
		// this.selectedPrinter = new Printer();
		// this.selectedPrinter.name = 'pepepep';
		// this.isConnected = true;
	}

	list() {
		this.printProvider
			.getPrinterList()
			.then((datalist: Printer[]) => {
				this.showList(datalist);
			})
			.catch((err) => {
				let mno = this.alertCtrl.create({
					title: 'ERROR ' + err,
					buttons: [ 'Dismiss' ]
				});
				mno.present();
			});
	}

	connectPrinter() {
		this.printProvider.connect(this.selectedPrinter.id).subscribe(
			(data) => {
				console.log('Connected OK:' + data);
				this.isConnected = true;
				console.log('isConnected:' + this.isConnected);
			},
			(err) => {
				console.log('Connected Fail: ' + err);
				this.isConnected = false;
			},
			() => {}
		);
	}
	disconnectPrinter() {
		this.printProvider
			.disconnect()
			.then((data) => {
				console.log('Disconnected OK:' + data);
				this.isConnected = false;
			})
			.catch((err) => {
				console.log('Disconnected Fail: ' + err);
				this.isConnected = true;
			});
	}
	settings() {
		this.printProvider
			.settings()
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
			//this.connectPrinter();
		});
		mPrinters.present();
	}

	testText() {
		let printData = 'Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n';
		this.printProvider
			.testPrintText(this.selectedPrinter.id, printData)
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
		let receipt = '';
		receipt += commands.HARDWARE.HW_INIT;
		// receipt += '\x1c\x7d\x25';
		// receipt += '\x1C';
		// receipt += 'https://pyramidacceptors.com';
		// receipt += '\x0a';
		receipt +=
			'data:image/png;base64,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';

		receipt += commands.EOL;
		receipt += commands.EOL;
		receipt += commands.EOL;

		// console.log(printData);

		this.printProvider.connect(this.selectedPrinter.id).subscribe(
			(status) => {
				console.log(status);
				this.printProvider
					.testPrintText(this.selectedPrinter.id, receipt)
					.then((writeStatus) => {
						console.log('Imprimio?');
						console.log(writeStatus);
						this.printProvider.disconnect();
					})
					.catch((er) => {
						console.log('write error');
						console.log(er);
					});
			},
			(err) => {
				console.log('connect error');
				console.log(err);
			},
			() => {}
		);

		// this.printProvider
		// 	.testPrintText(this.selectedPrinter.id, datos)
		// 	.then((resp) => {
		// 		console.log('WRITE OK');
		// 		console.log(resp);
		// 	})
		// 	.catch((err) => {
		// 		console.log('WRITE ERROR');
		// 		console.log(err);
		// 	});
	}

	// testBarcode() {
	// 	var CHAR_ESC = 0x1b;
	// 	var LINE_FEED = '\n';
	// 	var CARRIAGE_RETURN = '\r';
	// 	var datos =
	// 		'! 0 50 200 500 1' +
	// 		CARRIAGE_RETURN +
	// 		LINE_FEED +
	// 		'B PDF-417 10 20 XD 3 YD 12 C 3 S 2' +
	// 		CARRIAGE_RETURN +
	// 		LINE_FEED +
	// 		'PDF Data' +
	// 		CARRIAGE_RETURN +
	// 		LINE_FEED +
	// 		CARRIAGE_RETURN +
	// 		LINE_FEED +
	// 		'ENDPDF' +
	// 		CARRIAGE_RETURN +
	// 		LINE_FEED +
	// 		'PRINT' +
	// 		CARRIAGE_RETURN +
	// 		LINE_FEED;

	// 	// console.log(printData);

	// 	this.printProvider
	// 		.testPrintText(this.selectedPrinter.id, datos)
	// 		.then((resp) => {
	// 			console.log('WRITE OK');
	// 			console.log(resp);
	// 		})
	// 		.catch((err) => {
	// 			console.log('WRITE ERROR');
	// 			console.log(err);
	// 		});
	// }
}
