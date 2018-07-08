import 'rxjs/add/operator/toPromise';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";


import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  /**
* Fuente de datos para loggedIn$
*/
  private loggedInSource = new BehaviorSubject<boolean>(false);

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    return this.api.post('login', accountInfo);
  }

  /**
  * Permite autenticarse al usuario
  * @param {LoginParams} loginParams  Datos de autenticación
  * @return {Observable}  Respuesta api
  */
  // login(loginParams: any) {
  //   let url: string = environment.apiPath + environment.authentication.oauth.tokenEndpoint;
  //   let authorizationDetail: object = {
  //     grant_type: 'password',
  //     response_type: 'token',
  //     client_id: environment.authentication.oauth.clientId,
  //     client_secret: environment.authentication.oauth.clientSecret
  //   };
  //   let request = environment.mocks ? this.api.get(url, Object.assign(loginParams, authorizationDetail)) : this.api.post(url, Object.assign(loginParams, authorizationDetail));
  //   return request.pipe(
  //     tap((token: any) => {
  //       localStorage.setItem('token', JSON.stringify(token.response.authorization));
  //       this.loggedInSource.next(true);
  //     })
  //   );
  // }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    return this.api.post('user/signup', accountInfo);
  }

  /**
    * Cierra la sesión del usuario
    * @return {void}
    */
  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSource.next(false);
    // this.router.navigateByUrl('/login');
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
