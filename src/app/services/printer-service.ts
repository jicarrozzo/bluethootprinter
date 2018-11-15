import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Printer } from '../models/printers';

@Injectable()
export class PrintProvider {
	constructor(private btSerial: BluetoothSerial, private alertCtrl: AlertController) {}

	getPrinterList(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.getList()
				.then((datalist: Printer) => {
					resolve(datalist);
				})
				.catch((err) => {
					console.log('ERROR', err);
					reject(err);
				});
		});
	}

	connectBT(address) {
		return this.btSerial.connect(address);
	}

	testPrint(address) {
		let printData = 'Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n';

		console.log('Printer:' + address);
		this.btSerial
			.isConnected()
			.then(() => {
				this.btSerial
					.write(printData)
					.then(() => {
						console.log('WRITE OK!');
					})
					.catch(() => {
						console.log('WRITE ERROR');
					});
			})
			.catch(() => {
				console.log('NOT CONNECTED');
			});
	}

	//#region Private
	private getList(): Promise<Printer> {
		return this.btSerial.list();
	}
	//#endregion

	// testPrint2(address) {
	// 	let printData = 'Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n';

	// 	console.log(address);

	// 	let xyz = this.connectBT(address).subscribe(
	// 		(data) => {
	// 			console.log('ConnectBTOK');
	// 			console.log(data);

	// 			this.btSerial.write(printData).then(
	// 				(dataz) => {
	// 					console.log('WRITE SUCCESS', dataz);

	// 					let mno = this.alertCtrl.create({
	// 						title: 'Print SUCCESS!',
	// 						buttons: [ 'Dismiss' ]
	// 					});
	// 					mno.present();

	// 					xyz.unsubscribe();
	// 				},
	// 				(errx) => {
	// 					console.log('WRITE FAILED', errx);
	// 					let mno = this.alertCtrl.create({
	// 						title: 'ERROR ' + errx,
	// 						buttons: [ 'Dismiss' ]
	// 					});
	// 					mno.present();
	// 				}
	// 			);
	// 		},
	// 		(err) => {
	// 			console.log('CONNECTION ERROR', err);
	// 			let mno = this.alertCtrl.create({
	// 				title: 'ERROR ' + err,
	// 				buttons: [ 'Dismiss' ]
	// 			});
	// 			mno.present();
	// 		}
	// 	);
	// }
}
