import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';

const sharedModules = [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule];

@NgModule({
  declarations: [],
  exports: [...sharedModules],
  imports: [...sharedModules],
})
export class SharedModule {}
