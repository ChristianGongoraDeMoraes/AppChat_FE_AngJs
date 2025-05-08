import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../Services/http.service';
import { FormsModule } from '@angular/forms';

type User = {
  name: String,
  password: String
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private request : HttpService, private router : Router){}

  errorMessage = '';

  name = '';
  password = '';

  loginUser(){
    const user : User = {
      name : this.name,
      password : this.password
    }

    this.request.getLoginUser(user).subscribe({
      next: (data: any) => {
        if(data){
          this.request.setToken(data.token);
          this.name = data.token;
          this.router.navigate(['']);
        }else{
          this.errorMessage = 'Invalid credentials';
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Invalid credentials';
        console.log('error')
      }
    });
   }
}
