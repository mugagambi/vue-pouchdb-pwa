<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col md="6" offset-md="3">
          <h3 class="text-center"><u>To-Do List</u></h3>
          <todo-form/>
          <br/>
          <h5 class="text-center">Your todos</h5>
          <todo-list class="mb-3"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/TodoList.vue";
import TodoForm from "@/components/TodoForm.vue";
import pouchdb from "pouchdb";
export default {
  name: "home",
  components: {
    TodoList,
    TodoForm
  },
  created() {
    const db = new pouchdb("todos");
    const remoteDB = "https://admin:327140002Hm@couch.nanoafrika.com/todos";
    db
      .sync(remoteDB, { live: true })
      .on("complete", function() {
        console.log("yay, we're in sync!");
      })
      .on("error", function(err) {
        console.log("boo, we hit an error!");
      });
    db
      .changes({
        since: "now",
        live: true
      })
      .on("change", () => this.$store.dispatch("fetchTodos"));
  }
};
</script>
