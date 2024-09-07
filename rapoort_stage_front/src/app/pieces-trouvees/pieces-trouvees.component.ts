import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pieces-trouvees',
  templateUrl: './pieces-trouvees.component.html',
  styleUrls: ['./pieces-trouvees.component.css']
})
export class PiecesTrouveesComponent implements OnInit {
  today: string | undefined;

  ngOnInit(): void {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
  }
}
