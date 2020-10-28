import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SginInComponent } from './components/sgin-in/sgin-in.component';
import {MatButtonModule} from '@angular/material/button';
import { SginFormComponent } from './components/sgin-form/sgin-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DemoMaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [SginInComponent, SginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    LoginRoutingModule,
  ],
  exports: [
    DemoMaterialModule
  ],
  entryComponents: [
    SginFormComponent
  ]

})
export class LoginModule { }
