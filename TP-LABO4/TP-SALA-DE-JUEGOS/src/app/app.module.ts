import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUsersComponent } from './components/register-users/register-users.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ChatComponent } from './components/chat/chat.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { GamesComponent } from './components/games/games.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './components/cards/cards.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUsersComponent,
    ValidateEmailComponent,
    RestorePasswordComponent,
    SpinnerComponent,
    HomeComponent,
    AboutMeComponent,
    ChatComponent,
    HangmanComponent,
    GamesComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule addedm
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
