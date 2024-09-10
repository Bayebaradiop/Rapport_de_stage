<!DOCTYPE html>
<html>
<head>
    <title>Confirmation de Déclaration</title>
</head>
<body>
    <h1>Bonjour {{ $nom }}</h1>
    <p>Nous confirmons que votre déclaration a été enregistrée avec succès.</p>
    <p>Détails de la déclaration :</p>
    <ul>
        <li>Nom du propriétaire : {{ $declaration->nomProprietaire }}</li>
        <li>Prénom du propriétaire : {{ $declaration->prenomProprietaire }}</li>
        <li>Type de pièce : {{ $declaration->typePiece }}</li>
        <li>Email : {{ $declaration->email }}</li>
        <li>Structure déclarée : {{ $declaration->structureDeclarer }}</li>
        <li>Date : {{ $declaration->date }}</li>
    </ul>
</body>
</html>
