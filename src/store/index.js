import Vue from "vue";
import Vuex from "vuex";
import db from "../firebase";
import firebase from "firebase";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
Vue.config.devtools = true;
export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    feeds: [],
    filter: "random",
    allFeeds: [],
    user: firebase.auth().currentUser,
    isLoggedIn: false,
    category: null
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getUserName(state) {
      return state.user;
    },
    // user: state => state.user,
    remaining(state) {
      return state.feeds.filter(feed => !feed.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    feedsFiltered(state) {
      if (state.filter == "random") {
        return state.feeds;
      } else if (state.filter == "all" && state.category == null) {
        return state.allFeeds;
      } else if (state.filter == "all" && state.category != null) {
        return state.allFeeds.filter(feed => feed.category == state.category);
      } else if (state.filter == "user") {
        return state.allFeeds.filter(feed => feed.user == state.user);
        // return;
      }
      // default case
      return state.allFeeds;
    },
    showClearCompletedButton(state) {
      return state.feeds.filter(feed => feed.completed).length > 0;
    },
    voteDetailAgree(state) {
      console.log("-----------" + state.feeds[0].agree);

      return state.feeds[0].agree;
    },
    voteDetailDisagree(state) {
      return state.feeds[0].disagree;
    },
    getAllFeeds(state) {
      return {};
    }
  },
  mutations: {
    userLoggedIn(state, user) {
      state.user = user;
    },
    userLoggedOut(state) {
      state.user = null;
    },
    addfeed(state, feed) {},
    clearCompleted(state) {
      state.feeds = state.feeds.filter(feed => !feed.completed);
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    checkAll(state, checked) {
      state.feeds.forEach(feed => (feed.completed = checked));
    },
    deletefeed(state, id) {
      const index = state.feeds.findIndex(item => item.id == id);
      state.feeds.splice(index, 1);
    },
    editfeed(state, feed) {
      const index = state.feeds.findIndex(item => item.id == feed.id);
      state.feeds.splice(index, 1, {
        id: feed.id,
        title: feed.title,
        completed: feed.completed,
        editing: feed.editing
      });
    },
    getfeeds(state, feeds) {
      state.feeds = feeds;
      // state.allFeeds = feeds
    },
    getAllFeeds(state, feeds) {
      state.allFeeds = feeds;
      // state.allFeeds = feeds
    },
    updateCategory(state, category) {
      state.category = category;
    }
  },
  actions: {
    updateCategory(context, category) {
      context.commit("updateCategory", category);
    },
    userLoggedIn(context, user) {
      context.commit("userLoggedIn", user);
    },
    userLoggedOut(context) {
      context.commit("userLoggedOut");
    },
    addfeed(context, feed) {
      db.collection("feeds")
        .add({
          title: feed.title,
          completed: false,
          timestamp: new Date(),
          agree: 0,
          disagree: 0,
          user: feed.user,
          category: feed.category
        })
        .then(docRef => {
          context.commit("addfeed", {
            id: docRef.id,
            title: feed.title,
            completed: false,
            agree: 0,
            disagree: 0,
            user: docRef.user,
            category: docRef.category
          });
        })
        .then(
          alert(
            "You just added a thought, comeback later to see other's feedback"
          )
        );
    },
    clearCompleted(context) {
      db.collection("feeds")
        .where("completed", "==", true)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.delete().then(() => {
              context.commit("clearCompleted");
            });
          });
        });
    },
    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit("updateFilter", filter);
      }, 100);
    },
    checkAll(context, checked) {
      db.collection("feeds")
        .get()
        .then(QuerySnapshot => {
          QuerySnapshot.forEach(doc => {
            doc.ref
              .update({
                completed: checked
              })
              .then(() => {
                context.commit("checkAll", checked);
              });
          });
        });
    },
    deletefeed(context, id) {
      setTimeout(() => {
        db.collection("feeds")
          .doc(id)
          .delete()
          .then(() => {
            context.commit("deletefeed", id);
          });
      }, 10);
    },
    editfeed(context, feed) {
      setTimeout(() => {
        db.collection("feeds")
          .doc(feed.id)
          .set({
            id: feed.id,
            title: feed.title,
            completed: feed.completed,
            timestamp: new Date()
          })
          .then(() => {
            context.commit("editfeed", feed);
          });
      }, 100);
    },

    getfeeds(context) {
      db.collection("feeds")
        .get()
        .then(snap => {
          let temp = [];
          let temp2 = [];

          snap.forEach(doc => {
            let data = {
              id: doc.id,
              title: doc.data().title,
              completed: doc.data().completed,
              timestamp: doc.data().timestamp,
              agree: doc.data().agree,
              disagree: doc.data().disagree,
              user: doc.data().user,
              category: doc.data().category
            };
            temp.push(data);
            temp2.push(data);
          });
          // 随机get feed
          let randomFeed = temp[Math.floor(Math.random() * snap.size)];
          let feed = {
            id: randomFeed.id,
            title: randomFeed.title,
            completed: randomFeed.completed,
            timestamp: randomFeed.timestamp,
            agree: randomFeed.agree,
            disagree: randomFeed.disagree,
            user: randomFeed.user,
            category: randomFeed.category
          };
          let singleFeed = [];

          singleFeed.push(feed);

          let sorted = temp2.sort((a, b) => {
            return a.timestamp.seconds - b.timestamp.seconds;
          });
          context.commit("getfeeds", singleFeed);
          context.commit("getAllFeeds", sorted);
        });
    },

    getAllFeeds(context) {
      db.collection("feeds")
        .get()
        .then(querySnapshot => {
          let tempFeeds = [];
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              completed: doc.data().completed,
              timestamp: doc.data().timestamp,
              agree: doc.data().agree,
              disagree: doc.data().disagree,
              user: doc.data().user,
              category: doc.data().category
            };
            tempFeeds.push(data);
          });

          const tempFeedsSorted = tempFeeds.sort((a, b) => {
            return a.timestamp.seconds - b.timestamp.seconds;
          });

          context.commit("getAllFeeds", tempFeedsSorted);
        });
    },
    // TODO: 从数据库拿数据（agree/disagree）
    viewFeedDetail(context, id) {
      db.collection("feeds")
        .doc(id)
        .get()
        .then(doc => {
          console.log(doc.data().agree);
          console.log(doc.data().disagree);
          // context.commit("voteDetail", id);
        });
    },
    // TODO: agreeOnFeed(context)
    // 数据库agree ++
    agreeOnFeed(context, feed) {
      let feedRef = db.collection("feeds").doc(feed.id);
      db.runTransaction(t => {
        return t.get(feedRef).then(doc => {
          var newAgree = doc.data().agree + 1;
          t.update(feedRef, { agree: newAgree });
        });
      });

      db.collection("feeds")
        .doc(feed.id)
        .get()
        .then(doc => {
          console.log(
            Number(doc.data().agree) +
              " " +
              "Other people have the same opinion as you"
          );
          doc.ref.update({ completed: true });
        });
    },

    // TODO: disagreeOnFeed function
    //
    //disagreeOnFeed(context)
    disagreeOnFeed(context, feed) {
      let feedRef = db.collection("feeds").doc(feed.id);
      db.runTransaction(t => {
        return t.get(feedRef).then(doc => {
          var newDisagree = doc.data().disagree + 1;
          t.update(feedRef, { disagree: newDisagree });
        });
      });

      db.collection("feeds")
        .doc(feed.id)
        .get()
        .then(doc => {
          console.log(
            Number(doc.data().disagree) +
              " " +
              "Other people have the same opinion as you"
          );
        });
    }
  }
});
