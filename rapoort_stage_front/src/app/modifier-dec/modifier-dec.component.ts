import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../core/services/auth-service.service';
import { DeclarationService } from '../core/services/declaration.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-dec',
  templateUrl: './modifier-dec.component.html',
  styleUrls: ['./modifier-dec.component.css']
})
export class ModifierDecComponent implements OnInit{
  
  constructor(private decService:DeclarationService,private authserve: AuthServiceService,private router:Router,private formBuilder: FormBuilder,){}
  
  id:any;

  modifierDeclarationForm = this.formBuilder.group({
    id:[''],
    typePiece:[''],
    prenomProprietaire:[''],
    nomProprietaire:[''],
    lieu:[''],
    date_perte:[''],
    email:[''],
  });
  ngOnInit(): void {
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);

    // Extraire l'ID depuis l'URL
    // Ici, on suppose que l'URL est au format '/Detail/:id'
    const urlParts = currentUrl.split('/');
    this.id = urlParts[urlParts.length - 1]; // L'ID est supposé être la dernière partie de l'URL

    console.log(' ID:', this.id);  

    this.decService.getPerteById(this.id).subscribe(
      (data)=>{

        console.log(data);

        this.modifierDeclarationForm.get('id')?.setValue(""+data.id);
        this.modifierDeclarationForm.get('typePiece')?.setValue(""+data.typePiece);
        this.modifierDeclarationForm.get('prenomProprietaire')?.setValue(""+data.prenomProprietaire);
        this.modifierDeclarationForm.get('nomProprietaire')?.setValue(""+data.nomProprietaire);
        this.modifierDeclarationForm.get('lieu')?.setValue(""+data.lieu);
        this.modifierDeclarationForm.get('date_perte')?.setValue(""+data.date_perte);
        this.modifierDeclarationForm.get('email')?.setValue(""+data.email);
 
      },(error)=>{
        console.log(error);
      }
    )
  }

  onSubmit(){
    if (!this.modifierDeclarationForm.valid) {
      console.log(this.modifierDeclarationForm.value);
      
      return ;
    }else{
      console.log(this.modifierDeclarationForm.value);

      this.decService.updateLostDoc(this.modifierDeclarationForm.value).subscribe(
        (data)=>{
          console.log(this.modifierDeclarationForm.value);
          
          Swal.fire({
            position: "center",  // Modifie la position pour la centrer
            icon: "success",
            title: "Modification de la declaration effectuée avec succès",
            showConfirmButton: false,
            timer: 990
          });
          setTimeout(() => {
            this.router.navigate(['/PiecePerdue']).then(() => {
            window.location.reload(); // Reload the page to refresh data
          });
          }, 800);
        },(error)=>{
          console.log(error);
          
        }
      )
    }
  }
  
}
