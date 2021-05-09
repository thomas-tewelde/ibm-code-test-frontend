import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from './containers/auth/services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ibm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private ngUnsubscribe = new Subject();

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = this.authService.authenticated;
  }

  ngOnInit() {
    this.authService.token$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((token) => (!!token ? (this.isAuthenticated = true) : (this.isAuthenticated = false)));
  }

  onLogoutClicked() {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
