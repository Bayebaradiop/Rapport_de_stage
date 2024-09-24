import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeclarationService } from 'src/app/core/services/declaration.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-piece-perdue',
  templateUrl: './piece-perdue.component.html',
  styleUrls: ['./piece-perdue.component.css']
})
export class PiecePerdueComponent implements OnInit{
  
  declarations!: any[];
  constructor(
    private declarationService: DeclarationService,
    private router: Router,
    private formBuilder: FormBuilder

  ) {}

  DeclarationPerteControl = new FormGroup({
    prenomProprietaire : new FormControl(''),
    nomProprietaire: new FormControl(''),
    email : new FormControl('',[Validators.required]),
    date_perte: new FormControl(''),
    typePiece: new FormControl(''),
    lieu: new FormControl('')
  });

  today: string | undefined;

  ngOnInit(): void {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
    this.TousLesDeclares();
    
  }

  DeclarationPerte(){
    // ajouterDeclarationPerte
    if (this.DeclarationPerteControl.valid) {
      this.declarationService.ajouterDeclarationPerte(this.DeclarationPerteControl.value).subscribe(
        (data)=>{
          console.log(data);
          
        },(error)=>{
          console.log(error);
          
        }
      )
      console.log(this.DeclarationPerteControl.value);
    }else{
      console.log("erreur lors de l'insertion des donnees");
      
    }
  }

  TousLesDeclares(){
    this.declarationService.getAllPerteOnStruc().subscribe(
      (data)=>{
        this.declarations = data;
        console.log(data);
      },(error)=>{
        console.log(error);
      }
    )
  }

  Archiver(id:number){
    Swal.fire({
      title: "Etes vous sure?",
      text: "Vous confirmez la suppression de la declaration",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
      console.log(id);
      this.declarationService.deleteDeclaration(id).subscribe(
        (data)=>{
          console.log(data);
          Swal.fire({
            position: "center",  // Modifie la position pour la centrer
            icon: "success",
            title: "La declaration a ete supprime avec success",
            showConfirmButton: false,
            timer: 600
          });
          setTimeout(() => {
            this.router.navigate(['/PiecePerdue']).then(() => {
            window.location.reload(); // Reload the page to refresh data
          });
          }, 600);
          
        },(error)=>{
          console.log(error);
        }
      )
    }
  });
  }

}
