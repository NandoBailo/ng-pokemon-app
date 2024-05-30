import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, delay, of, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})

export class LoginComponent implements OnInit{

message: string = 'Vous êtes déconnecté.';
name: string;
password: string;
auth: AuthService ;

constructor(
  private authService: AuthService,
  private router: Router
){}

ngOnInit(): void {
    this.auth = this.authService;
}

logout() {
  this.auth.logout();
  this.message= 'Vous êtes déconnecté';
}

login() {
  this.message = "Tentative de connexion en cours....";
  this.auth.login(this.name, this.password)
  .subscribe((isLoggedIn : boolean)=>{
    this.setMessage();
    if(isLoggedIn){
      this.router.navigate(['/pokemons']);
    }else{
      this.password = '';
      this.router.navigate(['/login']);
    }
   
  });

}

setMessage(){
  if(this.auth.isLoggedIn){
    this.message= 'Vous êtes connécté';
  }else{
    this.message= 'Indentifiant ou mot de passe incorrect'
  }
}

}
