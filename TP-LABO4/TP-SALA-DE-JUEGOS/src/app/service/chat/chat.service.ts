import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection?: AngularFirestoreCollection<any>;
  public chats: Message[] = [];
  public userLog: any = {};

  elements: any;

  constructor(private authService: AuthService,private afs: AngularFirestore) {
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.userLog.name = user.displayName;
        this.userLog.id = user.uid;
        this.userLog.email = user.email;
        this.userLog.photoURL = user.photoURL;
      }
    });
    }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(20));
    return this.itemsCollection.valueChanges().subscribe(chats => {
      this.chats = [];
      for (let chat of chats) {
        this.chats.unshift(chat);
      }
      setTimeout(() => {
        this.elements = document.getElementById('app-message');
        console.log(this.elements);
        this.elements.scrollTop = this.elements.scrollHeight;
 
      }, 20);
    });
  }

  addMessage(message: string) {
    var date = new Date();
    let newMessage: Message = {
      name: this.userLog.email.substr(0, this.userLog.email.indexOf('@')),
      message: message,
      date: this.formatTime(date),
      uid: this.userLog.id,
      email: this.userLog.email,
      photo: this.userLog.photoURL
    };
    return this.itemsCollection?.add(newMessage);
  }

  formatTime(time: any) {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}