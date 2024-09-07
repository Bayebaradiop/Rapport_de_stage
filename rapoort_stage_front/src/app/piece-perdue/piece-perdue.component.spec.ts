import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecePerdueComponent } from './piece-perdue.component';

describe('PiecePerdueComponent', () => {
  let component: PiecePerdueComponent;
  let fixture: ComponentFixture<PiecePerdueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiecePerdueComponent]
    });
    fixture = TestBed.createComponent(PiecePerdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
