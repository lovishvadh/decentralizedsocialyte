<template src="./template.html"></template>
<script>
import Vue from "vue";
import web3 from "@/utils/web3.js";
import auth from "./auth.js";
Vue.use(web3);

export default {
  data() {
    return {
      loggedIn: auth.loggedIn()
    };
  },
  created() {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<style scoped>
html,
body {
  height: 100%;
  font-family: "Poppins", sans-serif;
}

body {
  margin: 5px;
  background: #ffffff;
}

a,
a:link,
a:visited,
a:focus {
  color: #333;
  text-decoration: none;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
}

h3 {
  font-size: 20px;
  font-weight: bold;
}

img {
  width: 100%;
  height: auto;
}

.first-image {
  width: 100%;
  height: 100vh;
  max-height: 100%;
  background: url("./assets/background.jpg");
  background-size: cover;
  background-position: center;
}

.call-to-action {
  width: 350px;
  padding-top: 400px;
  margin: auto;
}
.call-to-action2 {
  width: 250px;
  padding-top: 200px;
  margin: auto;
}

.black-btn,
.black-btn:hover,
.black-btn:focus,
.black-btn:active {
  background: #ffffff;
  color: #252525;
  font-weight: bold;
  font-size: 17px;
}

@media screen and (max-width: 767px) {
  .first-image {
    background: url("./assets/background-mobile.jpg");
    background-size: cover;
    background-position: center;
  }

  img {
    width: 70%;
    margin-left: 15%;
    height: auto;
  }

  .second-row {
    margin: 0;
  }

  .col-sm-4 {
    margin-top: 30px;
  }
  .call-to-action2 {
    width: 250px;
    padding-top: 25px;
    margin: auto;
  }
  .call-to-action {
    width: 320px;
    padding-top: 300px;
    margin: auto;
  }
}
</style>

