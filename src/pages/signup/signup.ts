import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  newUserForm: FormGroup;
  // Our translated text strings
  private signupErrorString: string;

  constructor(
    public user: User,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService
  ) {
    this.translateService.get('SIGNUP_ERROR').subscribe(value => {
      this.signupErrorString = value;
    });

    this.newUserForm = this.formBuilder.group({
      ruc: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.newUserForm.value).subscribe(
      resp => {
        this.navCtrl.push(MainPage);
      },
      err => {
        this.navCtrl.push(MainPage);

        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );
  }
}
