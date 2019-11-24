<template>
  <q-page>
    <div class="q-pa-md" style="margin-left: auto;
  margin-right: auto; margin-top: 50px; max-width: 700px;">
    <q-card style="height:500px">
      <div style="margin-left: auto; margin-right: auto; padding-top: 35px; max-width: 400px">

    <q-form
      @submit="register_user"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Name"
        hint="Name and surname"
      />
      <div v-if="errors.name">
        <a show>*{{errors.name}}</a>
      </div>

      <q-input
        filled
        type="email"
        v-model="email"
        label="Email"
        hint="Your email-id"
      />
      <div v-if="errors.email">
        <a show>*{{errors.email}}</a>
      </div>

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password"
        hint="Min 6 character"
      />
      <div v-if="errors.password">
        <a show>*{{errors.password}}</a>
      </div>

      <q-input
        filled
        type="password"
        v-model="password2"
        label="Confirm Password"
      />
      <div v-if="errors.password2">
        <a show>*{{errors.password2}}</a>
      </div>

      <div style="display: flex; justify-content: flex-end">
        Alraedy have an account? <router-link to="/login">Login</router-link>
      </div>

      <div class="flex flex-center">
        <q-btn label="Register" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
  </q-card>

  </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      name: null,
      email: null,
      password: null,
      password2: null,
      errors: {}
    }
  },
  methods: {
    register_user: function() {
      let name = this.name;
      let email = this.email;
      let password = this.password;
      let password2  = this.password2;
      axios.post('http://localhost:5000/api/users/register', {
        params: {
          name: name,
          email: email,
          password: password,
          password2: password2
        }
      })
        .then((response) => {
          if(response.data.success == true)
          {
            localStorage.setItem('user_auth_Token', response.data.token)
            this.$router.push({
              path: '/restricted'
            })
          }
        })
        .catch((error) => {
          this.errors = error.response.data
        });
    }
  },
}
</script>
