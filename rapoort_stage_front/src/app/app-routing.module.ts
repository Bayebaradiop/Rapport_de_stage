import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { GestionAgentComponent } from './gestion-agent/gestion-agent.component';
import { DemandeComponent } from './demande/demande.component';
import { DetailleDeclarationComponent } from './detaille-declaration/detaille-declaration.component';
import { DetailleCertificatComponent } from './detaille-certificat/detaille-certificat.component';
import { PiecesTrouveesComponent } from './pieces-trouvees/pieces-trouvees.component';
import { PiecePerdueComponent } from './piece-perdue/piece-perdue.component';
import { PiecePerduByPersonComponent } from './piece-perdu-by-person/piece-perdu-by-person.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'Inscription', component: InscriptionComponent},
  {  path: 'Connexion', component: LoginComponent},
  { path: 'Declaration', component: DeclarationComponent},
  { path: 'GestionAgent', component: GestionAgentComponent},
  { path: 'DemandeCertificat', component: DemandeComponent},
  { path: 'DetailleDeclaration', component: DetailleDeclarationComponent},
  { path: 'DetailleCertificat', component: DetailleCertificatComponent},
  { path: 'PiecesTrouvees', component: PiecesTrouveesComponent},
  { path: 'PiecePerdue', component: PiecePerdueComponent},  
  {  path: 'dashboard', component:DashboardComponent},  
  { path: 'PiecePerdueByUser', component: PiecePerduByPersonComponent},
   { path: '', redirectTo: '/Connexion', pathMatch: 'full' },



  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
