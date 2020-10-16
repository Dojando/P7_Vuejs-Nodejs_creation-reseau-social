<template>
  <div id="app">
    <header class="header_auth">
      <img class="d-none d-sm-block" src="../assets/icon-left-font-monochrome-black.png" alt="logo et nom de l'application">
      <nav class="auth_links">
        <router-link to="/inscription"><button type="button" class="btn btn-secondary">Inscription</button></router-link>
        <router-link to="/connexion"><button type="button" class="btn btn-secondary">Connexion</button></router-link>
      </nav>
    </header>

    <main class="container">
      <form class="form_auth needs-validation" novalidate>
        <p class="h2">Connexion</p>
        <!-- champ email -->
        <div class="form-group">
          <label for="loginEmail">Adresse Email</label>
          <input v-model="login_email" type="email" class="form-control" id="loginEmail" placeholder="Votre Email" required>
            <!-- message d'erreur -->
          <div class="invalid-feedback">
              Email invalide
          </div>
        </div>
        <!-- champ password -->
        <div class="form-group">
          <label for="loginPassword">Mot de passe</label>
          <input v-model="login_password" type="password" class="form-control" id="loginPassword" placeholder="Votre mot de passe" required>
            <!-- message d'erreur -->
          <div class="invalid-feedback">
            mot de passe invalide
          </div>
        </div>
        <!-- bouton de validation -->
        <button @click="connexion()" class="btn btn-primary">Me connecter</button>
      </form>
    </main>

    <footer class="footer">
      <p>© 2020 Groupomania</p>
    </footer>
  </div>
</template>

<script>
  export default {
	name: 'App',
  data() {
		return {
      login_data: {
        login_email: "",
        login_password:""
      },
      options: {},
      methods: {
        connexion: function() {
          this.options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: this.login_data
          }
          fetch('/api/auth/login', this.options)
            .then(function(response) {
              return response;
            })
        }
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
  background-color: rgb(199, 199, 199);
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
  background-color: rgb(199, 199, 199);
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