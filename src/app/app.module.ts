import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { PrintProvider } from './services/printer-service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

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
		PrintProvider
	]
})
export class AppModule {}
