import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadBoardRoutingModule } from './lead-board-routing.module';
import { BoradComponent } from './components/borad/borad.component';
import { DemoMaterialModule } from '../../material.module';


@NgModule({
  declarations: [BoradComponent],
  imports: [
    CommonModule,
    LeadBoardRoutingModule,
    DemoMaterialModule,
  ],
  exports: [
    DemoMaterialModule
  ]
})
export class LeadBoardModule { }
