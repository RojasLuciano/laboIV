import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root',
  })
export class LogsService  {

    logs : any;

    constructor(private db: AngularFirestore) { }


    public async registerUserLoginTime(user: any) {
        this.logs = {
            email: user.email,
            loginTime: new Date()
        }
        return await this.db.collection('logs').add(this.logs);
    }

    async getLogs() {
        return await this.db.collection('logs').valueChanges();
    }



}