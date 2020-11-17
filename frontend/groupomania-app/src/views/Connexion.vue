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
          <h4 class="h2">Connexion</h4>
        </template>
        <!-- champ email -->
        <div class="form-group" >
          <label for="email">Adresse Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Votre Email" required>
          <!-- message d'erreur -->
          <b-card-text v-show="emailValue == false" class="small text-danger info_article">
            Champ vide
          </b-card-text>
        </div>
        <!-- champ password -->
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Votre mot de passe" required>
            <!-- message d'erreur -->
          <b-card-text v-show="pwdValue == false" class="small text-danger info_article">
            Champ vide
          </b-card-text>
        </div>
        <div>
          <!-- bouton de validation -->
          <button @click="connexion()" class="btn btn_connexion">Me connecter</button>
          <b-card-text v-show="errorMessage != null" class="small text-danger mt-2">
            {{ errorMessage }}
          </b-card-text>            
        </div>
      </b-card>
      <b-card-text class="mt-3 text-center">
        <router-link class="lien_inscription" to="/inscription">
          Pas de compte ? Inscrivez-vous ici !
        </router-link>
      </b-card-text> 
              
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
      email: "",
      password:"",
      emailValue: null,
      pwdValue: null,
      errorMessage: null,
    }
  },
  created() {
    // si l'utilisateur a deja un token valide, redirection vers l'accueil
    axios.get('http://localhost:3000/api/auth/auth-redirection', { withCredentials: true })
    .then((result) => {
      if (result.data === true) {
        this.$router.push({ name: 'Accueil' });
      }
    })
  },
  methods: {
    connexion() {
      let valid = true;
      this.errorMessage = null;
      this.emailValue = null;
      this.pwdValue = null;
      if (this.email.length == 0) {
        this.emailValue = false;
        valid = false;
      }
      if (this.password.length == 0) {
        this.pwdValue = false;
        valid = false;
      }
      if (valid == true) {        
        axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        }, { withCredentials: true })
        .then(() => {
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

.btn_connexion {
  background-color: rgb(15, 84, 231);
  color: white;
}

.lien_inscription {
  color: rgb(15, 84, 231);
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