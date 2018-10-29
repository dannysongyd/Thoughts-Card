<template>
  <div class="container fluid">

    <div class="row">

      <div class="col-sm "></div>
      <div class="col-sm ">
        <feeds-filter></feeds-filter>
      </div>
      <div class="col-sm "></div>
    </div>

    <div class="row center">
      <div class="col">
        <!-- Button trigger modal -->
        <div>
          <div class="add-btn">
            <b-btn v-b-modal.modal-center>Add your own thoughts here!</b-btn>

          </div>

          <!-- Modal Component -->
          <b-modal id="modal-center" @ok="addfeed" ok-title="Add!" centered title="Add your own thoughts">
            <p class="my-4">Please specify your thought</p>

            <div>
              <input class="feed-input" type="text" placeholder="Click to add title" v-model="newfeed">
            </div>

            <!-- Category goes here-->
            <div>
              <div class="feed-select">
                <b-form-select v-model="selected" :options="options" class="mb-3">
                </b-form-select>
              </div>

              <div>Selected: <strong>{{ selected }}</strong></div>
            </div>

          </b-modal>
        </div>

      </div>
    </div>

    <div class="row">
      <div class="col-sm "></div>
      <div class="col-sm ">
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <single-feed v-for="feed in feedsFiltered" :key="feed.id" :feed="feed" :checkAll="!anyRemaining">
          </single-feed>
        </transition-group>
      </div>
      <div class="col-sm "></div>
    </div>

    <div class="row">
      <div class="extra-container">
        <!-- component that finishs(checks) all the feeds-->
        <!-- <feeds-check-all> </feeds-check-all> -->
        <!-- component that showing the remaining feeds on the list  -->
        <!-- FIXME: COUNTER -->
        <!-- <feeds-counter></feeds-counter> -->
      </div>

    </div>

  </div>

</template>

<script>
import SingleFeed from "./SingleFeed";
import FeedsCounter from "./FeedsCounter";
import FeedsCheckAll from "./FeedsCheckAll";
import FeedsFilter from "./FeedsFilter";
import ClearVotedFeeds from "./ClearVotedFeeds";

export default {
  name: "feed-list",
  components: {
    SingleFeed,
    FeedsCounter,
    FeedsCheckAll,
    FeedsFilter,
    ClearVotedFeeds
  },
  data() {
    return {
      newfeed: "",
      idForfeed: 0,
      beforeEditCache: "",
      filter: "all",
      feeds: [],
      allFeeds: [],
      options: [
        { value: null, text: "Uncategorized" },
        { value: "Travel", text: "Travel" },
        { value: "Food", text: "Food" },
        { value: "Style", text: "Style" },
        { value: "Shows", text: "Shows" },
        { value: "Decor", text: "Decor" },
        { value: "Music", text: "Music" }
      ],
      selected: null
    };
  },

  methods: {
    addfeed() {
      if (this.newfeed.trim().length == 0) {
        return;
      }
      this.$store.dispatch("addfeed", {
        id: this.idForfeed,
        title: this.newfeed,
        completed: false,
        editing: false,
        agree: 0,
        disagree: 0,
        user: this.userId,
        category: this.selected
      });

      this.newfeed = "";
      this.idForfeed++;
    },

    editfeed(feed) {
      feed.editing = true;
      this.beforeEditCache = feed.title;
    },
    doneEdit(feed) {
      if (feed.title.trim().length == 0) {
        feed.title = beforeEditCache;
      }
      feed.editing = false;
    },
    cancelEdit(feed) {
      feed.title = this.beforeEditCache;
      feed.editing = false;
    },
    // refresh the page to get a new card view
    shuffle() {
      console.log("Refreshed Page");
      this.$store.dispatch("getfeeds");
    },
    test() {
      this.$store.dispatch("getAllFeeds");
      console.log("TEST");
    }
  },

  directives: {},
  created() {
    this.$store.dispatch("getfeeds");
  },
  beforeDestroy() {},

  computed: {
    userId() {
      return this.$store.state.user;
    },
    remaining() {
      return this.$store.getters.remaining;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    feedsFiltered() {
      return this.$store.getters.feedsFiltered;
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css);
.row {
  text-align: center;
}
.col-centered {
  float: none;
  margin: 10px auto;
}
.feed-input {
  width: 70%;
  padding: 5px 5px;
  font-size: 18px;
  text-align: center;
  border-style: solid;
  border-width: 1px;
}

.feed-select {
  width: 70%;
  display: block;
  margin: 0 auto;
}

.category-select {
  width: 20%;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}

.add-btn {
  padding-bottom: 15px;
}
</style>
