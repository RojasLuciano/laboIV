import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  userLogged = this.auth.getAuth();

  constructor(
    private auth: AuthService,
  ) { }

  logout() {
    this.auth.logout();
  }
  ngOnInit(): void {
  }

}
