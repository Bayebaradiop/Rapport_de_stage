import { Component, OnInit } from '@angular/core';
import { DeclarationService } from 'src/app/core/services/declaration.service';


@Component({
  selector: 'app-piece-perdu-by-person',
  templateUrl: './piece-perdu-by-person.component.html',
  styleUrls: ['./piece-perdu-by-person.component.css']
})
export class PiecePerduByPersonComponent implements OnInit{

  declarations!: any[];
  declaration!: any[];


  constructor(
    private declarationService: DeclarationService,
    // private router: Router,
    // private formBuilder: FormBuilder

  ) {}

  ngOnInit(): void {
    
    this.declarationService.declarationByEmail().subscribe(
      (data)=>{
        this.declaration=data;
        console.log(data);
      },(error)=>{
        console.log(error);
      }
    )

    this.declarationService.getpiecesimilaire().subscribe(
      (data)=>{
        this.declarations = data;
        console.log(data);
      },(error)=>{
        console.log(error);
      }
    )
    
  }

}
