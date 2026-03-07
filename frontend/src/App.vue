<script setup lang="ts">
import { useUserStore } from './stores/user'

const userStore = useUserStore()

const user = localStorage.getItem('user')

if (user) {
  const data = JSON.parse(user)
  userStore.$patch({
    roleName: data.roleName,
    email: data.email
  })
}
</script>

<template>
  <RouterView />
</template>
