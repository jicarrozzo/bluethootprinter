import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { PrintService } from './services/printer-service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { PrinterDATAECSService } from './services/printer-datecs-service';

@NgModule({
	declarations: [ MyApp ],
	imports: [ BrowserModule, IonicModule.forRoot(MyApp) ],
	bootstrap: [ IonicApp ],
	entryComponents: [ MyApp ],
	providers: [
		StatusBar,
		BluetoothSerial,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		PrintService,
		PrinterDATAECSService
	]
})
export class AppModule {}
