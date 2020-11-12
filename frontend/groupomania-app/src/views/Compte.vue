<template>
  <div v-if="userAuth == true" id="app">
    <header class="header">
      <div class="box box_retour">
        <router-link to="/accueil">
          <b-button class="btn_accueil" variant="secondary">
            <span class="texte_accueil">Retour à l'accueil</span>
            <logoaccueil></logoaccueil>
          </b-button>
        </router-link>
      </div>
      
      <div class="box box_img d-none d-sm-block text-center">
        <router-link to="/accueil">
          <img src="../assets/icon-left-font-monochrome-white.png" alt="logo et nom de l'application">
        </router-link>
      </div>
      <div class="box box_img_logo text-center">
        <router-link to="/accueil">
          <img src="../assets/icon.png" alt="logo et nom de l'application">
        </router-link>
      </div>
      
      <div class="box box_drop">
        <b-dropdown id="dropdown" right class="m-md-2 btn_compte">
          <template v-slot:button-content>
            <logouser></logouser>
          </template>
          <b-dropdown-text>
            <router-link :to="{ name: 'me' }">{{ userData.prenom+" "+userData.nom }}
            </router-link></b-dropdown-text>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-text v-if='userData.privilege == "admin"'><router-link to="/signalement">Signalement</router-link></b-dropdown-text>
          <b-dropdown-item>
            <router-link to="/compte">Détails du compte</router-link>
          </b-dropdown-item>
          <b-dropdown-item @click="deconnexion()">Déconnexion</b-dropdown-item>
        </b-dropdown>
      </div>
     
    </header>

    <div class="container">
      <b-card class="details_compte mx-auto" border-variant="secondary" header="Détails du compte" header-border-variant="secondary">
        <b-list-group flush>
          <!-- infos utilisateur -->
          <b-list-group-item><strong>Prenom : </strong>{{ userData.prenom }}</b-list-group-item>
          <b-list-group-item><strong>Nom : </strong>{{ userData.nom }}</b-list-group-item>
          <b-list-group-item><strong>Email : </strong>{{ userData.email }}</b-list-group-item>
          <!-- bouton de deconnexion -->
          <b-list-group-item><b-button @click="deconnexion()">Deconnexion</b-button></b-list-group-item>
          <!-- bouton de suppression de compte -->
          <b-list-group-item><b-button v-b-modal.modal-1 variant="danger">Supprimer le compte</b-button>
          </b-list-group-item>
          <!-- fenetre de validation de suppression -->
          <b-modal id="modal-1" title="Suppression de compte">
          <p class="my-4">Voulez-vous vraiment supprimer votre compte ?</p>
          <template #modal-footer>
            <div class="box_button_modal">
            <b-button variant="danger" @click="suppression()">Oui</b-button>
            <b-button variant="secondary" @click="$bvModal.hide('modal-1')">Non</b-button>  
            </div>
          </template>
          </b-modal>
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
  import logoaccueil from '../components/logo_accueil';
  import logouser from "../components/logo_user";

  export default {
  components: {
    logoaccueil,
    logouser
  },
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
  axios.get('http://localhost:3000/api/auth/auth-verif', { withCredentials: true })
  .then((response) => {
    this.userAuth = true;
    this.userData = {
      userId: response.data.userId,
      prenom: response.data.prenom,
      nom: response.data.nom,
      email: response.data.email,
      privilege: response.data.privilege
    }
  })
  .catch(() => { 
    this.$router.push({ name: 'Connexion' });
  })      
  },
  methods: {
  deconnexion() {
    axios.get('http://localhost:3000/api/auth/deconnexion', { withCredentials: true })
    .then(() => {
      this.$router.push({ name: 'Connexion' });
    })
    .catch((error) => {
      console.log(error);
    })
  },
  suppression() {
    axios.get('http://localhost:3000/api/auth/suppression', { withCredentials: true })
    .then(() => {
      this.deconnexion();
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

/* header */
.header {
  width: 100%;
  height: 60px;
  background-color: rgb(42, 46, 90);
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

.svg_accueil {
  width: 30px;
}

.box_img_logo img {
  width: 60px;
  object-fit: cover;
}

.box_drop {
  justify-content: flex-end;  
}

.box_img img {
  width: 170px;
  height: 60px;
  object-fit: cover;
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

/* body */
.container * {
  margin-bottom: 5px;
}

.box_button_modal {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.details_compte {
  max-width: 720px;
}

/* footer */
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

/* media queries */
@media screen and (max-width: 575px) {
  .texte_accueil {
    display: none;
  }
}

@media screen and (min-width: 576px) {
  .box_img_logo {
    display: none;
  }
  .svg_accueil {
    display: none;
  }
}
</style>