import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/containers/auth/services/storage/storage.service';
import { STORAGE_KEY_AUTH_TOKEN } from 'src/app/containers/auth/constants/constants';
import { AuthService } from 'src/app/containers/auth/services/auth/auth.service';

@Injectable()
export class HttpGlobalInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let _headers = { 'Content-Type': 'application/json' };

    if (this.authService.authenticated) {
      _headers = { ..._headers, ...{ Authorization: 'Bearer ' + this.storageService.getItem(STORAGE_KEY_AUTH_TOKEN) } };
    }

    const customRequest = request.clone({
      headers: new HttpHeaders(_headers),
    });

    const test = `Bearer ${this.storageService.getItem(STORAGE_KEY_AUTH_TOKEN)}`;

    return next.handle(customRequest).pipe(
      tap(
        (event) => {},
        (error) => {
          if (error instanceof HttpErrorResponse) {
            const errorMessage =
              error.status !== 0
                ? `${error.statusText} (${error.status}). ${error.message}`
                : `Cannot connect to ${error.url}. ${error.message}`;

            this.snackBar.open(`Oops: ${errorMessage} `, null, {
              duration: 10000,
              panelClass: ['snackbar-error-background'],
            });
          }
        }
      )
    );
  }
}
