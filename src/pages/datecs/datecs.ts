import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Printer, PRINTER_CMD } from '../../app/models/printers';
import { PrinterDATAECSService } from '../../app/services/printer-datecs-service';

@IonicPage()
@Component({
	selector: 'page-datecs',
	templateUrl: 'datecs.html'
})
export class DatecsPage {
	selectedPrinter: any = null;
	isConnected: boolean = false;

	constructor(public navCtrl: NavController, private printProvider: PrinterDATAECSService) {}

	list() {
		this.printProvider
			.listBluetoothDevices()
			.then((datalist: Printer[]) => {
				this.showList(datalist);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	connectPrinter() {
		this.printProvider
			.connect(this.selectedPrinter.id)
			.then((data) => {
				console.log('Connected OK:' + data);
				this.isConnected = true;
				console.log('isConnected:' + this.isConnected);
			})
			.catch((err) => {
				console.log('Connected Fail: ' + err);
				this.isConnected = false;
			});
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
			.getStatus()
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	showList(datalist: Printer[]) {
		// const mPrinters = this.modalCtrl.create('PrinterListModalPage', { data: datalist });
		// mPrinters.onDidDismiss((data: Printer) => {
		// 	console.log(data);
		// 	this.selectedPrinter = data;
		// 	this.connectPrinter();
		// });
		// mPrinters.present();
	}

	testText() {
		let printData = 'Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n';
		this.printProvider
			.printText(printData)
			.then((resp) => {
				console.log('WRITE OK');
				console.log(resp);
			})
			.catch((err) => {
				console.log('WRITE ERROR');
				console.log(err);
			});
	}

	testBarcode() {}
}
