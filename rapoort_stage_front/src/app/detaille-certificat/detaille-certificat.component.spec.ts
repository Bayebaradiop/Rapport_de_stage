import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleCertificatComponent } from './detaille-certificat.component';

describe('DetailleCertificatComponent', () => {
  let component: DetailleCertificatComponent;
  let fixture: ComponentFixture<DetailleCertificatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailleCertificatComponent]
    });
    fixture = TestBed.createComponent(DetailleCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
