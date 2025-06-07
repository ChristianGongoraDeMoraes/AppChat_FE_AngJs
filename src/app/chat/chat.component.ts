import { Component, OnChanges, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';
import { Router, RouterLink } from '@angular/router';
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
  imports: [FormsModule, RouterLink],
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

  getChat(receiverId: string): any{
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
        this.message = '';
      },
      error: (error: any) => {
        console.error('Erro', error);
      }
    });
  }

  atualizaChat(){
    if(this.currentFriendId)
    {
      this.getChat(this.currentFriendId);
    }  
  }

  formatarDataCompleta(dataStr: string): string {
    const corrigida = dataStr.replace(/(\.\d{3})\d+/, '$1');
    const data = new Date(corrigida);
    return data.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatarDia(dataStr: string): string {
    const corrigida = dataStr.replace(/(\.\d{3})\d+/, '$1');
    const data = new Date(corrigida);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  }
}
