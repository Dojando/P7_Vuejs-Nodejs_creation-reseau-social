<template>
  <div id="app">
    <header class="header_auth">
      <img src="../assets/icon-left-font-monochrome-white.png" alt="logo et nom de l'application">
      <nav class="auth_links">
        <router-link to="/connexion"><button type="button" class="btn btn-secondary">Connexion</button></router-link>
      </nav>
    </header>

    <main class="container">
      <b-card class="mx-auto" border-variant="secondary" header-border-variant="secondary">
        <template #header>
          <h4 class="h2">Inscription</h4>
        </template>
        <!-- champ prénom -->
        <div class="form-group">
          <label for="Prenom">Prénom</label>
          <input v-model="prenom" type="text" class="form-control" id="Prenom" placeholder="Votre Prénom" required>
          <!-- message d'erreur -->
          <b-card-text v-show="prenomValue == false" class="small text-danger info_article">
            Prenom invalide
          </b-card-text>
        </div>
        <!-- champ nom -->
        <div class="form-group">
          <label for="Nom">Nom</label>
          <input v-model="nom" type="text" class="form-control" id="Nom" placeholder="Votre Nom" required>
          <!-- message d'erreur -->
          <b-card-text v-show="nomValue == false" class="small text-danger info_article">
            Nom invalide
          </b-card-text>
        </div>
        <!-- champ email -->
        <div class="form-group">
          <label for="email">Adresse Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Votre Email" required>
          <!-- message d'erreur -->
          <b-card-text v-show="emailValue == false" class="small text-danger info_article">
            Email invalide
          </b-card-text>
        </div>
        <!-- champ password -->
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Votre mot de passe" required>
          <!-- message d'informations -->
          <b-form-text v-show="pwdValue != false" id="password-help-block">
            Votre mot de passe doit contenir entre 6-50 caracters, contenir au moins une lettre majuscule, minuscule, et un chiffre. Le mot de passe ne peut contenir que des chiffres et des lettres.
          </b-form-text>
          <!-- message d'erreur -->
          <b-card-text v-show="pwdValue == false" class="small text-danger info_article">
            Votre mot de passe doit contenir entre 6-50 caracters, contenir au moins une lettre majuscule, minuscule, et un chiffre. Le mot de passe ne peut contenir que des chiffres et des lettres.
          </b-card-text>
        </div>
        <!-- champ confirmation password -->
        <div class="form-group">
          <label for="confpassword">Confirmer votre Mot de passe</label>
          <input v-model="confpassword" type="password" class="form-control" id="confpassword" placeholder="Votre mot de passe" required>
          <!-- message d'erreur -->
          <b-card-text v-show="confpwdValue == false" class="small text-danger info_article">
            Le mot de passe ne correspond pas
          </b-card-text>
        </div>
        <div>
          <!-- bouton de validation -->
          <button @click="inscription()" class="btn btn-primary">M'inscrire</button>
          <b-card-text v-show="errorMessage != null" class="small text-danger mt-2">
            {{ errorMessage }}
          </b-card-text>
          <b-card-text v-show="validationMessage != null" class="small text-success mt-2">
            {{ validationMessage }}
          </b-card-text>          
        </div>


      </b-card>
    </main>

    <footer class="footer">
      <p>© 2020 Groupomania</p>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
	name: 'App',
  data() {
		return {
      prenom: "",
      nom: "",
      email: "",
      password:"",
      confpassword:"",
      prenomValue: null,
      nomValue: null,
      emailValue: null,
      pwdValue: null,
      confpwdValue: null,
      errorMessage: null,
      validationMessage: null,
    }
  },
  created() {
    axios.get('http://localhost:3000/api/auth/auth-redirection', { withCredentials: true })
    .then((result) => {
      if (result.data.length !== 0) {
        this.$router.push({ name: 'Accueil' });
      }
    })
  },
  methods: {
    // validation des données, inscription et redirection vers l'accueil
    inscription() {
      let valid = true;
      this.errorMessage = null;
      this.validationMessage = null;
      const regex_nom_prenom = /^[A-Z- ]{1,100}$/i;
      const regex_email = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]){2,4}$/;
      const regex_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,50}$/;
      this.prenomValue = regex_nom_prenom.test(this.prenom);
      this.nomValue = regex_nom_prenom.test(this.nom);
      this.emailValue = regex_email.test(this.email);
      this.pwdValue = regex_pwd.test(this.password);
      this.confpwdValue = this.password === this.confpassword;

      const inputValue = [this.prenomValue, this.nomValue, this.emailValue, this.pwdValue, this.confpwdValue];

      for (let i = 0; i < inputValue.length; i++) {
        if (inputValue[i] === false) {
          valid = false;
          return;
        }
      }
      if (valid) {
        axios.post('http://localhost:3000/api/auth/signup', {
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          password: this.password
        }, { withCredentials: true })
        .then(() => this.$router.push({ name: 'Accueil' }))
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.response.data.message;
        });    
      }
    }
	}
  }
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app { 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
}

/* header */
.header_auth {
  width: 100%;
  height: 60px;
  margin-bottom: 90px;
  background-color: rgb(42, 46, 90);
  box-shadow: 0px 2px 5px 0px #8C8C8C;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header_auth img {
  width: 170px;
  margin-left: 15px;
  height: 60px;
  object-fit: cover;
}

.auth_links > * {
  margin: 0 10px 0 0;
  font-size: 1.2em;
}

/* body */
.container {
  width: 90%;
  max-width: 500px;
  min-width: 270px;
}

/* Footer */
.footer {
  width: 100%;
  height: 50px;
  background-color: rgb(42, 46, 90);
  color: rgb(240, 116, 116);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  position: fixed;
  bottom: 0px;
}
</style>