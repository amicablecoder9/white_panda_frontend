<template>
  <q-page>
    <div class="q-pa-md">
    <div class="q-gutter-y-md" style="margin-left: auto;
  margin-right: auto; margin-top: 3.3em; max-width: 42.85em">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        >
        <q-tab name="email" label="Email" ></q-tab>
        <q-tab name="mobile" label="Mobile" ></q-tab>
      </q-tabs>

      <q-separator ></q-separator>

      <q-tab-panels v-model="tab" animated>

        <q-tab-panel name="email">
          <div class="q-pa-md" style="margin-left: auto;
            margin-right: auto; margin-top: 2em; max-width: 28.57em">

          <q-form @submit="login_user" class="q-gutter-md">
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
            />
            <div v-if="errors.password">
              <a show>*{{errors.password}}</a>
            </div>
            <div style="display: flex; justify-content: flex-end">
              Don't have an account? <router-link to="/register">Register</router-link>
            </div>

            <div class="flex flex-center">
              <btnLoader v-if=btnloader></btnLoader>
              <div v-else>
                <q-btn label="Login" type="submit" color="primary"/>
              </div>
            </div>
          </q-form>

        </div>
        </q-tab-panel>

        <q-tab-panel name="mobile">
          <div class="q-pa-md" style="margin-left: auto;
            margin-right: auto; margin-top: 2em; max-width: 28.57em">

          <q-form v-if="otp_panel == false" @submit="get_otp" class="q-gutter-md">
            <q-input
              filled
              type="tel"
              v-model="mobile"
              label="Mobile Number"
            />
            <div v-if="errors.mobile">
              <a show>*{{errors.mobile}}</a>
            </div>
            <div class="flex flex-center">
              <btnLoader v-if=btnloader></btnLoader>
              <div v-else>
                <q-btn label="Get OTP" type="submit" color="primary"/>
              </div>
            </div>
          </q-form>

          <q-form v-if=otp_panel @submit="verify_otp" class="q-gutter-md">
            <q-input
              filled
              type="num"
              v-model="otp_code"
              label="Enter Otp"
            />
            <div v-if="errors.otp">
              <a show>*{{errors.otp}}</a>
            </div>
            <div class="flex flex-center">
              <btnLoader v-if=btnloader></btnLoader>
              <div v-else>
                <q-btn label="Verify OTP" type="submit" color="primary"/>
              </div>
            </div>
          </q-form>

          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    </div>
    </div>
  </q-page>
</template>

<script>
import btnLoader from '../layouts/btnLoader'
import { deployServer, testServer } from '../serverPath.js'
import axios from 'axios';
import bcrypt from 'bcryptjs'

export default {
  data () {
    return {
      btnloader: false,
      email: null,
      password: null,
      mobile: null,
      otp_code: null,
      tab: 'email',
      otp_panel: false,
      to: null,
      errors: {}
    }
  },
  components:{
    btnLoader
  },
  methods: {
    login_user: function() {
      this.btnloader = true;
      let email = this.email;
      let password = this.password;
      if(password == null)
      axios.post(deployServer + 'api/users/login', {
        params: {
          email: email,
          password: password
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
    },
    get_otp: function() {
      this.btnloader = true;
      let mobile = this.mobile;
      axios.post(deployServer + 'api/phone/sms_verification', {
        params: {
          mobile: mobile
        }
      })
        .then((response) => {
          this.btnloader = false;
          if(response.data.success == true)
          {
            this.otp_panel = true
            this.errors.otp = response.data.message
            this.to = response.data.to
          }
        })
        .catch((error) => {
          this.btnloader = false;
          this.errors = error.response.data
        });
    },
    verify_otp: function() {
      this.btnloader = true;
      let otp_code = this.otp_code
      axios.post(deployServer + 'api/phone/verify_otp', {
        params: {
          otp_code: otp_code,
          to: this.to
        }
      })
        .then((response) => {
          this.btnloader = false;
          if(response.data.success == true)
          {
            localStorage.setItem('user_auth_Token', response.data.token)
            this.otp_panel = false
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
