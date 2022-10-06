import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  userLogged = this.auth.getAuth();
  chatOn: boolean = true;
  isDisplayed = "";

  constructor(
    private auth: AuthService,
  ) { }

  TurnOnChat(isOn: string) {
    if (this.isDisplayed == "" || this.isDisplayed == isOn) {
      this.chatOn = !this.chatOn;
    }
    this.isDisplayed = isOn;
  }

  logout() {
    this.auth.logout();
  }
  ngOnInit(): void {
  }

}
