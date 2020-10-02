<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-spacing-top-medium" />
          <h2>Add a new Category</h2>

          <form action="#">
            <!-- Type -->
            <div class="a-spacing-top-medium">
              <label for="#">Type</label>
              <input v-model="type" type="text" class="a-input-text" style="width: 100%;">
            </div>

            <!-- Buttons -->
            <hr>
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddCategory">Add Category</span>
                </span>
              </span>
            </div>
          </form>

          <br>
          <ul class="list-group-item">
            <li v-for="(category, index) in categories" :key="`category_${index}`">
              {{ category.type }}
            </li>
          </ul>
        </div>
        <div class="col-sm-3" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let categories = [];

    try {
      const response = await $axios.$get('http://localhost:3000/api/categories');
      console.log('response', response);
      categories = response.categories;
    } catch (err) {
      console.log('err', err);
    }

    return { categories };
  },

  data() {
    return {
      type: ''
    };
  },

  methods: {
    async onAddCategory() {
      try {
        const data = { type: this.type };
        const response = await this.$axios.$post('http://localhost:3000/api/categories', data);
        console.log('response', response);
        this.categories.push(data);
      } catch (err) {
        console.log('err', err);
      }
    }
  }
};
</script>

<style>

</style>
