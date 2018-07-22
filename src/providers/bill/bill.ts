import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the BillProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BillProvider {

  constructor(private api: Api) { }

  // TODO CC: este metodo debe coger el ID del usuario actual de la app
  getBillForUser() {
    return this.api.get('bills/1');
  }

}
