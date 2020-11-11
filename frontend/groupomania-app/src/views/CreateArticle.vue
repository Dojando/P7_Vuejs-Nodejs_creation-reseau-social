<template>
  <div v-if="userAuth == true" id="app">
    <header class="header">
      <div class="box box_retour">
        <router-link to="/accueil">
          <b-button class="btn_accueil" variant="secondary">
            <span class="texte_accueil">Retour à l'accueil</span>
            <svg class="svg-icon svg_accueil" viewBox="0 0 20 20" fill="white">
							<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
						</svg>
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
            <svg viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
              <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
            </svg>
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

    <main class="container">
      <form class="form_article mx-auto">
        <h2>Publiez un article</h2>
        <div class="form-group">
          <!-- titre de l'article -->
          <label for="titreArticle">Titre de l'article</label>
          <input v-model="articleData.titre" type="text" class="form-control" id="titreArticle" placeholder="Donnez un titre à votre article" required>
          <div class="invalid-feedback">
            Donnez un titre valide à votre article
          </div>
        </div>
        <div class="form-group">
        <!-- contenu de l'article -->
        <label for="texteArticle">Contenu de l'article</label>
          <editor class="form-control"  api-key="t0lyy2w9xjl7fm5l99qahx4lahn2fkvhzk3wixfdg0mlv8ee" :init="{menubar: false}" v-model="articleData.contenu"></editor>
        </div>
        <!-- bouton de publication de l'article -->
        <button @click="publier()" type="submit" class="btn btn-primary">Poster</button>
        <div v-show="errorMessage != null" class="small text-danger mt-2">
          {{ errorMessage }}
        </div>
      </form>
    </main>

    <footer class="footer">
      <p>© 2020 Groupomania</p>
    </footer>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import axios from 'axios';

  export default {
	name: 'App',
	components: {
    Editor
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
      articleData: {
        titre: "",
        contenu: "",
      },
      errorMessage: null,
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
    })
    .catch(() => { 
      this.$router.push({ name: 'Connexion' });
    })      
  },
  methods: {
    deconnexion() {
      axios.get('http://localhost:3000/api/pages/deconnexion', { withCredentials: true })
      .then(() => {
        this.$router.push({ name: 'Connexion' });
      })
      .catch((error) => {
        console.log(error);
      })
    },
    // verification des données et validation
    publier() {
      let valid = true;
      this.errorMessage = null;
      const regex_titre = /^[A-Z0-9 .'"_,()àâãäåæçèéêëìíîïðñòóôõøùúûüýÿ!?-]{1,500}$/i;
      let titreValue = regex_titre.test(this.articleData.titre);
      if (this.articleData.titre.length == 0 || this.articleData.contenu.length == 0) {
        valid = false;
        this.errorMessage = "Veuillez remplir tous les champs"
      } else if (titreValue == false) {
        valid = false;
        this.errorMessage = "Veuillez éviter les caractères spéciaux dans le titre"
      } 
      if (valid == true) {
        axios.post('http://localhost:3000/api/pages/article', {titre: this.articleData.titre, contenu: this.articleData.contenu}, { withCredentials: true })
        .then(() => {
          this.$router.push({ name: 'Accueil'});
        })
        .catch((error) => { 
          console.log(error);
        }) 
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
.header {
  width: 100%;
  height: 60px;
  background-color: rgb(42, 46, 90);
  box-shadow: 0px 2px 5px 0px #8C8C8C;
  display: flex;
  margin-bottom: 50px;
}

.svg_accueil {
  width: 30px;
}

.box_img img {
  width: 170px;
  height: 60px;
  object-fit: cover;
}

.box_img_logo img {
  width: 60px;
  object-fit: cover;
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

/* body */
.form_article {
  max-width: 720px;
}

.form_article h2, .form_article div {
  margin-bottom: 25px;
}

textarea.form-control {
  height: 300px;
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