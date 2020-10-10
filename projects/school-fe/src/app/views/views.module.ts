import { ASCGridComponent } from './../components/asc-grid/asc-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ChildrenComponent } from './children/children.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS = [
  ChildrenComponent,
  ASCGridComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class ViewsModule { }
