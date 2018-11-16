import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Printer } from '../models/printers';

@Injectable()
export class PrintService {
	constructor(private btSerial: BluetoothSerial, private alertCtrl: AlertController) {}

	getPrinterList(): Promise<Printer[]> {
		return new Promise((resolve, reject) => {
			this.getList()
				.then((datalist: Printer[]) => {
					resolve(datalist);
				})
				.catch((err) => {
					console.log('ERROR', err);
					reject(err);
				});
		});
	}

	connect(printerId: string) {
		return this.btSerial.connect(printerId);
	}
	disconnect() {
		return this.btSerial.disconnect();
	}
	settings() {
		return this.btSerial.showBluetoothSettings();
	}

	testPrintText(printerId: string, textToPrint: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.btSerial
				.isConnected()
				.then(() => {
					this.write(textToPrint)
						.then((resp) => {
							resolve(resp);
						})
						.catch((err) => reject(err));
				})
				.catch(() => {
					reject('NOT CONNECTED');
				});
		});
	}

	//#region Private
	private getList(): Promise<Printer[]> {
		return this.btSerial.list();
	}
	private write(textToPrint: string): Promise<any> {
		return this.btSerial.write(textToPrint);
	}
	//#endregion
}
