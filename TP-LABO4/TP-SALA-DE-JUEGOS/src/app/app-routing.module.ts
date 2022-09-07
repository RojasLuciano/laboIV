import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUsersComponent } from './components/register-users/register-users.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUsersComponent },
  { path: 'validate-email', component: ValidateEmailComponent },
  { path: 'restore-password', component: RestorePasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Si no encuentra la ruta, redirige a login
];
  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }