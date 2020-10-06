import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '@webapp-components/navbar/navbar.component';
import { SidebarComponent } from '@webapp-components/sidebar/sidebar.component';
import { Layout1RoutingModule } from './layout1-routing.module';
import { Layout1Component } from './layout1.component';
import { MatButtonModule } from '@angular/material/button';


const COMPONENTS = [
  Layout1Component,
  NavbarComponent,
  SidebarComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    Layout1RoutingModule,
    MatExpansionModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class Layout1Module { }
