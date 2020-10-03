<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-spacing-top-medium" />
          <h2>Profile Page</h2>
          <a href="#" @click="onLogout">Logout</a>

          <form action="#">
            <!-- Name -->
            <div class="a-spacing-top-medium">
              <label for="#">Name</label>
              <input v-model="name" type="text" class="a-input-text" style="width: 100%;" :placeholder="$auth.$state.user.name">
            </div>
            <!-- Email -->
            <div class="a-spacing-top-medium">
              <label for="#">Email</label>
              <input v-model="email" type="email" class="a-input-text" style="width: 100%;" :placeholder="$auth.$state.user.email">
            </div>
            <!-- Password -->
            <div class="a-spacing-top-medium">
              <label for="#">Password</label>
              <input v-model="password" type="password" class="a-input-text" style="width: 100%;">
            </div>

            <!-- Buttons -->
            <hr>
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onProfileUpdate">Update Profile</span>
                </span>
              </span>
            </div>
          </form>
        </div>
        <div class="col-sm-3" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },

  methods: {
    async onProfileUpdate() {
      try {
        const data = { name: this.name, email: this.email, password: this.password };
        const response = await this.$axios.$put('/api/auth/user', data);

        if (response.success) {
          this.name = '';
          this.email = '';
          this.password = '';

          await this.$auth.fetchUser();
        }
      } catch (err) {
        console.log('err', err);
      }
    },

    async onLogout() {
      await this.$auth.logout();
    }
  }
};
</script>

<style>

</style>
