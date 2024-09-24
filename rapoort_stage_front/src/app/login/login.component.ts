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
  message: string = '';
  loader:boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthServiceService, private router: Router) { }

  login() {
    this.loader = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          if (response.statut === 200) {
            console.log(response);
            localStorage.setItem('token', response.token);
            console.log(response.token);
            localStorage.setItem("user",JSON.stringify(response));
            this.router.navigate(['/dashboard']).then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 0);
            });
          } else {
            this.message = 'Email ou mot de passe incorrect';
            this.loader = false;
          }
        },
        (error) => {
          console.error('Erreur lors de la tentative de connexion:', error);
          this.message = 'Erreur lors de la connexion';
        }
      );
    }
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('token'); // Supprime le token du localStorage
        localStorage.removeItem('user');
        this.router.navigate(['/Connexion']).then(() => {
          window.location.reload(); // Rafraîchit la page après déconnexion
        });
      },
      (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    );
  }
}
