<template>
  <q-page>
    <div class="q-pa-md" style="margin-left: auto;
  margin-right: auto; margin-top: 50px; max-width: 400px">
      Welcome to restricted Page.
      <q-btn label="Logout" type="submit" color="secondary" @click="logout"/>
  </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
    }
  },
  created () {
    let auth = localStorage.getItem('user_auth_Token')
    if(auth == null){
      this.$router.push({
        path: '/login'
      })
    }
  },
  methods: {
    logout: function() {
      localStorage.removeItem('user_auth_Token')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
