import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { AddAmigosComponent } from './add-amigos/add-amigos.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'addAmigos', component: AddAmigosComponent }
];
