import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeclarationService } from 'src/app/core/services/declaration.service';
import { Declaration } from '../core/model/declaration.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  declarations!: Declaration[];
  errorMessage: string | null = null;

  loader:boolean = false;
  declarationForm!: FormGroup;
  filterForm!:FormGroup;

  constructor(
    private declarationService: DeclarationService,
    private router: Router,
    private formBuilder: FormBuilder

  ) {}

  ngOnInit(): void {
    this.getDec();
    this.initForm();

  }

  getDec(): void {
    this.declarationService.getallbystruc().subscribe({
      next: (data: Declaration[]) => {
        this.declarations = data;
        console.log('Déclarations récupérées:', this.declarations); 
      },
      error: (error: any) => { 
        this.errorMessage = 'Erreur lors du chargement des déclarations.';
        console.error('Erreur:', error);
      }
    });
  }


  showModal1: boolean = false;
  showModal2: boolean = false; 

  openModal1() {
    this.showModal1 = true;
  }

  closeModal1() {
    this.showModal1 = false;
  }

  openModal2() {
    this.showModal2 = true;
  }

  closeModal2() {
    this.showModal2 = false;
  }

  initForm(): void {
    this.declarationForm = this.formBuilder.group({
      typePiece: ['', Validators.required],
      prenomProprietaire: ['', Validators.required],
      nomProprietaire: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lieu: ['', Validators.required],
      date_ramassage: ['', Validators.required]
    });

    this.filterForm = this.formBuilder.group({
      filterTypePiece: [''],
      filterPrenom: [''],
      filterNom: ['']
    });
   
  }

  applyFilter(): void {
    const filterValues = this.filterForm.value;
    this.declarationService.getallbystruc().subscribe({
      next: (data: Declaration[]) => {
        this.declarations = data.filter(declaration => {
          return (!filterValues.filterTypePiece || declaration.typePiece.includes(filterValues.filterTypePiece)) &&
                (!filterValues.filterPrenom || declaration.prenomProprietaire.toLowerCase().includes(filterValues.filterPrenom.toLowerCase())) &&
                (!filterValues.filterNom || declaration.nomProprietaire.toLowerCase().includes(filterValues.filterNom.toLowerCase()));
        });
        console.log('Déclarations filtrées:', this.declarations);
      },
      error: (error: any) => {
        this.errorMessage = 'Erreur lors du filtrage des déclarations.';
        console.error('Erreur:', error);
      }
    });
  }

  resetFilter(): void {
    this.filterForm.reset();
    this.getDec();  // Recharge les données sans filtre
  }


  onSubmit(): void {
    if (this.declarationForm.valid) {
      const declarationData = this.declarationForm.value;
      this.declarationService.addDeclaration(declarationData).subscribe({
        next: (response) => {
          console.log('Déclaration ajoutée avec succès', response);
          // Fermer le modal après soumission
          this.showModal1 = false;

          this.declarations.push(response); 

          this.declarationForm.reset();

          this.getDec();
          

          setTimeout(() => {
            window.location.reload();
          }, 0); 
          
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la déclaration', error);
        }
      });
    }
  }


  deleteDeclaration(id: number): void {
    // if (confirm('Êtes-vous sûr de vouloir supprimer cette déclaration ?')) {
    //   this.declarationService.deleteDeclaration(id).subscribe({
    //     next: () => {
    //       console.log(`Déclaration avec l'ID ${id} supprimée avec succès.`);
    //       this.getDec(); // Rafraîchir la liste après suppression
    //     },
    //     error: (error) => {
    //       console.error('Erreur lors de la suppression de la déclaration', error);
    //     }
    //   });
    // }
    Swal.fire({
      title: "Etes vous sure?",
      text: "Vous confirmez la suppression de la declaration!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
      console.log(id);
      this.declarationService.deleteDeclaration(id).subscribe(
        (data)=>{
          console.log(data);
          Swal.fire({
            position: "center",  // Modifie la position pour la centrer
            icon: "success",
            title: "Modification de l'agent effectuée avec succès",
            showConfirmButton: false,
            timer: 600
          });
          // this.authserve.getAllAgents();
            this.getDec(); // Rafraîchir la liste après suppression

        },(error)=>{
          console.log(error);
          
        }
      )
   
  }
});
}


  
  updateEtatDeclaration(id: number): void {
    this.loader = true;
    this.declarationService.updateEtatDeclaration(id).subscribe({
      next: (response) => {
        console.log('État de la déclaration mis à jour avec succès', response);
        this.getDec();
        
        setTimeout(() => {
          window.location.reload();
        }, 0); 
         // Rafraîchir la liste des déclarations
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'état de la déclaration', error);
        this.loader = false;
      }
    });
  }
  

}

  

