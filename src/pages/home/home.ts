import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, IonicPage } from 'ionic-angular';
import { PrintProvider } from '../../app/services/printer-service';
import { Printer } from '../../app/models/printers';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	selectedPrinter: any = [];

	constructor(
		public navCtrl: NavController,
		private modalCtrl: ModalController,
		private printProvider: PrintProvider,
		private alertCtrl: AlertController
	) {}

	listBTDevice() {
		this.printProvider
			.getPrinterList()
			.then((datalist: Printer) => {
				let abc = this.modalCtrl.create('PrinterListModalPage', { data: datalist });
				abc.onDidDismiss((data) => {
					console.log(data);
					this.selectedPrinter = data;
				});
				abc.present();
			})
			.catch((err) => {
				let mno = this.alertCtrl.create({
					title: 'ERROR ' + err,
					buttons: [ 'Dismiss' ]
				});
				mno.present();
			});
	}

	testConnectPrinter() {
		var id = this.selectedPrinter.id;
		if (id == null || id == '' || id == undefined) {
			//nothing happens, you can put an alert here saying no printer selected
		} else {
			let foo = this.printProvider.connectBT(id).subscribe(
				(data) => {
					console.log('CONNECT SUCCESSFUL', data);

					// let mno=this.alertCtrl.create({
					//   title:"Connect successful",
					//   buttons:['Dismiss']
					// });
					// mno.present();
				},
				(err) => {
					console.log('Not able to connect', err);
					let mno = this.alertCtrl.create({
						title: 'ERROR ' + err,
						buttons: [ 'Dismiss' ]
					});
					mno.present();
				}
			);
		}
	}

	testPrinter() {
		var id = this.selectedPrinter.id;
		if (id == null || id == '' || id == undefined) {
			//nothing happens, you can put an alert here saying no printer selected
		} else {
			let foo = this.printProvider.testPrint(id);
		}
	}
}
