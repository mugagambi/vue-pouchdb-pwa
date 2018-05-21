import Vue from "vue";
import Vuex from "vuex";
import PouchDB from "pouchdb";
/*eslint no-console: ["error", { allow: ["warn", "error"]  }] */
Vue.use(Vuex);

const CREATE_TODO = "CREATE_TODO";
const FETCH_TODO = "FETCH_TODO";

const db = new PouchDB("todos");

export default new Vuex.Store({
  strict: true,
  state: {
    todos: null
  },
  mutations: {
    [CREATE_TODO]() {
    },
    [FETCH_TODO](state, docs) {
      state.todos = docs
    }
  },
  actions: {
    fetchTodos({ commit }) {
      db
        .allDocs({ include_docs: true })
        .then(response => commit(FETCH_TODO, response))
        .catch(err => console.log(err));
    },
    createTodo({ commit }, todo) {
      db
        .put(todo)
        .then(function() {
          commit(CREATE_TODO);
        })
        .catch(err => {
          return console.log(err);
        });
    }
  },
  getters: {
    allTodos: state => state.todos
  }
});
