<template>
  <section id="hero">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
          <img src="../assets/logo.png" class="img-fluid" alt="Demo image">
        </div>
        <div class="col-md-7 content-box hero-content">

          <h1>Vote and add thoughts <b>On the everyday things </b></h1>
          <p>This project is to develop a social media platform called Thoughts, which allows users to vote on the thoughts and see others opinions (agree/disagree) on this thought by press the vote button. The users also can add their own thoughts and see others feedback on their thoughts.</p>
          <router-link to="/list">
            <b-button style="margin-top: 20px"> Go to the App</b-button>

          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
body {
  font-family: "Roboto", sans-serif;
  color: #3a3f52;
}

h2 {
  font-size: 44px;
  font-weight: 700;
}

h3 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 25px;
}

h5 {
  font-size: 16px;
}

p {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: #53627c;
}

ul {
  list-style-type: none;
  padding-left: 0px;
}

b {
  font-weight: 700;
}

section {
}

.title-block {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  text-align: center;
}

.title-block p {
  font-size: 20px;
  font-weight: 300;
  color: #8da2b5;
  margin-bottom: 0px;
}

.divider {
  padding: 2rem 0 0;
  margin: 2rem 0 0;
  border-top: 1px solid #3c3f45;
}

.divider-light {
  padding: 2rem 0 0;
  margin: 2rem 0 0;
  border-top: 1px solid #edf1f2;
}

#hero {
  /* background-color: #f6f8f9; */
}

#hero h1 {
  font-size: 50px;
  font-weight: 300;
}

#hero p {
  font-size: 24px;
  font-weight: 300;
  color: #8da2b5;
  margin-bottom: 0px;
  padding: 0px;
}

#hero span {
  font-weight: 400;
  color: #459173;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 2em;
}

.btn {
  font-size: 14px;
  font-weight: 400;
  border-radius: 3px !important;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.08);
}

.btn:hover {
  text-decoration: none;
}

.btn-regular {
  background-color: #0095f7;
  color: #ffffff;
  padding: 10px 25px;
  letter-spacing: 0.1em;
  margin-top: 25px;
  display: inline-block;
}

.btn-regular:hover {
  background-color: #0191f0;
  color: #ffffff;
}

.btn-demo {
  color: #ffffff;
  background-color: #6772e5;
  letter-spacing: 0.1em;
  padding: 15px 48px;
  display: inline-block;
  width: 100%;
  margin-top: 20px;
}

.btn-demo:hover {
  color: #ffffff;
  background-color: #636ee1;
}

.btn-demo-small {
  font-size: 12px;
  background-color: #6772e5;
  padding: 1px 4px;
}

.btn-demo-small:hover {
  background-color: #636ee1;
}

.btn-demo-small a {
  color: #ffffff !important;
}

.btn-buy {
  color: #ffffff;
  background-color: #0095f7;
  letter-spacing: 0.1em;
  padding: 15px 48px;
  display: inline-block;
  width: 100%;
  margin-top: 20px;
}

.btn-buy:hover {
  background-color: #0191f0;
  color: #ffffff;
}
</style>
