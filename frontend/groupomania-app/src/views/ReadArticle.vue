<template>
  <div id="app">
    <header class="header">
      <div class="box box_retour">
        <b-button class="btn_accueil" variant="primary">Retour à l'accueil</b-button>
      </div>
      
      <div class="box box_img d-none d-sm-block text-center">
          <img src="../assets/icon-left-font-monochrome-black.png" alt="logo et nom de l'application">
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
          <b-dropdown-item>Détails du compte</b-dropdown-item>
        </b-dropdown>
      </div>
    </header>

    <main class="container">
      <article>
        <b-card class="contenu_article mx-auto" border-variant="secondary">
          <template v-slot:header>
            <h2>Titre de l'article</h2>
            <b-card-text class="small info_article">Publié par John Smith le 00/00/00</b-card-text>
          </template>
          <p class="text_article">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque inventore quam earum? Adipisci dolorem illo aliquid minus incidunt, molestias quas, tempore nisi deserunt neque ipsam quis quibusdam placeat animi doloribus.<br><br>Lorem ipsum dolor sit amet.<br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, dignissimos!<br>Lorem ipsum dolor sit.
          </p>
        </b-card>
      </article>
    </main>

    <footer class="footer">
      <p>© 2020 Groupomania</p>
    </footer>
  </div>
</template>

<script>
  export default {
  data() {
		return {
			component:"LoginForm"
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
}

.contenu_article h2 {
  font-weight: bold;
}

.text_article {
  font-size: 1.2em;
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
  position: absolute;
  bottom: 0px;
}

/* Media queries */
@media screen and (max-width: 575px) {
  .box_retour {
    flex: 2;
  }
}
</style>