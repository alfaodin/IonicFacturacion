import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  IonicPage,
  NavController,
  ToastController,
  LoadingController
} from 'ionic-angular';

import { User } from '../../providers/providers';
import { DataVerificationPage, LoginPage } from '../pages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  newUserForm: FormGroup;

  constructor(
    public user: User,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService
  ) {
    this.newUserForm = this.formBuilder.group({
      ruc: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doSignup() {
    if (this.newUserForm.valid) {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Please wait...'
      });

      loading.present();
      this.user.signup(this.newUserForm.value).subscribe(
        resp => {
          this.navCtrl.setRoot(
            DataVerificationPage,
            { ruc: resp.ruc },
            {
              animate: true,
              direction: 'forward'
            }
          );
        },
        err => {
          let toast = this.toastCtrl.create({
            message: err.text,
            duration: 3000,
            position: 'top',
            cssClass: 'notification error'
          });
          toast.present();
        },
        () => {
          loading.dismiss();
        }
      );
    } else {
      let toast = this.toastCtrl.create({
        message: 'Los campos son requeridos',
        duration: 5000,
        position: 'top',
        cssClass: 'notification error'
      });
      toast.present();
    }
  }

  showLoginScreen() {
    this.navCtrl.setRoot(
      LoginPage,
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }
}
