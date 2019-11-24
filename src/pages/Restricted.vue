<template>
  <q-page>
    <div class="q-pa-md" style="margin-left: auto;
  margin-right: auto; margin-top: 3.3em; max-width: 28.57em">
      Welcome to restricted Page.
      <btnLoader v-if=btnloader></btnLoader>
      <div v-else>
        <q-btn label="Logout" type="submit" color="secondary" @click="logout"/>
      </div>
  </div>
  </q-page>
</template>

<script>
import btnLoader from '../layouts/btnLoader'
import axios from 'axios'

export default {
  data () {
    return {
      btnloader: false,
    }
  },
  components: {
    btnLoader
  },
  created () {
    let auth = localStorage.getItem('user_auth_Token')
    if(auth == null){
      this.$router.push({
        path: '/'
      })
    }
  },
  methods: {
    logout: function() {
      this.btnloader = true;
      localStorage.removeItem('user_auth_Token')
      this.btnloader = false;
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
