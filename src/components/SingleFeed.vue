<template>
  <div class=" container ">
    <div class="row ">
      <!-- <div class="col-sm-4">.col-sm-4</div> -->
      <div class="col">

        <b-card title="Thought" :img-src="ramdonPicURL" img-alt="Picsum server does not reponse on this pricture" img-top tag="article" style="max-width: 20rem;" class="mb-2">
          <p class="card-text">
            {{title}}
          </p>

          <!-- <button @click="test">TEST</button> -->

          <p class="card-text">
            Category: {{ category }}
          </p>
          <div v-if="!showDetail">
            <b-button variant="success" @click="agreeOnFeed">Agree</b-button>
            <b-button variant="danger" @click="disagreeOnFeed(feed.id)">Disagree</b-button>
            <!-- <b-button @click="viewFeedDetail(feed.id)">Detail</b-button> -->

          </div>
          <b-progress v-if="showDetail" class="mt-1" :max="100" show-value>
            <b-progress-bar :value="agreePercent" variant="success"></b-progress-bar>
            <b-progress-bar :value="disagreePercent" variant="danger"></b-progress-bar>
          </b-progress>
        </b-card>
        <b-alert :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">{{voteDetailAgree}} people share the same opinion with you</b-alert>
        <b-alert :show="dismissCountDown2" dismissible variant="danger" @dismissed="dismissCountDown2=0" @dismiss-count-down="countDownChanged2">{{voteDetailDisagree}} people share the same opinion with you</b-alert>
        <b-button variant="outline-primary" v-if="filter == 'random'" @click="shuffle">Switch</b-button>

      </div>
      <!-- <div class="col-sm-4">.col-sm-4</div> -->
    </div>
    <!-- <div class="feed-item-left"> -->

    <!-- Checkbox for finish feed -->
    <!-- <input type="checkbox" v-model="completed" @change="doneEdit"> -->
    <!-- Normal State  -->
    <!-- <div v-if="!editing" class="feed-item-label" :class="{ completed: completed }">{{title}}
        
      </div> -->
    <!-- TODO: add random image -->

  </div>

</template>

<script>
export default {
  name: "single-feed",
  props: {
    feed: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dismissSecs: 4,
      dismissSecs2: 4,
      dismissCountDown: 0,
      dismissCountDown2: 0,
      id: this.feed.id,
      title: this.feed.title,
      completed: this.feed.completed,
      editing: this.feed.editing,
      beforeEditCache: "",
      agree: this.feed.agree,
      disagree: this.feed.disagree,
      category: this.feed.category,
      showDetail: false
    };
  },
  methods: {
    test() {
      console.log(this.ramdonPicURL);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    countDownChanged2(dismissCountDown2) {
      this.dismissCountDown2 = dismissCountDown2;
    },
    showAlert() {},
    shuffle() {
      console.log("Refreshed Page");
      this.$store.dispatch("getfeeds");
    },
    //  TODO: viewFeedDetail(id)
    //  点击后Route到另一个页面，显示like和dislike数量
    viewFeedDetail(id) {
      console.log(id);
      // console.log(this.voteDetail + "fdsa");

      this.$store.dispatch("viewFeedDetail", id);
      this.$forceUpdate();
    },
    // TODO: agreeOnFeed()
    // 数据库agree ++
    agreeOnFeed() {
      this.$store.dispatch("agreeOnFeed", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing,
        agree: (this.agree = this.voteDetailAgree + 1),
        disagree: (this.disagree = this.voteDetailDisagree),
        user: this.userId
      });
      this.showDetail = true;
      this.$forceUpdate();
      console.log(this.voteDetailAgree);
      this.dismissCountDown = this.dismissSecs;
      setTimeout(() => {
        this.shuffle();
      }, 3500);
    },
    // TODO: disagreeOnFeed()
    // 数据库agree --
    disagreeOnFeed() {
      this.$store.dispatch("disagreeOnFeed", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing,
        agree: (this.agree = this.voteDetailAgree),
        disagree: (this.disagree = this.voteDetailDisagree + 1)
      });
      this.showDetail = true;
      this.$forceUpdate();
      console.log(this.voteDetaildisagree);
      this.dismissCountDown2 = this.dismissSecs;
      setTimeout(() => {
        this.shuffle();
      }, 3500);
    },
    removefeed(id) {
      this.$store.dispatch("deletefeed", id);
    },
    editfeed() {
      this.editing = true;
      this.beforeEditCache = this.title;
    },
    doneEdit() {
      if (this.title.trim().length == 0) {
        this.title = beforeEditCache;
      }
      this.editing = false;

      this.$store.dispatch("editfeed", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    }
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    },
    voteDetailAgree() {
      return this.$store.getters.voteDetailAgree;
    },
    voteDetailDisagree() {
      return this.$store.getters.voteDetailDisagree;
    },
    agreePercent() {
      let agree = this.agree;
      let disagree = this.disagree;
      let total = agree / (agree + disagree);
      return total * 100;
    },
    disagreePercent() {
      let agree = this.agree;
      let disagree = this.disagree;
      let total = disagree / (agree + disagree);
      return total * 100;
    },
    userId() {
      return this.$store.state.user;
    },
    ramdonPicURL() {
      // https://picsum.photos/600/300/?image=42
      let link = "https://picsum.photos/600/300/?image=";
      let randomNum = Math.floor(Math.random() * 100 + 1);
      link += String(randomNum);
      // let temp = "https://picsum.photos/600/300/?image=40";
      return link;
    }
  },

  watch: {
    checkAll() {
      if (this.checkAll) {
        this.completed = true;
      } else {
        this.completed = this.feed.completed;
      }
    }
  },
  created() {},
  beforeDestroy() {}
};
</script>

<style>
#parent {
  text-align: center;
}
.center {
  margin: auto;
}

input {
  margin: 10px;
}
</style>
