<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-sm">
      <q-btn @click="$router.push('/register')" color="secondary" label="Register" />
      <q-btn @click="$router.push('/login')" color="secondary" label="Login" />
    </div>
  </q-page>
</template>

<script>
export default {
}
</script>
