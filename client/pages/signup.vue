<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4" />
        <div class="col-sm-4">
          <div class="text-center">
            <nuxt-link to="/">
              <img src="/img/logo-black.png" alt="">
            </nuxt-link>
          </div>

          <form class="mt-4">
            <div class="a-box a-spacing-extra-large">
              <div class="a-box-inner">
                <h1 class="a-spacing-small">
                  Create Account
                </h1>

                <!-- Your Name -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">Your Name</label>
                  <input id="ap_customer_name" v-model="name" type="text" class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
                </div>

                <!-- Email -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_email" class="a-form-label">Email</label>
                  <input id="ap_customer_email" v-model="email" type="email" class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
                </div>

                <!-- Password -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_password" class="a-form-label">Password</label>
                  <input id="ap_customer_password" v-model="password" type="password" class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
                </div>

                <!-- Alert -->
                <div class="a-alert-container">
                  <div class="a-alert-content">
                    Password must be at least 6 characters.
                  </div>
                </div>

                <!-- Button -->
                <div class="a-row a-spacing-extra-large mb-4">
                  <span class="a-button-primary">
                    <span class="a-button-inner">
                      <span class="a-button-text" @click="onSignup">Create your Amazon account</span>
                    </span>
                  </span>

                  <div class="a-row a-spacing-top-medium a-size-small">
                    <b>
                      By creating an account, you agree to Amazon's
                      <a href="#">Conditions of Use</a> and
                      <a href="#">Privacy Notice</a>
                    </b>
                  </div>
                </div>

                <hr>
                <div class="a-row">
                  <b>
                    Already have an account?
                    <nuxt-link to="/login" class="a-link-emphasis">Sign in</nuxt-link>
                  </b>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  layout: 'none',
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async onSignup() {
      try {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password
        };

        const response = await this.$axios.$post('/api/auth/signup', data);
        console.log('response', response);

        if (response.success) {
          this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          });

          this.$router.push('/');
        }
      } catch (err) {
        console.log('err', err);
      }
    }
  }
};
</script>
