import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BillProvider } from '../../providers/bill/bill';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  bills: any[];

  constructor(public navCtrl: NavController, private billService: BillProvider) {
    this.billService.getBillForUser().subscribe((data: any) => {
      this.bills = data;
    });
  }
}
