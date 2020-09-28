<template>
  <div id="app">
    <header class="header">
      <h1>Application</h1>
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
  import SignupForm from "./components/signup"
  import LoginForm from "./components/login"

  export default {
	name: 'App',
	components: {
    SignupForm,
    LoginForm
  },
  data() {
		return {
			component:"SignupForm"
		}
	}
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app { 
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 50px;
  background-color: rgb(228, 214, 196);
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>