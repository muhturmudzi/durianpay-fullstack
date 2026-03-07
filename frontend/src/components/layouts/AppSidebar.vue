<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import {
  LayoutDashboard,
  LogOut,
  LoaderCircle,
  AlertCircle
} from 'lucide-vue-next'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useSidebar } from '@/components/ui/sidebar'
import type { IRole } from '@/services/auth'
import { useUserStore } from '@/stores/user'

interface IMenu {
  title: string
  url: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  roles: IRole[]
}

const route = useRoute()
const router = useRouter()
const { setOpenMobile } = useSidebar()
const userStore = useUserStore()

// Menu items.
const items: IMenu[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    roles: ['cs', 'operation']
  },
]

const showMenu = (menu: IMenu) => {
  return menu.roles.some(item => userStore.roleName.includes(item))
}

const showSignOutConfirmation = ref(false)
const loading = ref(false)
const doSignOut = () => {
  loading.value = true

  setTimeout(() => {
    localStorage.clear()
    router.push('/auth/login')
  }, 500)
}
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <img
        src="https://framerusercontent.com/images/tgeBxZjClYlLQ8DExSWrxd918Z8.png?scale-down-to=512&width=1250&height=1250"
        alt="durianpay"
        class="w-12 md:w-16 lg:w-20 mx-auto"
      />
      <div>
        <p class="text-center text-primary">{{ userStore.email }}</p>
        <p class="text-center text-primary text-sm">{{ userStore.roleName }}</p>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton v-if="showMenu(item)" asChild :isActive="route.path.includes(item.url)">
                  <RouterLink :to="item.url" @click.prevent="setOpenMobile(false)">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton @click="showSignOutConfirmation = true">
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>

  <AlertDialog :open="showSignOutConfirmation">
    <AlertDialogContent class="max-w-xs">
      <template #icon>
        <AlertCircle class="text-warning-500 mx-auto" :size="80" />
      </template>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center">Are you sure to logout ?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel id="btn-cancel-logout" @click="showSignOutConfirmation = false">Cancel</AlertDialogCancel>
        <AlertDialogAction id="btn-save-logout" @click="doSignOut">
          <LoaderCircle v-if="loading" :size="16" class="animate-spin mr-2" />
          {{ loading? 'Please wait' : 'Yes, Log Out' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>