import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-piece-perdue',
  templateUrl: './piece-perdue.component.html',
  styleUrls: ['./piece-perdue.component.css']
})
export class PiecePerdueComponent implements OnInit{
    
  today: string | undefined;

  ngOnInit(): void {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
  }

}
