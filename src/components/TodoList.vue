<template>
<b-list-group v-if="allTodos">
  <span v-if="allTodos.total_rows > 0">
  <b-list-group-item v-for="row in allTodos.rows" :key="row.key">
    {{row.doc.title}}
    <br/>
      <small>{{row.doc.description}}</small>
      <br/>
      <b-button size="sm" variant="primary" class="mb-1 mr-1">Edit</b-button>
      <b-button size="sm" variant="danger" class="mb-1">Remove</b-button>
    </b-list-group-item>
  </span>
  <span v-else>You have no todos</span>
</b-list-group>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      status: "false"
    };
  },
  created () {
    this.$store.dispatch('fetchTodos');
  },
  computed: {
    classObject: function(value) {
      console.log(value)
      let checked = false;
      if (this.status === "true") {
        checked = true;
      }
      return {
        checked: checked
      }
    },
    ...mapGetters([
      'allTodos'
    ])
  }
};
</script>
<style lang="scss" scoped>
.checked {
  text-decoration: line-through;
  color: #ccc
}
</style>

</style>

