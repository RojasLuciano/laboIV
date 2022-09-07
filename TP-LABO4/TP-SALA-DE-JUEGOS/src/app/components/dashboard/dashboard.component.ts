import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataUser : any; // Deberia hacer una clase usuario?

  constructor(
    private afAuth: AngularFireAuth,  
    private router: Router, 
  ) { }

  logout(){
    this.afAuth.signOut()
    .then(() => {
      this.router.navigate(['/login']);
    })
  }

  ngOnInit(): void {
    this.afAuth.currentUser
    .then(user => {
      if(user && user.emailVerified){
        this.dataUser = user;
      }else{
        this.router.navigate(['/verify-email']);
      }
    }
    )
  }

} // End class
