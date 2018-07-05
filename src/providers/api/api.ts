import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://localhost:3000';
  apiRest: string = 'api/ndocs';

  constructor(public http: HttpClient) {}

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(`${this.url}/${this.apiRest}/${endpoint}`, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(
      `${this.url}/${this.apiRest}/${endpoint}`,
      body,
      reqOpts
    );
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(
      `${this.url}/${this.apiRest}/${endpoint}`,
      body,
      reqOpts
    );
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(`${this.url}/${this.apiRest}/${endpoint}`, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(
      `${this.url}/${this.apiRest}/${endpoint}`,
      body,
      reqOpts
    );
  }
}
