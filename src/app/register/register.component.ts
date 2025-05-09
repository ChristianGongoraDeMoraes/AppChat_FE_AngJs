import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../Services/http.service';
import { FormsModule } from '@angular/forms';

type UserRegister = {
  name: String,
  email: String,
  password: String
}

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    constructor(private request : HttpService, private router: Router){}
    email = '';
    password = '';
    name = '';

    errorMessage = '';

    createNewUser(){
      const user : UserRegister = {
        name : this.name,
        email: this.email,
        password : this.password
      }
  

      this.request.postUser(user).subscribe({
        next: (data: any) => {
          if(data){
            alert("Register Successfull!");
            this.router.navigate([""]);
          }
        },
        error: (err: any) => {
          if(this.password.length <= 12){
            this.errorMessage = "Password must be more than 12 characteres";
          }else{
            this.errorMessage = "Invalid credentials...";
          }
        }
      });
    }
}
