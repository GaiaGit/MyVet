import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessGuard } from '@app/shared/guards/access.guard'

import { MainComponent } from '@app/pages/main/main.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { NewAppointmentComponent } from '@app/pages/new-appointment/new-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
    canLoad: [AccessGuard],
    canActivate: [AccessGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: NewAppointmentComponent,
    pathMatch: 'full',
    canLoad: [AccessGuard],
    canActivate: [AccessGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
