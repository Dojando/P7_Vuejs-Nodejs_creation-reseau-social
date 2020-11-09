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
          <img src="../assets/icon-left-font-monochrome-white.png" alt="logo et nom de l'application">
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
          <b-dropdown-text v-if='userData.privilege == "admin"'><router-link to="/signalement">Signalement</router-link></b-dropdown-text>
          <b-dropdown-item @click="deconnexion()">Déconnexion</b-dropdown-item>
          <b-dropdown-item>
            <router-link to="/compte">Détails du compte</router-link>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </header>

    <main class="container">
      <div class="activite_utilisateur mx-auto border border-secondary" border-variant="secondary">
        <b-card-header class="header_utilisateur">
          <h2>Activité de 
            <span v-if="prenomUser != null && nomUser != null">{{ prenomUser+' '+nomUser }}</span>
            <span v-if="prenomUser == null && nomUser == null">[Utilisateur indisponible]</span>
          </h2>
          <b-dropdown v-if="userData.privilege == 'admin' && prenomUser != null && nomUser != null && privilegeUser != 'admin'" variant="outline-secondary" size="sm" id="dropdown" right class="btn_compte">
            <template v-slot:button-content>
              <svg width="24" height="24"><path fill="black" d="M6 10a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2zm12 0a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2zm-6 0a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2z" fill-rule="nonzero"></path></svg>
            </template>
            <b-dropdown-item v-b-modal.modal-1 variant="danger" v-if="userData.privilege == 'admin'">Passer Administrateur</b-dropdown-item>
            <b-modal id="modal-1" title="Passer Administrateur">
            <p class="my-4">Voulez-vous vraiment faire passer cet utilisateur Administrateur ?</p>
            <template #modal-footer>
              <div class="box_button_modal">
                <b-button variant="danger" @click="passeradmin()">Oui</b-button>
                <b-button variant="secondary" @click="$bvModal.hide('modal-1')">Non</b-button>  
              </div>
            </template>
            </b-modal>
            
          </b-dropdown>
        </b-card-header>

        <!-- Boutons articles et commentaires -->
        <div class="box_button">
          <button @click="dataswap(1)" type="button" class="btn btn-secondary btn-lg swap_button border border-light">Articles</button>
          <button @click="dataswap(2)" type="button" class="btn btn-secondary btn-lg swap_button border border-light">Commentaires</button>
        </div>

        <!-- liste des articles -->
        <div v-show="datalist == 'article'" class="mx-auto box_contenu">
          <div class="mb-3" v-for="item in articleList" :key="item.id">
            <articlepreview :articleId="item.id" :titre="item.titre" :prenom="item.prenom" :nom="item.nom" :date="item.date_creation.split('T')[0]"></articlepreview>
          </div>
        </div>

        <!-- liste des commentaires -->
        <div v-show="datalist == 'commentaire'" class="mx-auto box_contenu">
          <div class="mb-3" v-for="item in commentaireList" :key="item.id">
            <b-card class="ml-auto mt-3" border-variant="secondary">
              <template v-slot:header>
                <div class="comment_header">
                  <b-card-text class="small info_article">Publié par <span class="font-weight-bold" v-if="item.prenom != null && item.nom != null">{{ auteur(item.prenom, item.nom) }}</span>
                  <span class="font-weight-bold" v-if="item.prenom == null && item.nom == null">[Utilisateur indisponible]</span> le {{item.date_creation.split('T')[0]}} dans <router-link :to="{ name: 'LireArticle', params: { id: item.id_article }}">cet article</router-link>
                  </b-card-text>
                </div>
              </template>
              <div class="small" v-html="item.contenu"></div>
            </b-card>               
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>© 2020 Groupomania</p>
    </footer>
  </div>
</template>

<script>
  import articlepreview from "../components/articlePreview";
  import axios from 'axios';

  export default {
  components: {
    articlepreview
  },
	name: 'App',
  data() {
		return {
      articleList: [],
      commentaireList: [],
      commentaires: null,     
      userData: {
        userId: null,
        prenom: null,
        nom: null,
        email: null,
        privilege: null
      },
      userAuth: false,
      datalist: 'article',
      prenomUser: null,
      nomUser: null,
      privilegeUser: null,
      idUser: null
		}
  },
  created() {
    // verification de la connexion
    axios.get('http://localhost:3000/api/pages/auth-verif', { withCredentials: true })
    .then((response) => {
      this.userAuth = true;
      return this.userData = {
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
    
    // Récuperation et affichage des articles
    axios.post('http://localhost:3000/api/pages/article-utilisateur', {idUser: this.$route.params.id}, { withCredentials: true })
    .then((response) => {
      console.log(response)
      this.articleList = response.data;
    })
    .catch((error) => { 
      console.log(error)
    })
    
    // recuperation les commentaires de l'utilisateur
    axios.post('http://localhost:3000/api/pages/commentaire-utilisateur', {idUser: this.$route.params.id}, { withCredentials: true })
    .then((response) => { 
      console.log(response.data);
      console.log(response);
      return this.commentaireList = response.data;
    })
    .catch((error) => { 
      console.log(error)
    })
    
    // Récuperation des du nom et prénom de l'utilisateur
    axios.post('http://localhost:3000/api/pages/infos-utilisateur', {idUser: this.$route.params.id}, { withCredentials: true })
    .then((response) => {
      console.log(response)
      this.prenomUser = response.data[0].prenom;
      this.nomUser = response.data[0].nom;
      this.privilegeUser = response.data[0].privilege;
      this.idUser = response.data[0].id;
    })
    .catch((error) => { 
      console.log(error)
    })
  },
  methods: {
    deconnexion() {
      axios.get('http://localhost:3000/api/pages/deconnexion', { withCredentials: true })
      .then((response) => {
        console.log(response);
        this.$router.push({ name: 'Connexion' });
      })
      .catch((error) => {
        console.log(error);
      })
    },
    dataswap(type) {
      if (type == 1) {
        return this.datalist = 'article';
      }
      if (type == 2) {
        return this.datalist = 'commentaire'
      }
    },
    passeradmin() {
      axios.post('http://localhost:3000/api/pages/passer-admin', {idUser: this.idUser}, { withCredentials: true })
      .then((response) => {
        console.log(response);
        return window.alert("L'utilisateur est maintenant Administrateur");
      })
      .catch((error) => {
        console.log(error);
      })
    },
    auteur(prenom, nom) {
      return prenom+' '+nom;
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

/* Header */
.header {
  width: 100%;
  height: 60px;
  background-color: rgb(42, 46, 90);
  box-shadow: 0px 2px 5px 0px #8C8C8C;
  display: flex;
  margin-bottom: 50px;
}

.header img {
  width: 200px;
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

.btn_accueil {
  margin-left: 10px;
}

.bi-person-circle {
  width: 1.4em;
  margin-right: 5px;
}

.btn_compte {
  margin-right: 10px;
}

/* Body */
.activite_utilisateur {
  max-width: 720px;
  margin-bottom: 50px;
}

.header_utilisateur {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box_button_modal {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.box_button {
  display: flex;
  margin-bottom: 30px;
}

.box_contenu {
  width: 90%;
}

.swap_button {
 width: 50%;
 border-radius: 0;
 font-size: 1.1em;
}

.button_delete {
  margin-left: 10px;
}

.posts {
  margin-bottom: 30px;
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

/* Media queries */
@media screen and (max-width: 575px) {
  .box_retour {
    flex: 2;
  }
}
</style>