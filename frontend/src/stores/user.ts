import { defineStore } from 'pinia'
import type { IRole } from '@/services/auth'

interface State {
  userId: number | undefined
  userName: string
  email: string
  roleName: IRole
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    userId: 1,
    userName: '',
    email: '',
    roleName: ''
  })
})