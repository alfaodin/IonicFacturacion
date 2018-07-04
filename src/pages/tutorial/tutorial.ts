import { Component } from '@angular/core';
import {
  IonicPage,
  MenuController,
  NavController,
  Platform
} from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(
    private navCtrl: NavController,
    translate: TranslateService,
    platform: Platform
  ) {
    this.dir = platform.dir();
    translate
      .get([
        'TUTORIAL_SLIDE1_TITLE',
        'TUTORIAL_SLIDE2_TITLE',
        'TUTORIAL_SLIDE3_TITLE',
        'TUTORIAL_SLIDE4_TITLE'
      ])
      .subscribe(values => {
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            image: 'assets/img/welcome/screen1.png'
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            image: 'assets/img/welcome/screen2.png'
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            image: 'assets/img/welcome/screen3.png'
          },
          {
            title: values.TUTORIAL_SLIDE4_TITLE,
            image: 'assets/img/welcome/screen4.png'
          }
        ];
      });
  }

  showLoginScreen() {
    this.navCtrl.setRoot(
      'LoginPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }

  showSignUpScreen() {
    this.navCtrl.setRoot(
      'SignupPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }
}
