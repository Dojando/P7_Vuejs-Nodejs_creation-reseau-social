<template>
  <form class="form_login needs-validation" novalidate>
    <p class="h2">Connexion</p>
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
    <!-- bouton de validation -->
    <button type="submit" class="btn btn-primary">Me connecter</button>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
}
</script>

<style>
.form_login {
  width: 90%;
  max-width: 500px;
  min-width: 270px;
}
</style>