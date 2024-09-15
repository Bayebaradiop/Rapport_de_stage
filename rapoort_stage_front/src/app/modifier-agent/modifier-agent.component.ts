import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../core/services/auth-service.service';
import { FormBuilder, Validators, } from '@angular/forms';
import { UserData } from '../core/model/auth-reponse.module';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-modifier-agent',
  templateUrl: './modifier-agent.component.html',
  styleUrls: ['./modifier-agent.component.css']
})
export class ModifierAgentComponent implements OnInit{
  id:any;
  objetAgent!:any;
  AgentForms = this.formBuilder.group({
    id: [''],
    prenom: [''],
    nom: [''],
    email:['',Validators.required],
    // password:[''],
    typeStructure:[''],
    structure:[''],
    numTel:[''],
    matricule:[''],
    adresse:['']

  });
  constructor(private authserve: AuthServiceService,private router:Router,private formBuilder: FormBuilder,){}
  ngOnInit(): void {
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);

    // Extraire l'ID depuis l'URL
    // Ici, on suppose que l'URL est au format '/Detail/:id'
    const urlParts = currentUrl.split('/');
    this.id = urlParts[urlParts.length - 1]; // L'ID est supposé être la dernière partie de l'URL

    console.log(' ID:', this.id);  

    this.authserve.DetailleAgent(this.id).subscribe(
      (data)=>{
        this.objetAgent = data;
        console.log(data);
        
        this.AgentForms.get('id')?.setValue(""+this.objetAgent.id);
        this.AgentForms.get('prenom')?.setValue(""+this.objetAgent.prenom);
        this.AgentForms.get('nom')?.setValue(""+this.objetAgent.nom);
        this.AgentForms.get('numTel')?.setValue(""+this.objetAgent.numTel); 
        this.AgentForms.get('typeStructure')?.setValue(""+this.objetAgent.typeStructure);
        this.AgentForms.get('structure')?.setValue("" + this.objetAgent.structure);
        this.AgentForms.get('matricule')?.setValue("" + this.objetAgent.matricule);
        this.AgentForms.get('adresse')?.setValue(""+this.objetAgent.adresse);
        this.AgentForms.get('matricule')?.disable();
        this.AgentForms.get('email')?.setValue(""+this.objetAgent.email);


       
        // this.AgentForms.get('NumTel')?.setValue(""+this.objetAgent.numTel);

        
      },(error)=>{
        console.log(error);
        
      }
    )
  
  }

  UpdateAgent(){

    if(this.AgentForms.invalid){
      
      // console.log(this.AgentForms.value);
      return ;
    }else{
      console.log(this.AgentForms.value);
      this.authserve.UpdateAgent(this.AgentForms.value).subscribe(
        (data)=>{
          console.log(data);
          this.router.navigate(['/GestionAgent']);
          Swal.fire({
            position: "center",  // Modifie la position pour la centrer
            icon: "success",
            title: "Modification de l'agent effectuée avec succès",
            showConfirmButton: false,
            timer: 990
          });
          setTimeout(() => {
            this.router.navigate(['/GestionAgent']).then(() => {
            window.location.reload(); // Reload the page to refresh data
          });
          }, 800);
          
        },
        ()=>{
          console.log(Error);
          
        }
      )
    }

  }

}
