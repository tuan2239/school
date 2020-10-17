import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { GenderPipe } from '@webapp-pipe/gender.pipe';
import { ASCGridComponent } from '@webapp-components/asc-grid/asc-grid.component';

@NgModule({
  declarations: [
    GenderPipe,
    ASCGridComponent
  ],
  imports: [
    MatPaginatorModule,
    CommonModule,
    MatTooltipModule,
    MatButtonModule
  ],
  exports: [
    GenderPipe,
    ASCGridComponent
  ]
})
export class SharedModule { }