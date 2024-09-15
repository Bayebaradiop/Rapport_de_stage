import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { GestionAgentComponent } from './gestion-agent/gestion-agent.component';
import { DemandeComponent } from './demande/demande.component';
import { DetailleDeclarationComponent } from './detaille-declaration/detaille-declaration.component';
import { DetailleCertificatComponent } from './detaille-certificat/detaille-certificat.component';
import { PiecePerdueComponent } from './piece-perdue/piece-perdue.component';
import { PiecesTrouveesComponent } from './pieces-trouvees/pieces-trouvees.component';
import { PiecePerduByPersonComponent } from './piece-perdu-by-person/piece-perdu-by-person.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifierAgentComponent } from './modifier-agent/modifier-agent.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    DashboardComponent,
    InscriptionComponent,
    LoginComponent,
    DeclarationComponent,
    GestionAgentComponent,
    DemandeComponent,
    DetailleDeclarationComponent,
    DetailleCertificatComponent,
    PiecePerdueComponent,
    PiecesTrouveesComponent,
    PiecePerduByPersonComponent,
    ModifierAgentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
