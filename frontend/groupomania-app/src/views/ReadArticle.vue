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
      <article>
        <b-card class="contenu_article mx-auto" border-variant="secondary">
          <template v-slot:header>
            <div class="titre_menu">
              <h2>{{ article.titre }}</h2>
              <b-dropdown v-if="article.id_utilisateur == userData.userId || userData.privilege == 'admin'" variant="outline-secondary" size="sm" id="dropdown" right class="btn_compte">
                <template v-slot:button-content>
                  <svg width="24" height="24"><path fill="black" d="M6 10a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2zm12 0a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2zm-6 0a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2z" fill-rule="nonzero"></path></svg>
                </template>
                <b-dropdown-item variant="danger" @click="suppressionarticle()">Supprimer</b-dropdown-item>
              </b-dropdown>
            </div>
          </template>
          <div class="text_article" v-html="article.contenu">
          </div>
          <template v-slot:footer>
            <b-card-text class="small info_article">
              Publié par 
              <router-link v-if="article.prenom != null && article.nom != null" :to="{ name: 'UserActivity', params: { id: article.id_utilisateur }}">{{ article.prenom+' '+article.nom }}</router-link>
              <span class="font-weight-bold" v-if="article.prenom == null && article.nom == null">[Utilisateur indisponible]</span> le {{ article.date_creation }}
            </b-card-text>
            <b-button @click="copylink()" variant="outline-secondary">Copier le lien de l'article</b-button>
          </template>
        </b-card>
      </article>
      
      <!-- espace commentaires -->
      <b-card class="espace_commentaire mx-auto" border-variant="secondary">
        <template v-slot:header>
          <h3>Commentaires</h3>
        </template>

        <div class="mx-auto border border-secondary">
          <b-card-header>
            <p class="h5">Postez un commentaire</p>  
          </b-card-header>
          <editor v-model="commentaireContenu" class="form-control"  api-key="t0lyy2w9xjl7fm5l99qahx4lahn2fkvhzk3wixfdg0mlv8ee" :init="{menubar: false}"></editor>
        </div>
        <div class="poster_commentaire">
          <button @click="commentaire()" class="btn btn-primary btn_commentaire">Poster</button>
          <div v-show="errorMessageCommentaire != null" class="small text-danger mt-2">
            {{ errorMessageCommentaire }}
          </div>
          <b-card-text v-show="valideMessageCommentaire == true" class="small text-success mt-2">
            Message posté
          </b-card-text>          
        </div>

        <!-- commentaire -->
        <div v-if="commentaires != null">
          <div v-for="parent in commentairesParents()" :key="parent.id">
            <b-card class="mx-auto mt-3" border-variant="secondary">
              <template v-slot:header>
                <div class="comment_header">
                  <b-card-text class="small info_article">Publié par <router-link v-if="parent.prenom != null && parent.nom != null" :to="{ name: 'UserActivity', params: { id: parent.id_utilisateur }}">{{ auteur(parent.prenom, parent.nom) }}</router-link>
                  <span class="font-weight-bold" v-if="parent.prenom == null && parent.nom == null">[Utilisateur indisponible]</span> le {{ parent.date_creation.split('T')[0] }}</b-card-text>
                  <b-dropdown variant="outline-secondary" size="sm" id="dropdown" right class="btn_compte">
                    <template v-slot:button-content>
                      <svg width="24" height="24"><path fill="black" d="M6 10a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2zm12 0a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2zm-6 0a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2z" fill-rule="nonzero"></path></svg>
                    </template>
                    <b-dropdown-item v-b-toggle="JSON.stringify(parent.id)">Répondre</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item variant="danger" @click="suppressioncoms(parent.id, parent.id_utilisateur, parent.id_parent)" v-if="parent.id_utilisateur == userData.userId || userData.privilege == 'admin'">Supprimer</b-dropdown-item>
                    <b-dropdown-item v-if="userData.privilege != 'admin' && parent.id_utilisateur != userData.userId" variant="danger" @click="signalementcoms(parent.id)">Signaler</b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>
              <div class="small" v-html="parent.contenu"></div>
            </b-card>
            <b-collapse :id="JSON.stringify(parent.id)" class="mt-2">
              <b-card class="mx-auto">
                <div class="form-group">
                  <editor v-model="reponseContenu" class="form-control"  api-key="t0lyy2w9xjl7fm5l99qahx4lahn2fkvhzk3wixfdg0mlv8ee" :init="{menubar: false}"></editor>
                </div>
                <button @click="reponse(parent.id)" class="btn btn-primary">Poster</button>
                <div v-show="errorMessageReponse != null" class="small text-danger mt-2">
                  {{ errorMessageReponse }}
                </div>
                <b-card-text v-show="valideMessageReponse == true" class="small text-success mt-2">
                  Message posté
                </b-card-text>
              </b-card>
            </b-collapse>

            <!-- reponses -->
            <div class="mb-3" v-for="child in commentairesEnfants(parent.id)" :key="child.id">
              <b-card style="width: 90%" class="ml-auto mt-3" border-variant="secondary">
                <template v-slot:header>
                  <div class="comment_header">
                    <b-card-text class="small info_article">Publié par <router-link v-if="child.prenom != null && child.nom != null" :to="{ name: 'UserActivity', params: { id: child.id_utilisateur }}">{{ auteur(child.prenom, child.nom) }}</router-link>
                  <span class="font-weight-bold" v-if="child.prenom == null && child.nom == null">[Utilisateur indisponible]</span> le {{child.date_creation.split('T')[0]}}</b-card-text>
                  <b-dropdown variant="outline-secondary" size="sm" id="dropdown" right class="btn_compte">
                    <template v-slot:button-content>
                      <svg width="24" height="24"><path fill="black" d="M6 10a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2zm12 0a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2zm-6 0a2 2 0 00-2 2c0 1.1.9 2 2 2a2 2 0 002-2 2 2 0 00-2-2z" fill-rule="nonzero"></path></svg>
                    </template>
                    <b-dropdown-item variant="danger" @click="suppressioncoms(child.id, child.id_utilisateur, child.id_parent)" v-if="child.id_utilisateur == userData.userId || userData.privilege == 'admin'">Supprimer</b-dropdown-item>
                    <b-dropdown-item variant="danger" v-if="child.id_utilisateur != userData.userId && userData.privilege != 'admin'" @click="signalementcoms(child.id)">Signaler</b-dropdown-item>
                  </b-dropdown>
                  </div>
                </template>
                <div class="small" v-html="child.contenu"></div>
              </b-card> 
            </div>
          </div>
        </div>
      </b-card>
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
      article: {
        id: null,
        titre: null,
        contenu: null,
        date_creation: null,
        id_utilisateur: null,
        auteur: null,        
      },
      commentaires: null,     
      userData: {
        userId: null,
        prenom: null,
        nom: null,
        email: null,
        privilege: null
      },
      userAuth: false,
      commentaireContenu: "",
      reponseContenu: "",
      errorMessageCommentaire: null,
      errorMessageReponse: null,
      valideMessageReponse: false,
      valideMessageCommentaire: false,
		}
  },
  created() {
    this.authverif()

    // recuperation des informations de l'article
    axios.post('http://localhost:3000/api/pages/lire-article', {articleId: this.$route.params.id}, { withCredentials: true })
    .then((response) => { 
      return this.article = {
        id: response.data[0].id,
        titre: response.data[0].titre,
        contenu: response.data[0].contenu,
        date_creation: response.data[0].date_creation.split('T')[0],
        id_utilisateur: response.data[0].id_utilisateur,
        prenom: response.data[0].prenom,
        nom: response.data[0].nom,         
      }
    })
    .catch((error) => { 
      console.log(error)
    })

    this.recupcoms()
  },
  methods: {
    copylink() {
      let tempInput = document.createElement("input");
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert("Lien de l'article copié !");
    },
    authverif() {
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
    },
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
    recupcoms() {
      // recuperation des commentaires de l'article
      axios.post('http://localhost:3000/api/pages/recuperer-commentaire', {articleId: this.$route.params.id}, { withCredentials: true })
      .then((response) => { 
        console.log(response.data);
        return this.commentaires = response.data;
      })
      .catch((error) => { 
        console.log(error)
      })      
    },
    commentaire() {
      let valid = true;
      this.errorMessageCommentaire = null;
      this.errorMessageCommentaireChild = null;
      this.valideMessageCommentaire = false;
      if (this.commentaireContenu.length == 0) {
        valid = false;
        this.errorMessageCommentaire = "Veuillez remplir le champ"
      }      
      if (valid == true) {
        axios.post('http://localhost:3000/api/pages/commentaire', {articleId: this.$route.params.id, contenu: this.commentaireContenu}, { withCredentials: true })
        .then((response) => {
          console.log(response);
          this.commentaireContenu = "";
          this.valideMessageCommentaire = true;
          this.recupcoms();
        })
        .catch((error) => { 
          console.log(error);
        }) 
      }
    },
    reponse(parent) {
      let valid = true;
      this.errorMessageReponse = null;
      this.valideMessageReponse = false;
      if (this.reponseContenu.length == 0) {
        valid = false;
        this.errorMessageReponse = "Veuillez remplir le champ"
      }      
      if (valid == true) {
        axios.post('http://localhost:3000/api/pages/commentaire', {articleId: this.$route.params.id, contenu: this.reponseContenu, parentId: parent}, { withCredentials: true })
        .then((response) => {
          console.log(response);
          this.reponseContenu = "";
          this.valideMessageReponse = true;
          this.recupcoms();
        })
        .catch((error) => { 
          console.log(error);
        }) 
      }
    },
    suppressioncoms(comId, auteurId, parentId) {
      axios.post('http://localhost:3000/api/pages/supprimer-commentaire', {commentaireId: comId, auteurId: auteurId, parentId: parentId}, { withCredentials: true })
      .then((response) => {
        console.log(response);
        this.recupcoms();
      })
      .catch((error) => { 
        console.log(error);
      }) 
    },
    suppressionarticle() {
      axios.post('http://localhost:3000/api/pages/supprimer-article', {articleId: this.article.id, auteurId: this.article.id_utilisateur}, { withCredentials: true })
      .then((response) => {
        console.log(response);
        this.$router.push({ name: 'Accueil' });
      })
      .catch((error) => { 
        console.log(error);
      }) 
    },
    signalementcoms(comId) {
      axios.post('http://localhost:3000/api/pages/signaler-commentaire', {comId: comId}, { withCredentials: true })
      .then((response) => {
        console.log(response);
        return window.alert("Commentaire signalé");
      })
      .catch((error) => { 
        console.log(error);
      }) 
    },
    commentairesParents() {
      let comsParent = [];
      for (let i = 0; i < this.commentaires.length; i++) {
        if (this.commentaires[i].id_parent == null) {
          comsParent.push(this.commentaires[i]);
        }
      }
      return comsParent;
    },
    commentairesEnfants(parentId) {
      let comsChild = [];
      for (let i = 0; i < this.commentaires.length; i++) {
        if (this.commentaires[i].id_parent == parentId) {
          comsChild.push(this.commentaires[i]);
        }
      }
      return comsChild;
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
.titre_menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn_compte {
  display: block;
}

.contenu_article {
  max-width: 720px;
  margin-bottom: 50px;
}

.espace_commentaire {
  max-width: 720px;
}

.contenu_article h2 {
  font-weight: bold;
}

.text_article {
  font-size: 1.2em;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text_zone {
  padding-top: 0px;
}

.poster_commentaire {
  margin-bottom: 50px
}

.comment_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn_commentaire {
  margin-top: 15px;
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