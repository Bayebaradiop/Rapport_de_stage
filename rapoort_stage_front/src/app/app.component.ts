import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isSingInPage = false;
  isSingUpPage = false;
  isDeclaration = false;
  isGestAgnt = false;
  isDemande = false;
  isDetaille = false;
  isCertificatDetaille = false;
  IsFind = false;
  ISlost =false;
  ISPerteByUser =false;
  IsUpdatePage = false;
  modifier = false;


  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSingInPage = this.router.url ==='/Inscription';
        this.isSingUpPage = this.router.url ==='/Connexion';
        this.isDeclaration = this.router.url ==='/Declaration';
        this.isGestAgnt = this.router.url ==='/GestionAgent';
        this.isDemande = this.router.url ==='/DemandeCertificat';
        this.isDetaille = this.router.url ==='/DetailleDeclaration';
        this.isCertificatDetaille = this.router.url ==='/DetailleCertificat';
        this.ISlost = this.router.url ==='/PiecePerdue';
        this.IsFind = this.router.url ==='/PiecesTrouvees';
        this.ISPerteByUser = this.router.url ==='/PiecePerdueByUser';
        this.IsUpdatePage = this.router.url.startsWith('/Modifier/');
        this.modifier = this.router.url.startsWith('/Modifierdeclaration/');

      }
    });
  }
  title = 'rapoort_stage';
}
