<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium" />
            <h2 class="text-center">
              Update {{ product.title }}
            </h2>

            <form action="#">
              <!-- Category Dropdown -->
              <div class="a-spacing-top-medium">
                <label for="#">Category</label>
                <select v-model="categoryId" name="#" class="a-select-option">
                  <option v-for="(category, index) in categories" :key="`category_${index}`" :value="category._id">
                    {{ category.type }}
                  </option>
                </select>
              </div>

              <!-- Owner Dropdown -->
              <div class="a-spacing-top-medium">
                <label for="#">Owner</label>
                <select v-model="ownerId" name="#" class="a-select-option">
                  <option v-for="(owner, index) in owners" :key="`owner_${index}`" :value="owner._id">
                    {{ owner.name }}
                  </option>
                </select>
              </div>

              <!-- Title Input -->
              <div class="a-spacing-top-medium">
                <label class="mb-0" for="">Title</label>
                <input v-model="title" type="text" class="a-input-text" style="width:100%" :placeholder="product.title">
              </div>

              <!-- Price Input -->
              <div class="a-spacing-top-medium">
                <label class="mb-0" for="">Price</label>
                <input v-model="price" type="number" class="a-input-text" style="width:100%" :placeholder="product.price">
              </div>

              <!-- Price Input -->
              <div class="a-spacing-top-medium">
                <label class="mb-0" for="">stockQuantity</label>
                <input v-model="stockQuantity" type="number" class="a-input-text" style="width:100%" :placeholder="product.stockQuantity">
              </div>

              <!-- Description Input -->
              <div class="a-spacing-top-medium">
                <label class="mb-0" for="">Description</label>
                <textarea v-model="description" :placeholder="product.description" style="width:100%" />
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
                    <span class="a-button-text" @click="onUpdateProduct">Update Product</span>
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div class="col-sm-3" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      const categories = $axios.$get('http://localhost:3000/api/categories');
      const owners = $axios.$get('http://localhost:3000/api/owners');
      const product = $axios.$get(`http://localhost:3000/api/products/${params.id}`);

      const [ catResponse, ownerResponse, productResponse ] = await Promise.all([ categories, owners, product ]);
      console.log('catResponse', catResponse);
      console.log('ownerResponse', ownerResponse);
      console.log('productResponse', productResponse);

      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners,
        product: productResponse.product
      };
    } catch (err) {
      console.log('err', err);

      return true;
    }
  },

  data() {
    return {
      categoryId: null,
      ownerId: null,
      title: '',
      price: 0,
      stockQuantity: 1,
      description: '',
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

    async onUpdateProduct() {
      const data = new FormData();
      data.append('title', this.title);
      data.append('price', this.price);
      data.append('description', this.description);
      data.append('stockQuantity', this.stockQuantity);
      data.append('ownerId', this.ownerId);
      data.append('categoryId', this.categoryId);
      data.append('photo', this.selectedFile, this.selectedFile.name);

      const result = await this.$axios.$put(`http://localhost:3000/api/products/${this.$route.params.id}`, data);
      console.log('result', result);
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
