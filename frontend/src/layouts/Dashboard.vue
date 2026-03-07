<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/layouts/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const route = useRoute()
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="relative w-full min-h-svh px-4">
      <header class="flex items-center space-x-2 h-16">
        <SidebarTrigger />
        <h1>{{ route.name }}</h1>
      </header>
      <RouterView />
    </main>
  </SidebarProvider>
</template>