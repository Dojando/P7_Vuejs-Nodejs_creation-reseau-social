<template>
  <div id="app">
    <header class="header_auth">
      <img class="d-none d-sm-block" src="../assets/icon-left-font-monochrome-white.png" alt="logo et nom de l'application">
      <nav class="auth_links">
        <router-link to="/inscription"><button type="button" class="btn btn-secondary">Inscription</button></router-link>
        <router-link to="/connexion"><button type="button" class="btn btn-secondary">Connexion</button></router-link>
      </nav>
    </header>

    <main class="container">
      <form class="form_auth needs-validation" novalidate>
        <p class="h2">Inscription</p>
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
            Votre mot de passe doit contenir entre 6-50 caracters, contenir au moins une lettre majuscule, une minuscule, et un chiffre. Le mot de passe ne peut contenir que des chiffres et des lettres.
          </b-form-text>
          <!-- message d'erreur -->
          <b-card-text v-show="pwdValue == false" class="small text-danger info_article">
            Votre mot de passe doit contenir entre 6-50 caracters, contenir au moins une lettre majuscule, une minuscule, et un chiffre. Le mot de passe ne peut contenir que des chiffres et des lettres.
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
        <!-- bouton de validation -->
        <button @click="inscription()" class="btn btn-primary">M'inscrire</button>
        <b-card-text v-show="errorMessage != null" class="small text-danger mt-2">
          {{ errorMessage }}
        </b-card-text>
        <b-card-text v-show="validationMessage != null" class="small text-success mt-2">
          {{ validationMessage }}
        </b-card-text>
      </form>
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
    axios.get('http://localhost:3000/api/pages/auth-verif', { withCredentials: true })
    .then(() => {
      this.$router.push({ name: 'Accueil' });
    })
  },
  methods: {
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
      if (this.password !== this.confpassword) {
        this.confpwdValue = false;
      } else {
        this.confpwdValue = true;
      }
      let inputValue = [this.prenomValue, this.nomValue, this.emailValue, this.pwdValue, this.confpwdValue];

      for (let i = 0; i < inputValue.length; i++) {
        if (inputValue[i] == false) {
          console.log(inputValue[i]);
          valid = false;
          return;
        }
      }

      if (valid == true) {
        axios.post('http://localhost:3000/api/auth/signup', {
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          password: this.password
        }, { withCredentials: true })
        .then((response) => {
          console.log(response);
          this.$router.push({ name: 'Accueil' });
        })
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
  width: 200px;
  margin-left: 15px;
}

.auth_links {
  display: flex;
}

.auth_links > * {
  margin: 0 10px 0 0;
  font-size: 1.2em;
}

.container {
  display: flex;
  justify-content: center;
}

.form_auth {
  width: 90%;
  max-width: 500px;
  min-width: 270px;
}

/* Footer */
.footer {
  width: 100%;
  height: 50px;
  background-color: rgb(42, 46, 90);
  color: rgb(228, 82, 82);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  position: fixed;
  bottom: 0px;
}

@media screen and (max-width: 575px) {
  .header_auth {
    justify-content: center;
  }
}
</style>