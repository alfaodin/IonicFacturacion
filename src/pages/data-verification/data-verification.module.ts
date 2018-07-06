import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataVerificationPage } from './data-verification';
import { TranslateModule } from '../../../node_modules/@ngx-translate/core';

@NgModule({
  declarations: [
    DataVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(DataVerificationPage),
    TranslateModule.forChild()
  ],
  exports: [
    DataVerificationPage
  ]
})
export class DataVerificationPageModule {}
