import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeclarationService } from '../core/services/declaration.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-dec-piece-remis',
  templateUrl: './modifier-dec-piece-remis.component.html',
  styleUrls: ['./modifier-dec-piece-remis.component.css']
})
export class ModifierDecPieceRemisComponent implements OnInit{
  
  constructor(private decserve: DeclarationService,private router:Router,private formBuilder: FormBuilder,){}

  id:any;

  declarationForm = this.formBuilder.group({
    id: [''],
    typePiece:[''],
    prenomProprietaire:[''],
    nomProprietaire:[''],
    lieu:[''],
    date_ramassage:[''],
    email:[''],
  })

  ngOnInit(): void {
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);

    // Extraire l'ID depuis l'URL
    // Ici, on suppose que l'URL est au format '/Detail/:id'
    const urlParts = currentUrl.split('/');
    this.id = urlParts[urlParts.length - 1]; // L'ID est supposé être la dernière partie de l'URL

    console.log(' ID:', this.id); 

    this.decserve.getPerteById(this.id).subscribe(
      (data)=>{
        console.log(data);
        this.declarationForm.get('id')?.setValue(""+data.id);
        this.declarationForm.get('typePiece')?.setValue(""+data.typePiece);
        this.declarationForm.get('prenomProprietaire')?.setValue(""+data.prenomProprietaire);
        this.declarationForm.get('nomProprietaire')?.setValue(""+data.nomProprietaire);
        this.declarationForm.get('lieu')?.setValue(""+data.lieu);
        this.declarationForm.get('date_ramassage')?.setValue(""+data.date_ramassage);
        this.declarationForm.get('email')?.setValue(""+data.email);
      },(error)=>{
        console.log(error);
      }
    )
    
  }

  modifier(){

    if (!this.declarationForm.valid) {
      console.log(this.declarationForm.value);
    }else{

      console.log(this.declarationForm.value);

      this.decserve.updateDeclarationsFound(this.declarationForm.value).subscribe(
        (data)=>{
          console.log(this.declarationForm.value);
          
          Swal.fire({
            position: "center",  // Modifie la position pour la centrer
            icon: "success",
            title: "Modification de la declaration effectuée avec succès",
            showConfirmButton: false,
            timer: 990
          });
          setTimeout(() => {
            this.router.navigate(['/Declaration']).then(() => {
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
