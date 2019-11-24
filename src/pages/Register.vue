<template>
  <q-page>
    <div class="q-pa-md" style="margin-left: auto;
  margin-right: auto; margin-top: 3.3em; max-width: 50em;">
    <q-card style="height:44em">
      <div style="margin-left: auto; margin-right: auto; padding-top: 2.5em; max-width: 28.57em">

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
        Alraedy have an account? <router-link to="/">Login</router-link>
      </div>

      <div class="flex flex-center">
        <btnLoader v-if=btnloader></btnLoader>
        <div v-else>
          <q-btn label="Register" type="submit" color="primary"/>
        </div>
      </div>
    </q-form>
  </div>
  </q-card>

  </div>
  </q-page>
</template>

<script>
import btnLoader from '../layouts/btnLoader'
import {deployServer, testServer} from '../serverPath.js'
import axios from 'axios';

export default {
  data () {
    return {
      btnloader: false,
      name: null,
      email: null,
      password: null,
      password2: null,
      errors: {}
    }
  },
  components: {
    btnLoader
  },
  methods: {
    register_user: function() {
      this.btnloader = true;
      let name = this.name;
      let email = this.email;
      let password = this.password;
      let password2  = this.password2;
      axios.post(deployServer + 'api/users/register', {
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
            this.btnloader = false;
            localStorage.setItem('user_auth_Token', response.data.token)
            this.$router.push({
              path: '/restricted'
            })
          }
        })
        .catch((error) => {
          this.btnloader = false;
          this.errors = error.response.data
        });
    }
  },
}
</script>
