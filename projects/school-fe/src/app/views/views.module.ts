import { ASCGridComponent } from './../components/asc-grid/asc-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { DemoComponent } from './demo/demo.component';

const COMPONENTS = [
  DemoComponent,
  ASCGridComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ViewsRoutingModule
  ]
})
export class ViewsModule { }
