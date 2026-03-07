<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import {
  Eye,
  EyeOff,
  LoaderCircle
} from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Label from '@/components/ui/label/Label.vue'
import InputText from '@/components/vee-validate/InputText.vue'
import { Button } from '@/components/ui/button'
import { type ILogin } from '@/services/auth'

const route = useRoute()
const router = useRouter()

const showPass = ref(false)
const loading = ref(false)

const { handleSubmit } = useForm<ILogin>({
  validationSchema: yup.object({
    email: yup.string().required().email().matches(/@[^.]*\./, 'Email Address must be a valid email').label('Email Address'),
    password: yup.string().required().label('Password'),
  })
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    // const { data: { data } } = await login(values)

    // localStorage.setItem('token', data.token)

    setTimeout(() => {
      console.log(values)
      localStorage.setItem('token', 'Bearer')
      loading.value = false
      router.push('/')
    }, 500)

    // loading.value = false
    // router.push('/')
  } catch (error) {
    console.error(error)
    loading.value = false
  }
})

onMounted(() => {
  if (route.query.err === 'unauthorized') {
    alert('Unauthorized')
  }
})
</script>

<template>
  <section class="flex items-center justify-center min-h-dvh">
    <Card class="w-full max-w-sm">
      <CardHeader class="gap-4">
        <img
          src="https://framerusercontent.com/images/tgeBxZjClYlLQ8DExSWrxd918Z8.png?scale-down-to=512&width=1250&height=1250"
          alt="durianpay"
          class="w-20 mx-auto"
        />
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form id="form-login" class="grid gap-4" @submit="onSubmit">
          <div class="grid gap-2">
            <Label for="email">Email Address</Label>
            <InputText
              name="email"
              placeholder="Insert your email address"
            />
          </div>

          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <InputText
              name="password"
              placeholder="Insert your password"
              :type="showPass? 'text' : 'password'"
            >
              <button
                type="button"
                class="absolute top-2/4 -translate-y-2/4 right-4 cursor-pointer"
                @click="showPass = !showPass"
              >
                <EyeOff v-if="showPass" :size="20" />
                <Eye v-if="!showPass" :size="20" />
              </button>
            </InputText>
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          form="form-login"
          type="submit"
          class="w-full"
        >
          <LoaderCircle v-if="loading" :size="16" class="animate-spin mr-2" />
          {{ loading? 'Please wait' : 'Log In' }}
        </Button>
      </CardFooter>
    </Card>
  </section>
</template>