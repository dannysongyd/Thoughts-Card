<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand v-if="userName != null">Welcome back {{userName}} ! </b-navbar-brand>
      <b-navbar-brand v-else>Please Login</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item router-link to="/list">Thoughts List</b-nav-item>

          <b-nav-item router-link to="/about">About</b-nav-item>

          <b-nav-item-dropdown v-if="true" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <span class="email black-text">Account</span>
            </template>
            <div v-if="isLoggedIn">TEST</div>
            <b-dropdown-item v-if="!userName" router-link to="/login">Login</b-dropdown-item>
            <b-dropdown-item v-if="!userName" router-link to="/register">Register</b-dropdown-item>
            <b-dropdown-item v-if="userName" @click="logout">Logout</b-dropdown-item>

          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <!-- Where the different routes showed  -->
    <router-view></router-view>
  </div>

</template>

<script>
import firebase from "firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: ""
    };
  },
  computed: {
    // ...mapState(["user"])
    userName() {
      let email = this.$store.getters.getUserName;
      if (email != null) {
        return email.substr(0, email.indexOf("@"));
      } else {
        return;
      }
    }
  },
  updated() {
    // if (firebase.auth().currentUser) {
    //   this.isLoggedIn = true;
    //   this.currentUser = firebase.auth().currentUser.email;
    // }
  },
  created() {
    // if (firebase.auth().currentUser) {
    //   this.isLoggedIn = true;
    //   this.currentUser = firebase.auth().currentUser.email;
    // }
  },
  methods: {
    test() {
      console.log(this.currentUser);
    },
    logout() {
      console.log("test");
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out");
          this.$store.dispatch("userLoggedOut");
          alert("You have logged out");
          this.$router.push("/login");
        });
    }
  }
};
</script>
<style scoped>
/* * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 24px;
  height: 100vh;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.nav {
  display: flex;
  list-style: none;
  padding: 15px 0;
  margin: 0;
  justify-content: flex-end;
  background: #f5f8fa;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 24px;
}
.nav a {
  color: #636b6f;
  padding: 0 25px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
} */
</style>
