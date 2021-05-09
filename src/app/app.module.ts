import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortalComponent } from './containers/portal/portal.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { AuthComponent } from './containers/auth/auth.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StorageService } from './containers/auth/services/storage/storage.service';
import { STORAGE_KEY_AUTH_TOKEN } from './containers/auth/constants/constants';

export function jwtOptionsFactory(storageService: StorageService) {
  return {
    tokenGetter: () => {
      const token = storageService.getItem(STORAGE_KEY_AUTH_TOKEN);
      return token;
    },
    whitelistedDomains: [environment.baseUrl],
  };
}

@NgModule({
  declarations: [AppComponent, PortalComponent, AuthComponent, PageNotFoundComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [StorageService],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
