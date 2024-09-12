export interface Declaration{
    id: number;
    nomProprietaire: string;
    prenomProprietaire: string;
    lieu: string;  
    typePiece: string;
    email: string;                            
    structureDeclarer: string;
    etat: string;
    date_ramassage: string;
    date_declarer:Date;
  }
  export interface DeclarationResponse {
    statut: number;
    data:Declaration[];
    token: string;
  }