import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubjectsComponent } from './containers/subjects/subjects.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoreModule } from 'src/app/core/core.module';
import { ViewStudentsComponent } from './components/view-students/view-students.component';

@NgModule({
  declarations: [SubjectsComponent, DashboardComponent, ViewStudentsComponent],
  imports: [CommonModule, PortalRoutingModule, SharedModule, CoreModule],
})
export class PortalModule {}
