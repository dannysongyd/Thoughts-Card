<template>
  <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllfeeds"> Check All</label></div>
</template>

<script>
export default {
  name: "feeds-checkall",
  props: {
    // anyRemaining: {
    //   type: Boolean,
    //   required: true
    // }
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    checkAllfeeds() {
      this.$store.dispatch("checkAll", event.target.checked);
    }
  }
};
</script>