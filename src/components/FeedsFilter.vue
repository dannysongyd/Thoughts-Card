<template>
  <div>

    <b-button variant="outline-secondary" :class="{ active: filter == 'random' }" @click="changefeedFilter('random')">Random</b-button>

    <b-button variant="outline-secondary" :class="{ active: filter == 'all' }" @click="changefeedFilter('all')">All</b-button>
    <!-- <button :class="{ active: filter == 'completed' }" @click="changefeedFilter('completed')">Voted</button> -->
    <b-button variant="outline-secondary" :class="{ active: filter == 'user' }" @click="changefeedFilter('user')">You Created</b-button>

    <div class="category-select">
      <b-form-select v-if="filter == 'all'" v-model="selected" :options="options" @input="changeCategory(selected)" class="mb-3"></b-form-select>

    </div>
  </div>
</template>

<script>
export default {
  name: "feeds-filter",
  data() {
    return {
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
  props: {},
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },

  methods: {
    changefeedFilter(filter) {
      this.$store.dispatch("updateFilter", filter);
      this.$forceUpdate();
    },
    changeCategory(category) {
      this.$store.dispatch("updateCategory", category);
    }
  }
};
</script>

<style scoped>
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}

.active {
  background: #26c6da;
}

// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

* {
  padding-top: 5px;
  text-align: center;
}

.category-select {
  width: 50%;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}
</style>