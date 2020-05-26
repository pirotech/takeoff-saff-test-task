<template>
  <div class="login-page">
    <a-card title="Authorization" class="login-page-card">
      <a-form-model :model="form" @submit="submit" @submit.native.prevent>
        <a-form-model-item>
          <a-input v-model="form.username" placeholder="Username">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="form.password" type="password" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="form.username === '' || form.password === ''"
          >
            Log in
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
      }
    };
  },
  computed: {
    ...mapGetters([
      'isAuthorized'
    ])
  },
  watch: {
    isAuthorized() {
      if (this.isAuthorized) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    submit() {
      const { username, password } = this.form;
      this.$store.dispatch({
        type: 'LOGIN',
        username,
        password
      });
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fafafa;
  &-card {
    width: 320px;
  }
}
</style>
