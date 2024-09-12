import { Component, OnInit } from '@angular/core';
import { DeclarationService } from 'src/app/core/services/declaration.service';
import { Declaration } from '../core/model/declaration.model';
import { Router } from '@angular/router';


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
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
  }

 
  

}
