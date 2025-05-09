import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

type Friend = {
  id : string,
  userName : String,
  email : String
}

type Message = {
  id : String,
  message : String,
  senderName : String,
  sended : any
}

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  constructor(private request : HttpService, private router: Router){}
  public message : string = '';
  public currentFriendId : string = '';
  public friends : Array<Friend> = []
  public messages : Array<Message> = []

  ngOnInit(): void {
    this.populingArray();
  }

  getChat(receiverId: string){
    this.request.getMessages(receiverId).subscribe({
      next: (data: any) => {
        this.messages = []
        for(let message of data){
          this.messages.push(message);
        }
        this.currentFriendId = receiverId;
      },
      error: (error: any) => {
        console.log('Erro', error);
      }
    });
  }

  populingArray(){
    this.request.getFriends().subscribe({
      next: (data: any) => {
        for(let friend of data){
          this.friends.push(friend);
        }
      },
      error: (error: any) => {
        console.error('Erro', error);
      }
    });
  }

  sendMessage(){
    this.request.sendMessage(this.currentFriendId, this.message).subscribe({
      next: (data: any) => {
        this.getChat(this.currentFriendId);
      },
      error: (error: any) => {
        console.error('Erro', error);
      }
    });
  }
}
