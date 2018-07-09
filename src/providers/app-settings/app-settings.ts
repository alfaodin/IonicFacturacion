import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the AppSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppSettingsProvider {
  constructor(private api: Api) {}

  getEconomicActivities() {
    return this.api.get('settings/activity');
  }
}
