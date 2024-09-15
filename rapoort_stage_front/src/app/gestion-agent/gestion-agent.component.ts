import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../core/services/auth-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Import Location
import { UserData } from '../core/model/auth-reponse.module';
import Swal from 'sweetalert2';
// import { UserData } from '../core/model/auth-reponse.module';


@Component({
  selector: 'app-gestion-agent',
  templateUrl: './gestion-agent.component.html',
  styleUrls: ['./gestion-agent.component.css']
})
export class GestionAgentComponent implements OnInit{

  // tabUser: UserData[] = [];
  selectedAgentId: number | undefined;
  message: string = '';

  AjouterAgent = new FormGroup({
    Prenom : new FormControl(''),
    Nom: new FormControl(''),
    Email : new FormControl('',[Validators.required,Validators.email]),
    NumTel : new FormControl(''),
    Adresse : new FormControl(''),
    password: new FormControl(''),
    TypeStructure: new FormControl(''),
    structure: new FormControl('')
  });


  constructor(private authserve: AuthServiceService,private router: Router,private location: Location){}
  ngOnInit(): void {

    this.AllAgent();
    
  }
  

  // Méthode appelée lors du clic sur "Modifier"
  // openUpdateModal(agentId: number) {
  //   this.selectedAgentId = agentId; // Stocker l'ID de l'agent sélectionné
  //   console.log('ID de l\'agent sélectionné :', this.selectedAgentId);
  //   // Vous pouvez maintenant utiliser cette valeur pour pré-remplir la modale ou effectuer d'autres actions
  
  // }
  AjoutAgent(){
      if(this.AjouterAgent.valid){
        console.log(this.AjouterAgent.value);
        this.authserve.AjoutAgent(this.AjouterAgent.value).subscribe(
          (response) =>{
            console.log(response);
          if (response.statut ===200) {
            console.log('Creation reussi!');

            Swal.fire({
              position: "center",  // Modifie la position pour la centrer
              icon: "success",
              title: "Ajout de l'agent effectuée avec succès",
              showConfirmButton: false,
              timer: 900
            });
            //  this.location.back();  
            setTimeout(() => {
              this.router.navigate(['/GestionAgent']).then(() => {
              window.location.reload(); // Reload the page to refresh data
            });
            }, 800);   
          }else{
            console.log("Impossible de creer");
          }
        })
      }else{
        this.message = "Erreur lors de l'insertion des donnees";
      }
  }
  
  tabUser: UserData[] = [];

  AllAgent() {
    this.authserve.getAllAgents().subscribe(
      (data:UserData[]) => {  // Le type de data est maintenant UserData[]
        this.tabUser = data;  // Assignez le tableau de données reçu
        console.log(this.tabUser = Array.isArray(data) ? data : []);
      },
      (error: any) => {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    );
  }
  // idBurger.valueAsNumber,idUser.valueAsNumber
  Archiver(id:any){

    Swal.fire({
      title: "Etes vous sure?",
      text: "Vous confirmez l'archivement de l'agent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, archiver!"
    }).then((result) => {
      if (result.isConfirmed) {
      console.log(id);
      this.authserve.ArchiverAgent(id).subscribe(
        (data)=>{
          console.log(data);
          Swal.fire({
            position: "center",  // Modifie la position pour la centrer
            icon: "success",
            title: "Modification de l'agent effectuée avec succès",
            showConfirmButton: false,
            timer: 600
          });
          // this.authserve.getAllAgents();
          setTimeout(() => {
            this.router.navigate(['/GestionAgent']).then(() => {
            window.location.reload(); // Reload the page to refresh data
          });
          }, 600);
          
        },(error)=>{
          console.log(error);
          
        }
      )
   
  }
});
}
}
