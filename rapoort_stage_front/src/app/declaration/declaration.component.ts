import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
}
