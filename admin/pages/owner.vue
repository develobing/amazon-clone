<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-spacing-top-medium" />
          <h2>Add a new Owner</h2>

          <form action="#">
            <!-- Name -->
            <div class="a-spacing-top-medium">
              <label for="#">Name</label>
              <input v-model="name" type="text" class="a-input-text" style="width: 100%;">
            </div>

            <!-- About -->
            <div class="a-spacing-top-medium">
              <label for="#">About</label>
              <input v-model="about" type="text" class="a-input-text" style="width: 100%;">
            </div>

            <!-- Photo Input -->
            <div class="a-spacing-top-medium">
              <label class="mb-0" for="">Add a Photo</label>
              <div class="a-row a-spacing-top-medium">
                <label for="fileInput" class="choosefile-button">
                  <i class="fal fa-plus" />
                  <input id="fileInput" type="file" @change="onFileSelected">
                  <p style="margin-top:-70px">{{ fileName }}</p>
                </label>
              </div>
            </div>

            <!-- Buttons -->
            <hr>
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddOwner">Add Owner</span>
                </span>
              </span>
            </div>
          </form>

          <br>
          <ul class="list-group-item">
            <li v-for="(owner, index) in owners" :key="`owner_${index}`">
              {{ owner.name }}
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
    let owners = [];

    try {
      const response = await $axios.$get('http://localhost:3000/api/owners');
      console.log('response', response);
      owners = response.owners;
    } catch (err) {
      console.log('err', err);
    }

    return { owners };
  },

  data() {
    return {
      name: '',
      about: '',
      selectedFile: null,
      fileName: ''
    };
  },

  methods: {
    onFileSelected(event) {
      const targetFile = event.target.files[0];
      this.selectedFile = targetFile;
      this.fileName = targetFile.name;
      console.log('this.selectedFile', this.selectedFile);
      console.log('this.fileName', this.fileName);
    },

    async onAddOwner() {
      try {
        const data = new FormData();
        data.append('name', this.name);
        data.append('about', this.about);
        data.append('photo', this.selectedFile, this.selectedFile.name);
        const response = await this.$axios.$post('http://localhost:3000/api/owners', data);
        console.log('response', response);

        this.owners.push({ name: this.name });
      } catch (err) {
        console.log('err', err);
      }
    }
  }
};
</script>

<style>

</style>
