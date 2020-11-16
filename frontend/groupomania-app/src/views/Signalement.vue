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
      <div class="activite_utilisateur mx-auto border border-secondary" border-variant="secondary">
        <b-card-header >
          <h2>Commentaires signalés</h2>
        </b-card-header>

        <div class="mx-auto box_contenu">
          <div class="mb-3" v-for="item in commentaireList" :key="item.id">
            <b-card class="ml-auto mt-3" border-variant="secondary">
              <template v-slot:header>
                <!-- header commentaire -->
                <div class="comment_header">
                  <b-card-text class="small info_article">Publié par <span class="font-weight-bold" v-if="item.prenom != null && item.nom != null">{{ auteur(item.prenom, item.nom) }}</span>
                  <span class="font-weight-bold" v-if="item.prenom == null && item.nom == null">[Utilisateur indisponible]</span> le {{item.date_creation.split('T')[0]}} dans <router-link :to="{ name: 'LireArticle', params: { id: item.id_article }}">cet article</router-link>
                  </b-card-text>
                  <b-dropdown variant="outline-secondary" size="sm" id="dropdown" right class="btn_compte">
                    <!-- actions possible -->
                    <template v-slot:button-content>
                      <span class="menu_texte">actions</span>
                      <logoactions></logoactions>
                    </template>
                    <b-dropdown-item variant="danger" @click="suppressioncoms(item.id, item.id_utilisateur, item.id_parent)" v-if="userData.privilege == 'admin'">Supprimer</b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>
              <!-- contenu du commentaire -->
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
  import axios from 'axios';
  import logoaccueil from '../components/logo_accueil';
  import logoactions from '../components/logo_actions';
  import logouser from "../components/logo_user";

  export default {
	name: 'App',
	components: {
    logoaccueil,
    logoactions,
    logouser
  },
  data() {
		return {
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
		}
  },
  created() {
    // verification de la connexion
    axios.get('http://localhost:3000/api/auth/auth-verif', { withCredentials: true })
    .then((response) => {
      if (response.data.privilege == 'admin') {
        this.userAuth = true;
        return this.userData = {
          userId: response.data.userId,
          prenom: response.data.prenom,
          nom: response.data.nom,
          email: response.data.email,
          privilege: response.data.privilege
        }
      } else {
        this.$router.push({ name: 'Accueil' });
      }
    })
    .catch(() => { 
      this.$router.push({ name: 'Connexion' });
    })
      
    // recuperation des commentaires signalés
    this.recupcoms();
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
    // suppression des commentaires
    suppressioncoms(comId, auteurId, parentId) {
      axios.post('http://localhost:3000/api/pages/supprimer-commentaire', {commentaireId: comId, auteurId: auteurId, parentId: parentId}, { withCredentials: true })
      .then(() => {
        this.recupcoms();
      })
      .catch((error) => { 
        console.log(error);
      }) 
    },
    // recuperation des commentaires
    recupcoms() {
      axios.get('http://localhost:3000/api/pages/commentaire-signale', { withCredentials: true })
      .then((response) => { 
        return this.commentaireList = response.data;
      })
      .catch((error) => { 
        console.log(error)
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

.box_img img {
  width: 170px;
  height: 60px;
  object-fit: cover;
}

.box_img_logo img {
  width: 60px;
  object-fit: cover;
}

.svg_accueil {
  width: 30px;
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

.comment_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box_contenu {
  width: 90%;
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
  color: rgb(240, 116, 116);
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
  .menu_texte {
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
  .menu_svg {
    display: none;
  }
}
</style>