<template>
  <div v-if="userAuth == true" id="app">
    <header class="header">
      <div class="box box_article">
        <router-link to="/creation">
          <b-button class="btn_article" variant="primary">
            <span class="texte_btn_article">
              Poster un article
            </span> 
            <logoarticle></logoarticle>
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

    <!-- liste d'articles -->
    <div class="container mb-2" v-for="item in apiResponse" :key="item.id">
      <articlepreview :articleId="item.id" :titre="item.titre" :prenom="item.prenom" :nom="item.nom" :date="item.date_creation.split('T')[0]"></articlepreview>
    </div>
    
    <footer class="footer">
      <p>© 2020 Groupomania</p>
    </footer>
  </div>
</template>

<script>
  import articlepreview from "../components/articlePreview";
  import logoarticle from "../components/logo_article";
  import logouser from "../components/logo_user";
  import axios from 'axios';

  export default {
    components: {
      articlepreview,
      logoarticle,
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
        apiResponse: [],
      }
    },
    created() {
      // vérification de l'authentification
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
      
      // Récuperation et affichage des articles
      axios.get('http://localhost:3000/api/pages/articles', { withCredentials: true })
      .then((response) => {
        this.apiResponse = response.data;
      })
      .catch((error) => { 
        console.log(error)
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

.box_article {
  justify-content: left;  
}

.box_img {
  align-self: center;
}

.svg_article {
  width: 29px;
}

.box_img img {
  width: 170px;
  height: 60px;
  object-fit: cover;
}

.box_img_logo img {
  width: 60px;
}


.bi-person-circle {
  width: 1.4em;
  margin-right: 5px;
}

.btn_article {
  margin-left: 10px;
}

.box_drop {
  justify-content: flex-end;  
}

.btn_compte {
  margin-right: 10px;
}

/* body */
.container {
  max-width: 1140px;
}

.info_article {
  color:#d6d8db;
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
  .texte_btn_article {
    display: none;
  }
}

@media screen and (min-width: 576px) {
  .box_img_logo {
    display: none;
  }
  .svg_article {
    display: none;
  }
}
</style>