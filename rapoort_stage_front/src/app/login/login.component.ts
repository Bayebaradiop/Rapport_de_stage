import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string='';

  loginForm= new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required]),
  });

           constructor(private authService:AuthServiceService,private router :Router){}

           login() {
            if (this.loginForm.valid) {
              this.authService.login(this.loginForm.value).subscribe(
                (response) => {
                  if (response.statut === 200) {
                    console.log(response);
                    localStorage.setItem('token', response.token);
                    this.router.navigate(['/dashboard']).then(() => {
                      setTimeout(() => {
                        window.location.reload();
                      }, 0);
                    });
                  } else {
                    this.message = 'Email ou mot de passe incorrect';
                  }
                },
                (error) => {
                  console.error('Erreur lors de la tentative de connexion:', error);
                  this.message = 'Erreur lors de la connexion';
                }
              );
            }
          }
          
          
}
