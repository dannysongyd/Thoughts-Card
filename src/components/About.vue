<template>
  <div>
    <b-carousel id="carousel1" style="text-shadow: 1px 1px 2px #333;" controls indicators background="#ababab" :interval="4000" img-width="1024" img-height="320" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">

      <!-- Text slides with image -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=7">
        <h1>Vote For Thoughts!</h1>
        <b-button @click="go"> Go to the App</b-button>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=3">
        <h1>See Others Thoughts!</h1>

        <b-button @click="go"> Go to the App</b-button>

      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=4">
        <h1>Create Your Own Thoughts!</h1>

        <b-button @click="go"> Go to the App</b-button>

      </b-carousel-slide>

    </b-carousel>

    <b-container>
      <b-row align-v="center">
        <b-col></b-col>
        <b-col class="m-xl-5 font-weight-bold text-center" cols="5">
          About Your Thoughts
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row id="text" align-v="center">
        <div class="col-sm "></div>

        <div class="col-sm text-center"></div>

        This project is to develop a social media platform called Thoughts, which allows users to vote on the thoughts and see others opinions (agree/disagree) on this thought by press the vote button. The users also can add their own thoughts and see others feedback on their thoughts. This app is working perfectly with mobile devices. In the future, we are going to allow the user to create their account so they can manage their thoughts.

        <div class="col-sm ">
        </div>

      </b-row>

    </b-container>

  </div>

</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    go() {
      this.$router.push("/list");
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style>
</style>
