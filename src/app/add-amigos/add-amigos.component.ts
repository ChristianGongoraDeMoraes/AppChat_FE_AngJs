import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { HttpService } from '../Services/http.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

type MyToken = {
  nameid: string,
  given_name: string,
  email: string
}
type Request = {
  id: string,
  userName: string,
  email: string
}

@Component({
  selector: 'app-add-amigos',
  imports: [FormsModule, MatIconModule, MatIconModule],
  templateUrl: './add-amigos.component.html',
  styleUrl: './add-amigos.component.scss'
})
export class AddAmigosComponent implements OnInit{

  constructor(private request : HttpService, private router : Router) {}
  requests: Request[] = [];

  idAmigo = "";
  myToken : MyToken = {
      nameid : "",
      given_name: "",
      email: ""
  };
  ngOnInit(): void {
    this.myToken = this.request.getTokenFromStorage();
    this.getRequests();
    }

  acceptRequest(friendId: any){
    this.request.addFriend(this.myToken.nameid,friendId).subscribe({
      next: (data: any) => {
        
        this.getRequests();
      },
      error: (error: any) => {
        console.log('Erro', error);
      }
    });
  }

  addFriend(): any{
      this.request.addFriend(this.myToken.nameid,this.idAmigo).subscribe({
      next: (data: any) => {
        this.router.navigate(['chat']);
      },
      error: (error: any) => {
        console.log('Erro', error);
      }
    });
  }

  getRequests(): any{
    this.requests = [];
    this.request.getFriendsRequests().subscribe({
      next: (data: any) => {
        for(let r of data){
          this.requests.push(r);
        }
      },
      error: (error: any) => {
        console.log('Erro');
      }
    });
  }

  declineFriend(friendId: any): any{
    this.request.declineFriend(this.myToken.nameid,friendId).subscribe({
      next: (data: any) => {
        this.getRequests();
      },
      error: (error: any) => {
        console.log('Erro');
      }
    });
  }

  voltar(){
    this.router.navigate(['chat']);
  }
}
