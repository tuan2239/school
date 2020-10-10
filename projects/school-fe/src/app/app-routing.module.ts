import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReLoginGuard } from '@webapp-helpers/re-login.guard';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('@webapp-layouts/layout1/layout1.module').then(m => m.Layout1Module),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth', loadChildren: () => import('@webapp-auth/auth.module').then(m => m.AuthModule),
    canActivate: [ReLoginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
