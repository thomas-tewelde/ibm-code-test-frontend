import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { STORAGE_KEY_ORIGINAL_ROUTE_PATH } from '../../constants/constants';

@Component({
  selector: 'ibm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public authError: HttpErrorResponse;
  private ngUnsubscribe = new Subject();

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.authService.token$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((token) => {
      if (token) {
        const originalPath = this.storageService.getItem(STORAGE_KEY_ORIGINAL_ROUTE_PATH, true);
        if (originalPath) {
          this.router
            .navigate([originalPath])
            .then(() => this.storageService.removeItem(STORAGE_KEY_ORIGINAL_ROUTE_PATH, true));
        } else {
          this.router.navigate(['/portal']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Form submit button is clicked.
   * Logs in a user
   *
   * @memberof LoginComponent
   */
  public onClickSubmitLogin() {
    const formValue = this.loginForm.value;
    this.authService.login(formValue.email, formValue.password).catch((err: HttpErrorResponse) => {
      this.authError = err;
    });
  }
}
