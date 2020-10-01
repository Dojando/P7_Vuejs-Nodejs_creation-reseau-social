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
      <form class="form_article mx-auto">
        <p class="h2">Publiez un article</p>
        <div class="form-group">
          <label for="titreArticle">Titre de l'article</label>
          <input type="text" class="form-control" id="titreArticle" placeholder="Donnez un titre à votre article" required>
          <div class="invalid-feedback">
            Donnez un titre à votre article
          </div>
        </div>
        <div class="form-group">
        <label for="texteArticle">Contenu de l'article</label>
          <textarea class="form-control" id="texteArticle" placeholder="Ecrivez quelque chose dans l'article" required></textarea>
          <div class="invalid-feedback">
            Ecrivez quelque chose dans l'article
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Poster</button>
      </form>
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

.form_article {
  max-width: 720px;
}

.form_article p, .form_article div {
  margin-bottom: 25px;
}

textarea.form-control {
  height: 300px;
}

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

@media screen and (max-width: 575px) {
  .box_retour {
    flex: 2;
  }
}
</style>