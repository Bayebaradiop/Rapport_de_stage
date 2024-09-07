import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesTrouveesComponent } from './pieces-trouvees.component';

describe('PiecesTrouveesComponent', () => {
  let component: PiecesTrouveesComponent;
  let fixture: ComponentFixture<PiecesTrouveesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiecesTrouveesComponent]
    });
    fixture = TestBed.createComponent(PiecesTrouveesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
