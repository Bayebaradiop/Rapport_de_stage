import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeclarationService } from 'src/app/core/services/declaration.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modifierdeclaration',
  templateUrl: './modifierdeclaration.component.html',
  styleUrls: ['./modifierdeclaration.component.css']
})
export class ModifierdeclarationComponent implements OnInit {
  declarationForm: FormGroup;
  declarationId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private declarationService: DeclarationService,
    private router: Router,
    private location: Location
  ) {
    // Initialisation du formulaire
    this.declarationForm = this.fb.group({
      nomProprietaire: ['', Validators.required],
      prenomProprietaire: ['', Validators.required],
      typePiece: ['', Validators.required],
      lieu: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_ramassage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID de la déclaration à modifier à partir de l'URL
    this.declarationId = this.route.snapshot.paramMap.get('id')!;
    console.log('ID de la déclaration:', this.declarationId); // Ajoute ceci pour vérifier l'ID
    this.loadDeclaration(); // Charger la déclaration existante
  }

  loadDeclaration(): void {
    this.declarationService.getDeclarationById(this.declarationId).subscribe(
      (declaration) => {
        console.log('Données de la déclaration:', declaration); // Vérifie la réponse ici
        this.declarationForm.patchValue(declaration); // Remplir le formulaire avec les données
      },
      (error) => {
        console.error('Erreur lors du chargement de la déclaration', error);
      }
    );
  }

  updateDeclaration(): void {
    if (this.declarationForm.valid) {
      const updatedDeclaration = { id: this.declarationId, ...this.declarationForm.value };
      this.declarationService.updatedec(updatedDeclaration).subscribe(
        () => {
          this.router.navigate(['/GestionAgent']); // Redirection après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la déclaration', error);
        }
      );
    }
  }

  cancel(): void {
    this.location.back(); // Retour à la page précédente
  }
}
