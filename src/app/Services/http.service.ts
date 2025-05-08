import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type User = {
  name: String,
  password: String
}
type UserF = {
  userName : String,
  password : String
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) {}
    url = `http://localhost:5150`
    
    private token : string = "";

    getLoginUser(user: User): Observable<any>{
      let urlX : string = this.url + `/api/account/login`;
      let userF : UserF = {
        userName : user.name,
        password : user.password
      }
      return this.http.post(urlX, userF);
    }

    setToken(token: string):void{
      this.token = token;
      localStorage.setItem('token', token);
    }
}
