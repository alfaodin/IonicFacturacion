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

  constructor(
    public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.newUserForm = this.formBuilder.group({
      ruc: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ionViewDidEnter(){
    this.slides.lockSwipes(true);
  }
}
