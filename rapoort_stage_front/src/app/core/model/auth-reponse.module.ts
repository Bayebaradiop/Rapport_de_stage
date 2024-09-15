export interface UserData {
  activate: number;
  id: number;
  nom: string;
  prenom :string;
  numTel:string;
  adresse:string;
  typeStructure:string | null;
  structure:string | null;
  matricule:string | null;
  profil:string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;

}

export interface AuthResponse {
  statut: number;
  data: UserData;
  token: string;
}


