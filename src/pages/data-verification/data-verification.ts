import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-data-verification',
  templateUrl: 'data-verification.html',
})
export class DataVerificationPage {

  @ViewChild(Slides) slides: Slides;

  newUserForm: FormGroup;
  values = [{value:0, label:'A'},{value:1, label: 'B'},{value:2, label:'A'},{value:4, label: 'B'}];

  constructor(
    public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.newUserForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      cellphone: ['', Validators.required],
      direction: ['', Validators.required],
      economicActivity: ['', Validators.required]
    });
  }

  ionViewDidLoad(){

  }

  ionViewDidEnter(){
    this.slides.lockSwipes(true);
  }
}
