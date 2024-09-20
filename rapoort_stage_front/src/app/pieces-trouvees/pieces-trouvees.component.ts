import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeclarationService } from 'src/app/core/services/declaration.service';
import { Declaration } from '../core/model/declaration.model';

@Component({
  selector: 'app-pieces-trouvees',
  templateUrl: './pieces-trouvees.component.html',
  styleUrls: ['./pieces-trouvees.component.css']
})
export class PiecesTrouveesComponent implements OnInit {
  today: string | undefined;
  errorMessage: string | null = null;
  declarations!: Declaration[];
  declarationForm!: FormGroup;
  filterForm!: FormGroup;

  constructor(
    private declarationService: DeclarationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();  // Initialise les formulaires ici
    this.getDec();    // Charge les déclarations
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

  initForm(): void {
    // Initialisation du formulaire de déclaration
    this.declarationForm = this.formBuilder.group({
      typePiece: ['', Validators.required],
      prenomProprietaire: ['', Validators.required],
      nomProprietaire: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lieu: ['', Validators.required],
      date_ramassage: ['', Validators.required]
    });

    // Initialisation du formulaire de filtre
    this.filterForm = this.formBuilder.group({
      filterTypePiece: [''],
      filterPrenom: [''],
      filterNom: ['']
    });
  }

  applyFilter(): void {
    const filterValues = this.filterForm.value;

    // Applique le filtre seulement si les données existent
    if (this.declarations && this.declarations.length > 0) {
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
  }

  resetFilter(): void {
    this.filterForm.reset();  // Réinitialise le formulaire de filtre
    this.getDec();  // Recharge toutes les déclarations
  }
}
