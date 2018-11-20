import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatecsPage } from './datecs';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
	declarations: [ DatecsPage ],
	imports: [ NgxQRCodeModule, IonicPageModule.forChild(DatecsPage) ]
})
export class DatecsPageModule {}
