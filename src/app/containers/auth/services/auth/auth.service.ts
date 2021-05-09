import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { STORAGE_KEY_AUTH_TOKEN } from '../../constants/constants';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
import { HttpResponseData } from 'src/app/shared/model/http-response';
import { IUser, EUserRole } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = new BehaviorSubject<string>('');
  private apiBase = '';

  constructor(private storageService: StorageService, private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.apiBase = environment.baseUrl;
    const _token = this.storageService.getItem(STORAGE_KEY_AUTH_TOKEN);
    if (_token) {
      this.token.next(_token);
    }
  }

  public get token$() {
    return this.token.asObservable();
  }

  public register(
    firstName: IUser['firstName'],
    lastName: IUser['lastName'],
    email: IUser['email'],
    password: string,
    role: EUserRole
  ) {
    const payload = { firstName, lastName, email, password, role };

    const url = this.apiBase + 'auth/register';
    return this.http
      .post<HttpResponseData<IUser>>(url, payload)
      .toPromise()
      .then((response) => {
        return response.data;
      });
  }

  public requestPasswordReset(email: IUser['email']) {
    const url = this.apiBase + 'auth/password-reset';
    return this.http
      .post<HttpResponseData<IUser>>(url, { email })
      .toPromise()
      .then((response) => {
        return response.data;
      });
  }

  public resetPassword(password: string, token: string) {
    const payload = { token, password };
    const url = this.apiBase + 'auth/password-reset/confirm';

    return this.http
      .post<HttpResponseData<{ token: string }>>(url, payload)
      .toPromise()
      .then((response) => {
        const jwt = response.data.token;
        this.token.next(jwt);
        this.storageService.setItem(STORAGE_KEY_AUTH_TOKEN, jwt);
      });
  }

  /** Activate New User */
  public activate(confirmToken: string) {
    const url = this.apiBase + 'auth/register/confirm';
    return this.http
      .post<HttpResponseData<{ token: string }>>(url, { token: confirmToken })
      .toPromise()
      .then((response) => {
        const token = response.data.token;
        this.token.next(token);
        this.storageService.setItem(STORAGE_KEY_AUTH_TOKEN, token);
      });
  }

  public login(username: string, password: string) {
    const payload = { email: username, password };

    const url = this.apiBase + 'auth/jwt';
    return this.http
      .post<HttpResponseData<{ token: string }>>(url, payload)
      .toPromise()
      .then((response) => {
        const token = response.data.token;
        this.token.next(token);
        this.storageService.setItem(STORAGE_KEY_AUTH_TOKEN, token);
      })
      .catch((err: HttpErrorResponse) => {
        // todo transform error into something useful; preferably in a centralized way
      });
  }

  public logout() {
    this.storageService.removeItem(STORAGE_KEY_AUTH_TOKEN);
    this.storageService.removeItem(STORAGE_KEY_AUTH_TOKEN, true);
    this.token.next('');
  }

  public get authenticated() {
    if (!this.token.getValue()) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(this.token.getValue());
  }

  /**
   * get user role from jwt token
   *
   * @returns string
   */
  public get userRole(): EUserRole {
    return this.jwtHelper.decodeToken(this.token.getValue()).role;
  }
}
