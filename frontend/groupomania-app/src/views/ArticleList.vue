<template>
  <div id="app">
    <header class="header">
      <div class="box box_article">
        <router-link to="/creation">
          <b-button class="btn_article" variant="primary">Poster un article</b-button>
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

    <!-- liste d'articles -->
    <div class="container mb-2" v-for="item in apiResponse" :key="item.id">
      <articlepreview :titre="item.titre" :auteur="item.auteur" :date="item.date"></articlepreview>
    </div>
    
    <footer class="footer">
      <p>© 2020 Groupomania</p>
    </footer>
  </div>
</template>

<script>
  import articlepreview from "../components/articlePreview"

  export default {
    components: {
      articlepreview
    },
    data() {
      return {
        apiResponse: [
          { titre: 'titre article 1', auteur: 'John Smith', date: '05/12/99', id: 1 },
          { titre: 'titre article 2', auteur: 'John Carmack', date: '15/05/2020', id: 2 },
          { titre: 'titre article 3', auteur: 'John doe', date: '25/06/41', id: 3 }
        ]
      }
    },
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
  background-color: rgb(199, 199, 199);
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

.header img {
  width: 200px;
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
  background-color: rgb(199, 199, 199);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  position: fixed;
  bottom: 0px;
}

/* media queries */
@media screen and (max-width: 575px) {
  .box_article {
    flex: 2;
  }
}
</style>