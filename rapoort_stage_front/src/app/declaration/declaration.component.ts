import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeclarationService } from 'src/app/core/services/declaration.service';
import { Declaration } from '../core/model/declaration.model';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  declarations!: Declaration[];
  errorMessage: string | null = null;

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
    this.declarationService.getall().subscribe({
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
  this.declarationService.getall().subscribe({
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
          // Ferme le modal après soumission
          this.showModal1 = false;
          this.getDec();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la déclaration', error);
        }
      });
    }
  }


  deleteDeclaration(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette déclaration ?')) {
      this.declarationService.deleteDeclaration(id).subscribe({
        next: () => {
          console.log(`Déclaration avec l'ID ${id} supprimée avec succès.`);
          this.getDec(); // Rafraîchir la liste après suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la déclaration', error);
        }
      });
    }
  }


  

}

  

