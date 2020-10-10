import { ASCGridComponent } from './../components/asc-grid/asc-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ChildrenComponent } from './children/children.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from '@webapp-popups/confirm/confirm.component';
import { InfoDialogComponent } from '@webapp-popups/confirm/InfoDialog/info-dialog/info-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ChildrenPopupComponent } from './children/children-popup/children-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  ChildrenComponent,
  ASCGridComponent
];

const ENTRYCOMPONENTS = [
  ConfirmComponent,
  InfoDialogComponent,
  ChildrenPopupComponent
];

@NgModule({
  declarations: [...COMPONENTS, ...ENTRYCOMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ViewsRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  entryComponents: [...ENTRYCOMPONENTS]
})
export class ViewsModule { }
