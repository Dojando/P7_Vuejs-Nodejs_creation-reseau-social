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
import logoaccueil from '../components/logo_accueil';
import logouser from "../components/logo_user";

  export default {
	name: 'App',
	components: {
    Editor,
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
      articleData: {
        titre: "",
        contenu: "",
      },
      errorMessage: null,
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