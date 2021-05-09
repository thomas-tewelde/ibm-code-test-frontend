import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'portal',
    pathMatch: 'full',
  },
  {
    path: 'portal',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/containers/portal/portal.module').then((m) => m.PortalModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/containers/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
