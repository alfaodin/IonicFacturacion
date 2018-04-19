import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    setInterval(() => {
      const val = this.randomDelay(1, 10) ;

      if(val > 10){
        let toast = this.toastCtrl.create({
          message: 'Se ha perdido conexión de internet',
          duration: 3000,
          position: 'top'
        });
        toast.present();

      }
    }, 10000);
  }

  randomDelay(bottom, top): number {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
  }
}
