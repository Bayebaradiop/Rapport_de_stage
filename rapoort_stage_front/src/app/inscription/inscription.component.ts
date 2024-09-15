import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../core/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  message: string = '';
  RegistrationForm = new FormGroup({

    Prenom : new FormControl(''),
    Nom: new FormControl(''),
    Email : new FormControl('',[Validators.required,Validators.email]),
    NumTel : new FormControl(''),
    Adresse : new FormControl(''),
    password: new FormControl(''),

  });

  constructor(private authserve: AuthServiceService,private router: Router){}

  inscription(){
    if(this.RegistrationForm.valid){
      // console.log(this.RegistrationForm.valid);
      this.authserve.registration(this.RegistrationForm.value).subscribe(
        (response) =>{
          console.log(response);
        if (response.statut ===200) {
          console.log('Inscription reussi!');
          this.router.navigate(['/Connexion']);
        }else{
          console.log("Impossible de s'inscrire");
        }
      })
    }else{
      this.message = "Erreur lors de l'insertion des donnees";
    }
  }

}
