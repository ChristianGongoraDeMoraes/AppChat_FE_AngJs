import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

type User = {
  name: String,
  password: String
}
type UserF = {
  userName : String,
  password : String
}

type UserCreateReq =  {
  name: String,
  email: String,
  password: String
}
type UserCreate = {
  userName : String,
  email : String,
  password : String
}
type MyToken = {
  nameid: string,
  given_name: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) {}
    url = `http://localhost:5150`

    private headers : any = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    getLoginUser(user: User): Observable<any>{
      let urlX : string = this.url + `/api/account/login`;
      let userF : UserF = {
        userName : user.name,
        password : user.password
      }
      return this.http.post(urlX, userF);
    }

    postUser(user : UserCreateReq): Observable<any>{
      let urlX: string = this.url + `/api/account/register`;
      let userF: UserCreate = {
        userName: user.name,
        email: user.email,
        password: user.password
      }
      return this.http.post(urlX, userF);
    }

    setToken(token: string):void{
      localStorage.setItem('token', token);
    }
    getTokenFromStorage(): MyToken{
      let token: any = localStorage.getItem('token')
      const decode: MyToken = jwtDecode<MyToken>(token);
      return decode;
    }


    getFriends(): Observable<any>{
      let urlX : string = this.url + `/api/FriendShip`;
      const headers = this.headers;
      return this.http.get(urlX, { headers });
    }

    getMessages(receiverId: string): Observable<any>{
      let urlX : string = this.url + `/api/Chat`;
      const headers = this.headers;

      const params = new HttpParams()
      .set('ReceiverId', receiverId);

      return this.http.get(urlX, { headers, params });
    }

    sendMessage(receiverId : string, message : string){
      let urlX : string = this.url + `/api/Chat`;
      const headers = this.headers;
      
      const body = {
        message: message,
        receiverId: receiverId
      };

      return this.http.post(urlX, body, { headers });
    }

    addFriend(userId: string, friendId: string){
      let urlX : string = this.url + `/api/FriendShip`;
      const headers = this.headers;
      
      const body = {
       userId : userId,
       friendId : friendId
      };

      return this.http.post(urlX, body, { headers });
    }
}