<template>
  <form class="form_signup needs-validation" novalidate>
    <p class="h2">Inscription</p>
    <!-- champ prénom -->
    <div class="form-group">
        <label for="Prenom">Prénom</label>
        <input type="text" class="form-control" id="Prenom" placeholder="Votre Prénom" required>
        <!-- message d'erreur -->
        <div class="invalid-feedback">
            Prénom invalide
        </div>
    </div>
    <!-- champ nom -->
    <div class="form-group">
        <label for="Nom">Nom</label>
        <input type="text" class="form-control" id="Nom" placeholder="Votre Nom" required>
        <!-- message d'erreur -->
        <div class="invalid-feedback">
            Nom invalide
        </div>
    </div>
    <!-- champ email -->
    <div class="form-group">
        <label for="Email">Adresse Email</label>
        <input type="email" class="form-control" id="Email" placeholder="Votre Email" required>
        <!-- message d'erreur -->
        <div class="invalid-feedback">
            Email invalide
        </div>
    </div>
    <!-- champ password -->
    <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" id="password" placeholder="Votre mot de passe" required>
        <!-- message d'erreur -->
        <div class="invalid-feedback">
            mot de passe invalide
        </div>
    </div>
    <!-- champ confirmation password -->
    <div class="form-group">
        <label for="confpassword">Confirmer votre Mot de passe</label>
        <input type="password" class="form-control" id="confpassword" placeholder="Votre mot de passe" required>
        <!-- message d'erreur -->
        <div class="invalid-feedback">
            mot de passe invalide
        </div>
    </div>
    <!-- bouton de validation -->
    <button type="submit" class="btn btn-primary">M'inscrire</button>
  </form>
</template>

<script>
export default {
  name: "SignupForm",
}
</script>

<style>
.form_signup {
  width: 90%;
  max-width: 500px;
  min-width: 270px;
}
</style>