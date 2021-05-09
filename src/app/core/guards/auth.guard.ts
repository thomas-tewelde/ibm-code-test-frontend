import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/containers/auth/services/auth/auth.service';
import { StorageService } from 'src/app/containers/auth/services/storage/storage.service';
import { STORAGE_KEY_ORIGINAL_ROUTE_PATH } from 'src/app/containers/auth/constants/constants';

/**
 * Simple guard to project all routes for authenticated users.
 * Supports canActivate and redirects to login if user is not authenticated.
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.authenticated;
    if (!isAuthenticated) {
      const originalPath = next.url[0].path;
      this.storageService.setItem(STORAGE_KEY_ORIGINAL_ROUTE_PATH, originalPath, true);
      this.router.navigate(['auth']);
      return false;
    }

    if (isAuthenticated) {
      const userRole = this.authService.userRole;
      if (next.data.allowedEUserRoles) {
        if (!next.data.allowedEUserRoles.includes(userRole)) {
          this.router.navigate(['404']);
          return false;
        }
      }
    }

    return true;
  }
}
