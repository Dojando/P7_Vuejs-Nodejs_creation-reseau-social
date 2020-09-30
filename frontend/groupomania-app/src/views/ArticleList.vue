<template>
  <div id="app">
    <header class="header">
      <b-button class="btn_article" variant="primary">Publier un article</b-button>

      <img class="d-none d-sm-block" src="../assets/icon-left-font-monochrome-black.png" alt="logo et nom de l'application">

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
    </header>

    <div class="container">
      <b-card title="Titre d'article" sub-title="Publié par John Smith" border-variant="secondary">
      </b-card>
      <b-card title="Titre d'article" sub-title="Publié par John Smith" border-variant="secondary">
      </b-card>
      <b-card title="Titre d'article" sub-title="Publié par John Smith" border-variant="secondary">
      </b-card>
      <b-card title="Titre d'article" sub-title="Publié par John Smith" border-variant="secondary">
      </b-card>
    </div>
    

    <footer class="footer">
      <p>Mentions légales</p>
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
  background-color: rgb(228, 214, 196);
  color: #2c3e50;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.header img {
  width: 200px;
  margin-left: 15px;
}

.bi-person-circle {
  width: 1.4em;
  margin-right: 5px;
}

.btn_article {
  margin-left: 10px;
}

.btn_compte {
  margin-right: 10px;
}

.container * {
  margin-bottom: 5px;
}

.footer {
  width: 100%;
  height: 50px;
  background-color: rgb(228, 214, 196);
  position: absolute;
  bottom: 0px;
}
</style>