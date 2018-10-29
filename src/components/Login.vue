<template>
  <div>
    <img src="../assets/logo.png" class="logo">

    <form>
      <label>
        <input type="email" id="email" v-model="email" required>
        <div class="label-text">Email</div>
      </label>
      <label>
        <input type="password" id="password" v-model="password" required>
        <div class="label-text">Password</div>
      </label>
      <button v-on:click="login">Login</button>
    </form>
  </div>

</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      currentUser: ""
    };
  },
  mounted() {},
  methods: {
    login(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${user.user.email}`);
            // 跳转
            this.$store.dispatch("userLoggedIn", user.user.email);
            this.$router.replace("list");

            // this.$router.go({ path: this.$router.path });
          },
          error => {
            alert(error.message);
          }
        );
      console.log("login btn clicked");
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
.logo {
  height: 250px;
  width: 250px;
  display: block;
  margin: 0 auto;
}
body {
  background-color: #333333;
  font-family: "Open Sans", Helvetica;
}

form {
  text-align: center;
}

label {
  display: block;
  letter-spacing: 4px;
  padding-top: 30px;
  text-align: center;
}
label .label-text {
  color: black;
  cursor: text;
  font-size: 20px;
  line-height: 20px;
  text-transform: uppercase;
  -moz-transform: translateY(-34px);
  -ms-transform: translateY(-34px);
  -webkit-transform: translateY(-34px);
  transform: translateY(-34px);
  transition: all 0.3s;
}
label input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid #4a4a4a;
  color: #0097a7;
  font-size: 36px;
  letter-spacing: -1px;
  outline: 0;
  padding: 5px 20px;
  text-align: center;
  transition: all 0.3s;
  width: 200px;
}
label input:focus {
  max-width: 100%;
  width: 400px;
}
label input:focus + .label-text {
  color: grey;
  font-size: 13px;
  -moz-transform: translateY(-74px);
  -ms-transform: translateY(-74px);
  -webkit-transform: translateY(-74px);
  transform: translateY(-74px);
}
label input:valid + .label-text {
  font-size: 13px;
  -moz-transform: translateY(-74px);
  -ms-transform: translateY(-74px);
  -webkit-transform: translateY(-74px);
  transform: translateY(-74px);
}
label input:invalid + .label-text {
  font-size: 13px;
  -moz-transform: translateY(-74px);
  -ms-transform: translateY(-74px);
  -webkit-transform: translateY(-74px);
  transform: translateY(-74px);
}

button {
  background-color: #333333;
  border: 2px solid white;
  border-radius: 27px;
  color: white;
  cursor: pointer;
  font-size: 20px;
  margin-top: 20px;
  padding: 15px 30px;
  text-transform: uppercase;
  transition: all 200ms;
}
button:hover,
button:focus {
  background-color: white;
  color: #333333;
  outline: 0;
}
</style>
