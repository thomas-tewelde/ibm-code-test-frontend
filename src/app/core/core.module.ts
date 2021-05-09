import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { HttpGlobalInterceptor } from './interceptors/http-global.interceptor';
import { LogoComponent } from './components/layout/logo/logo.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { IbmDataTableComponent } from './components/ibm-data-table/ibm-data-table.component';

const coreModules = [NavbarComponent, LogoComponent, MainComponent, FooterComponent, IbmDataTableComponent];

@NgModule({
  declarations: [...coreModules],
  imports: [SharedModule],
  exports: [...coreModules],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGlobalInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
