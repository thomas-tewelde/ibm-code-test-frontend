import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';
import { HttpGlobalInterceptor } from './http-global.interceptor';
import { InterceptorMockService } from './interceptor-mock.service.spec';

describe('HttpGlobalInterceptor', () => {
  let service: InterceptorMockService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.baseUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, MatSnackBarModule],
      providers: [
        InterceptorMockService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpGlobalInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(InterceptorMockService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be instance of HttpErrorResponse', () => {
    const mockErrorResponse = new HttpErrorResponse({ status: 400, statusText: 'BAD REQUEST' });

    service.fetchAll().subscribe(
      (response) => response,
      (error) => {
        expect(error).toBeInstanceOf(HttpErrorResponse);
      }
    );

    const req = httpMock.expectOne(baseUrl);
    req.error(new ErrorEvent('400 BAD REQUEST'), mockErrorResponse);
  });

  it('should be instance of string if error status code equal to zero', () => {
    const mockErrorResponse = new HttpErrorResponse({ status: 0, statusText: 'Unknown Error' });

    service.fetchAll().subscribe(
      (response) => response,
      (error) => {
        expect(error).toBeInstanceOf(HttpErrorResponse);
      }
    );

    const req = httpMock.expectOne(baseUrl);
    req.error(new ErrorEvent('Unknown Error'), mockErrorResponse);
  });

  it('should send the CSRF token to the backend', () => {
    const cookie = 'GaHK2picATqUzj9LH2CbdhHiYZKgF9rNfxRKqLUyUjSNRRoDWgq5xhayFOty70mo';
    document.cookie = `csrftoken=${cookie};`;

    service.fetchAll().subscribe(
      (response) => response,
      (error) => error
    );

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.headers.get('x-csrftoken')).toEqual(cookie);
  });

  it('should CSRF token be an empty string if it is not into the cookie', () => {
    const mockErrorResponse = new HttpErrorResponse({ status: 403, statusText: 'FORBIDDEN' });
    const cookie = '';
    document.cookie = 'csrftoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    service.fetchAll().subscribe(
      (response) => response,
      (error) => error
    );

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.headers.get('x-csrftoken')).toEqual(cookie);
    req.error(new ErrorEvent('403 FORBIDDEN'), mockErrorResponse);
  });
});
