import { AuthGuard } from './helpers/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('@webapp-layouts/layout1/layout1.module').then(m => m.Layout1Module),
    canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: () => import('@webapp-auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
