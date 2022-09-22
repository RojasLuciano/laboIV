import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUsersComponent } from './components/register-users/register-users.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { ChatComponent } from './components/chat/chat.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { GamesComponent } from './components/games/games.component';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUsersComponent },
  { path: 'validate-email', component: ValidateEmailComponent },
  { path: 'restore-password', component: RestorePasswordComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'games', component: GamesComponent, children: [
      { path: 'hangman', component: HangmanComponent },
      { path: 'cards', component: CardsComponent },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Si no encuentra la ruta, redirige a login
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
