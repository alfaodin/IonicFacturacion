import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  Slides,
  NavParams,
  LoadingController,
  Loading
} from 'ionic-angular';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../node_modules/@angular/forms';
import { forkJoin } from '../../../node_modules/rxjs/observable/forkJoin';

import { User, AppSettingsProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-data-verification',
  templateUrl: 'data-verification.html'
})
export class DataVerificationPage {
  @ViewChild(Slides) slides: Slides;

  userRuc: string;
  loadingControl: Loading;
  newUserForm: FormGroup;
  economicActivities: Array<any>;

  constructor(
    public userProvider: User,
    public params: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public appSettingsProvider: AppSettingsProvider
  ) {
    this.userRuc = this.params.get('ruc');
    this.newUserForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      cellphone: ['', Validators.required],
      address: ['', Validators.required],
      economicActivity: ['', Validators.required]
    });

    this.loadingControl = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...'
    });
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);

    //TODO CC: QUITAR ESTA LINEA CUANDO SE HAGA EL FLUJO COMPLETO
    this.userRuc = this.userRuc || '1712649951001';
    this.loadingControl.present();
    forkJoin(
      this.userProvider.getUserDataForRegistration(this.userRuc),
      this.appSettingsProvider.getEconomicActivities()
    ).subscribe(
      (resp: Array<any>) => {
        const [userData, appSettings] = resp;

        console.log(`use ${userData} actividades ${appSettings}`);
        this.economicActivities = appSettings;
        this.newUserForm.patchValue(userData[0]);
      },
      null,
      () => {
        this.loadingControl.dismiss();
      }
    );
  }

  verifyData() {
    this.loadingControl = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...'
    });
    this.loadingControl.present();
    this.slides.lockSwipes(false);
    this.userProvider
      .saveUserDataForRegistration(this.newUserForm.value)
      .subscribe(
        resp => {
          this.slides.slideNext();
          this.slides.lockSwipes(true);
        },
        null,
        () => {
          this.loadingControl.dismiss();
        }
      );
  }
}
