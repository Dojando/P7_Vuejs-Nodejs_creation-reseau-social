<template>
  <div v-if="userAuth == true" id="app">
    <header class="header">
      <div class="box box_retour">
        <router-link to="/accueil">
          <b-button class="btn_accueil" variant="secondary">Retour à l'accueil</b-button>
        </router-link>
      </div>
      
      <div class="box box_img d-none d-sm-block text-center">
        <router-link to="/accueil">
          <img src="../assets/icon-left-font-monochrome-black.png" alt="logo et nom de l'application">
        </router-link>
      </div>
      
      <div class="box box_drop">
        <b-dropdown id="dropdown" right class="m-md-2 btn_compte">
          <template v-slot:button-content>
            <svg viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
              <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
            </svg>
          </template>
          <b-dropdown-text>
            <router-link :to="{ name: 'UserActivity', params: { id: userData.userId }}">{{ userData.prenom+" "+userData.nom }}
            </router-link></b-dropdown-text>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-text v-if='userData.privilege == "admin"'>Tableau de bord</b-dropdown-text>
          <b-dropdown-item @click="deconnexion()">Déconnexion</b-dropdown-item>
          <b-dropdown-item>
            <router-link to="/compte">Détails du compte</router-link>
          </b-dropdown-item>
        </b-dropdown>
      </div>
     
    </header>

    <div class="container">
      <b-card class="details_compte mx-auto" border-variant="secondary" header="Détails du compte" header-border-variant="secondary">
        <b-list-group flush>
          <b-list-group-item><strong>Prenom : </strong>{{ userData.prenom }}</b-list-group-item>
          <b-list-group-item><strong>Nom : </strong>{{ userData.nom }}</b-list-group-item>
          <b-list-group-item><strong>Email : </strong>{{ userData.email }}</b-list-group-item>
          <b-list-group-item><b-button @click="deconnexion()">Deconnexion</b-button></b-list-group-item>
          <b-list-group-item><b-button variant="danger">Supprimer le compte</b-button></b-list-group-item>
        </b-list-group>
      </b-card>
    </div>

    <footer class="footer">
      <p>© 2020 Groupomania</p>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
  data() {
		return {
      userData: {
        userId: null,
        prenom: null,
        nom: null,
        email: null,
        privilege: null
      },
      userAuth: false,
		}
  },
  created() {
  axios.get('http://localhost:3000/api/pages/auth-verif', { withCredentials: true })
  .then((response) => {
    this.userAuth = true;
    this.userData = {
      userId: response.data.userId,
      prenom: response.data.prenom,
      nom: response.data.nom,
      email: response.data.email,
      privilege: response.data.privilege
    }
    console.log(this.userData)
  })
  .catch(() => { 
    this.$router.push('Connexion');
  })      
  },
  methods: {
  deconnexion() {
    axios.get('http://localhost:3000/api/pages/deconnexion', { withCredentials: true })
    .then((response) => {
      console.log(response);
      this.$router.push('connexion');
    })
    .catch((error) => {
      console.log(error);
    })
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

.header {
  width: 100%;
  height: 60px;
  background-color: rgb(199, 199, 199);
  box-shadow: 0px 2px 5px 0px #8C8C8C;
  display: flex;
  margin-bottom: 50px;
}

.box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box_retour {
  justify-content: left;  
}

.box_img {
  align-self: center;
}

.box_drop {
  justify-content: flex-end;  
}

.header img {
  width: 200px;
}

.bi-person-circle {
  width: 1.4em;
  margin-right: 5px;
}

.btn_accueil {
  margin-left: 10px;
}

.btn_compte {
  margin-right: 10px;
}

.container * {
  margin-bottom: 5px;
}

.details_compte {
  max-width: 720px;
}

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
  .box_article {
    flex: 2;
  }
}
</style>