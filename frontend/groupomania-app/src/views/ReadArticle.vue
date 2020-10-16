<template>
  <div id="app">
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
          <b-dropdown-text>John Smith</b-dropdown-text>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>Déconnexion</b-dropdown-item>
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
            <h2>Titre de l'article</h2>
          </template>
          <p class="text_article">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque inventore quam earum? Adipisci dolorem illo aliquid minus incidunt, molestias quas, tempore nisi deserunt neque ipsam quis quibusdam placeat animi doloribus.<br><br>Lorem ipsum dolor sit amet.<br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, dignissimos!<br>Lorem ipsum dolor sit.
          </p>
          <template v-slot:footer>
            <b-card-text class="small info_article">Publié par John Smith le 00/00/00</b-card-text>
            <b-button variant="outline-secondary">Copier le lien de l'article</b-button>
          </template>
        </b-card>
      </article>

      <b-card class="espace_commentaire mx-auto" border-variant="secondary">
        <template v-slot:header>
          <h3>Commentaires</h3>
        </template>

        <b-card class="mx-auto text_zone" border-variant="secondary">
          <template v-slot:header>
            <p class="h5">Postez un commentaire</p>
          </template>
            <editor class="form-control"  api-key="t0lyy2w9xjl7fm5l99qahx4lahn2fkvhzk3wixfdg0mlv8ee" :init="{menubar: false}" v-model="formdata"></editor>
            <button type="submit" class="btn btn-primary btn_commentaire">Poster</button>
        </b-card>
        
        <b-card class="mx-auto" border-variant="secondary">
          <template v-slot:header>
            <div class="comment_header">
              <b-card-text class="small info_article">Publié par John Smith le 00/00/00</b-card-text>
              <div class="comment_button">
                <b-button v-b-toggle.collapse-1 size="sm">Répondre</b-button>
                <b-button class="button_delete" variant="danger" size="sm">Supprimer</b-button>
              </div>
            </div>
          </template>
          <p class="small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptatum eaque ab asperiores eveniet, deserunt molestiae placeat maiores sequi earum autem iste quia esse ad necessitatibus adipisci hic, deleniti soluta pariatur! Explicabo, ea fugiat! Deleniti consectetur esse quis maiores repellendus totam, perspiciatis nemo repudiandae sint porro quaerat ullam nam nostrum.
          </p>
        </b-card>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <form class="form_article mx-auto">
              <div class="form-group">
                <editor class="form-control"  api-key="t0lyy2w9xjl7fm5l99qahx4lahn2fkvhzk3wixfdg0mlv8ee" :init="{menubar: false}"></editor>
                <div class="invalid-feedback">
                  Ecrivez quelque chose dans l'article
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Poster</button>
            </form>
          </b-card>
        </b-collapse>
        <b-card style="width: 90%;margin-top:10px" class="ml-auto" border-variant="secondary">
          <template v-slot:header>
            <div class="comment_header">
              <b-card-text class="small info_article">Publié par John Smith le 00/00/00</b-card-text>
              <div class="comment_button">
                <b-button v-b-toggle.collapse-1-rep size="sm">Répondre</b-button>
                <b-button class="button_delete" variant="danger" size="sm">Supprimer</b-button>
              </div>
            </div>
          </template>
          <p class="small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptatum eaque ab asperiores eveniet, deserunt molestiae placeat maiores sequi earum autem iste quia esse ad necessitatibus adipisci hic, deleniti soluta pariatur! Explicabo, ea fugiat! Deleniti consectetur esse quis maiores repellendus totam, perspiciatis nemo repudiandae sint porro quaerat ullam nam nostrum.
          </p>
        </b-card>
        <b-collapse id="collapse-1-rep" class="mt-2">
          <b-card>
            <form class="form_article mx-auto">
              <div class="form-group">
                <editor class="form-control"  api-key="t0lyy2w9xjl7fm5l99qahx4lahn2fkvhzk3wixfdg0mlv8ee" :init="{menubar: false}"></editor>
                <div class="invalid-feedback">
                  Ecrivez quelque chose dans l'article
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Poster</button>
            </form>
          </b-card>
        </b-collapse>
      </b-card>
    </main>

    <footer class="footer">
      <p>© 2020 Groupomania</p>
    </footer>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

  export default {
	name: 'App',
	components: {
    Editor
  },
  data() {
		return {
			formdata: "",
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
  background-color: rgb(199, 199, 199);
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
article h2 {
  margin-bottom: 20px;
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
  margin-bottom: 30px;
}

.comment_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button_delete {
  margin-left: 10px;
}

.btn_commentaire {
  margin-top: 15px;
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

/* Media queries */
@media screen and (max-width: 575px) {
  .box_retour {
    flex: 2;
  }
}
</style>