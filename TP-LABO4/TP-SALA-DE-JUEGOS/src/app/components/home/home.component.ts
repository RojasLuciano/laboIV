import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userLogged = this.auth.getAuth();

  constructor(
    private auth: AuthService,
  ) { }

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(user => {
      if (user) {

      } else {
        this.auth.logout();
      }
    }
    );

  }

} // End class
