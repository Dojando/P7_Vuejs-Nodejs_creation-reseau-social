<template>
  <div id="app">
    <header class="header_auth">
      <img class="d-none d-sm-block" src="../assets/icon-left-font-monochrome-black.png" alt="logo et nom de l'application">
      <nav class="auth_links">
        <button @click="component = 'SignupForm'" type="button" class="btn btn-secondary">Inscription</button>
        <button @click="component = 'LoginForm'" type="button" class="btn btn-secondary">Connexion</button>
      </nav>
    </header>
    <div class="main">
      <component v-bind:is="component"></component>
    </div>
    <footer class="footer">
      <p>Mentions légales</p>
    </footer>
  </div>
</template>

<script>
  import SignupForm from "../components/signup"
  import LoginForm from "../components/login"

  export default {
	name: 'App',
	components: {
    SignupForm,
    LoginForm
  },
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

.header_auth {
  width: 100%;
  height: 60px;
  background-color: rgb(228, 214, 196);
  color: #2c3e50;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header_auth img {
  width: 200px;
  margin-left: 15px;
}

.auth_links {
  display: flex;
}

.auth_links > * {
  margin: 0 10px 0 0;
  font-size: 1.2em;
}

.main {
  display: flex;
  padding-top: 90px;
  width: 100%;
  justify-content: center;
}

.footer {
  width: 100%;
  height: 50px;
  background-color: rgb(228, 214, 196);
  position: absolute;
  bottom: 0px;
}

@media screen and (max-width: 576px) {
  .header_auth {
    justify-content: center;
  }
}
</style>