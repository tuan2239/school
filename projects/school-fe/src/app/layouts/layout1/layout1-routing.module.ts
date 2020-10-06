import { Layout1Component } from './layout1.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: Layout1Component,
    children: [
      {
        path: '',
        loadChildren: () => import('@webapp-views/views.module').then(m => m.ViewsModule)
      }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Layout1RoutingModule { }
