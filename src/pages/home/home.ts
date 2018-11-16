import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { PrintService } from '../../app/services/printer-service';
import { Printer, PRINTER_CMD } from '../../app/models/printers';

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
			this.connectPrinter();
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
		var CHAR_ESC = 0x1b;
		var LINE_FEED = '\n';
		var CARRIAGE_RETURN = '\r';
		var datos =
			'! 0 50 200 500 1' +
			CARRIAGE_RETURN +
			LINE_FEED +
			'B PDF-417 10 20 XD 3 YD 12 C 3 S 2' +
			CARRIAGE_RETURN +
			LINE_FEED +
			'PDF Data' +
			CARRIAGE_RETURN +
			LINE_FEED +
			CARRIAGE_RETURN +
			LINE_FEED +
			'ENDPDF' +
			CARRIAGE_RETURN +
			LINE_FEED +
			'PRINT' +
			CARRIAGE_RETURN +
			LINE_FEED;

		// console.log(printData);

		this.printProvider
			.testPrintText(this.selectedPrinter.id, datos)
			.then((resp) => {
				console.log('WRITE OK');
				console.log(resp);
			})
			.catch((err) => {
				console.log('WRITE ERROR');
				console.log(err);
			});
	}
}
