import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildrenComponent } from './children/children.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportComponent } from './import/import.component';


const routes: Routes = [
  { path: 'Children', component: ChildrenComponent },
  { path: '', component: DashboardComponent },
  { path: 'Importketquathi', component: ImportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
