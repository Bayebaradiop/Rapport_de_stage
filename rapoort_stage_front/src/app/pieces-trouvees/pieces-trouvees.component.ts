import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(
    private declarationService: DeclarationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getDec();
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
 
  

}
