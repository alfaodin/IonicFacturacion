import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  Slides,
  NavParams,
  LoadingController,
  Loading,
  NavController
} from 'ionic-angular';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../node_modules/@angular/forms';
import { forkJoin } from '../../../node_modules/rxjs/observable/forkJoin';

import { MainPage } from '../pages';
import { User, AppSettingsProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-data-verification',
  templateUrl: 'data-verification.html'
})
export class DataVerificationPage {
  @ViewChild(Slides) slides: Slides;

  userRuc: string;
  steps: Array<any>;
  selectedFile: any;
  headerTitle: string;
  fileForm: FormGroup;
  newUserForm: FormGroup;
  loadingControl: Loading;
  headerTitles: Array<string>;
  showBackStepButton: Boolean;
  economicActivities: Array<any>;

  constructor(
    public userProvider: User,
    public params: NavParams,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public appSettingsProvider: AppSettingsProvider
  ) {
    //Pasos de la aplicacion
    this.showBackStepButton = false;
    this.headerTitles = new Array<string>();
    this.headerTitles.push('Verifica datos de tu negocio');
    this.headerTitles.push('Personaliza tus comprobantes');
    this.headerTitles.push('Firma Electrónica');

    this.headerTitle = this.headerTitles[0];
    this.steps = new Array<any>();
    for (let index = 0; index < 3; index++) {
      this.steps.push({ value: index + 1, selected: index === 0 });
    }

    this.userRuc = this.params.get('ruc');
    this.newUserForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      cellphone: ['', Validators.required],
      address: ['', Validators.required],
      economicActivity: ['', Validators.required]
    });

    this.fileForm = this.formBuilder.group({
      backgroundImageUrl: ['']
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
    // this.loadingControl = this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   content: 'Please wait...'
    // });
    // this.loadingControl.present();
    // this.slides.lockSwipes(false);
    // this.userProvider
    //   .saveUserDataForRegistration(this.newUserForm.value)
    //   .subscribe(
    //     resp => {
    //       this.slides.slideNext();
    //       this.slides.lockSwipes(true);
    //     },
    //     null,
    //     () => {
    //       this.loadingControl.dismiss();
    //     }
    //   );

    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.changeStep(this.slides.getActiveIndex());
    this.slides.lockSwipes(true);
  }

  private backToPreviousSlide() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.changeStep(this.slides.getActiveIndex());
    this.slides.lockSwipes(true);
  }
  private changeStep(currentStep: number): void {
    if (currentStep >= 1) {
      this.showBackStepButton = true;
    } else {
      this.showBackStepButton = false;
    }

    this.headerTitle = this.headerTitles[currentStep];

    for (let index = 0; index < 3; index++) {
      const step = this.steps[index];
      step.selected = index <= currentStep;
    }
  }

  removeSelectedImage() {
    this.selectedFile = undefined;
  }

  changeImageListener($event): void {
    const file = $event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.selectedFile = reader.result;
    };
  }

  showMainScreen() {
    this.navCtrl.setRoot(
      MainPage,
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }
}
