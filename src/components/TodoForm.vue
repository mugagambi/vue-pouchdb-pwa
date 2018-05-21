<template>
  <div>
      <h5 class="text-center">Add To-Do</h5>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="title"
                    label="Title:"
                    label-for="title">
        <b-form-input id="title"
                      type="text"
                      v-model="form.title"
                      required
                      placeholder="Enter todo title">
        </b-form-input>
      </b-form-group>
      <b-form-group id="description"
                    label="Description:"
                    label-for="description">
                <b-form-textarea id="description"
                     v-model="form.description"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6">
                </b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        checked: false
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.form._id = new Date().toISOString();
      this.$store.dispatch('createTodo', this.form)
      .then(this.$store.dispatch('fetchTodos'));
      /* Reset our form values */
      this.form.title = "";
      this.form.description = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.title = "";
      this.form.description = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
