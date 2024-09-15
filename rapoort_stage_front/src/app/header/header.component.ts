import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private authService: AuthServiceService, private router: Router) { }

  logoutApp() {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('token'); // Supprime le token du localStorage
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
