<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted, watch } from 'vue'
import TablePayment from './components/Table.vue'
import { usePagination } from '@/composables/usePagination'
import type { IPaymentList } from '@/services/payment'
import { getPaymentList } from '@/services/payment'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const route = useRoute()
const router = useRouter()
const pagination = usePagination()

const isFetching = ref(false)
const data = reactive<IPaymentList>({
  data: [],
  meta: pagination.meta
})

const fetchPayments = async () => {
  try {
    isFetching.value = true
    const res = await getPaymentList({
      ...pagination.meta,
      status: status.value === 'all' ? undefined : status.value
    })
    data.data = res.data.data
    data.meta = {
      page: pagination.meta.page,
      limit: pagination.meta.limit,
      totalData: 3,
      totalPage: 1
    }
    isFetching.value = false
  } catch (error) {
    console.error(error)
    isFetching.value = false
  }
}

onMounted(() => {
  const query = route.query
  if (Object.keys(query).length < 1) {
    router.push(`?page=${pagination.meta.page}&limit=${pagination.meta.limit}`)
    return
  }

  pagination.setQuery({ page: Number(query.page), limit: Number(query.limit) })
  fetchPayments()
})

watch(
  () => pagination.meta,
  (newMeta) => {
    router.push(`?page=${newMeta.page}&limit=${newMeta.limit}`)
  },
  { deep: true }
)

watch(
  () => route.query,
  () => {
    fetchPayments()
  },
  { deep: true }
)

const status = ref('all')
const listStatus = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Processing', value: 'processing' },
  { label: 'Failed', value: 'failed' }
]

const onChangeStatus = () => {
  pagination.setQuery({ ...pagination.meta, page: 1 })
  fetchPayments()
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mb-6">
    <Card class="bg-white/90 border border-[#E5E5E5] py-4">
      <CardContent class="space-y-2">
        <p>Total</p>
        <p class="text-primary text-3xl font-medium font-bricolage">{{ data.data.length }}</p>
      </CardContent>
    </Card>
    <Card class="bg-white/90 border border-[#E5E5E5] py-4">
      <CardContent class="space-y-2">
        <p>Completed</p>
        <p class="text-primary text-3xl font-medium font-bricolage">{{ data.data.filter((p) => p.status === 'completed').length }}</p>
      </CardContent>
    </Card>
    <Card class="bg-white/90 border border-[#E5E5E5] py-4">
      <CardContent class="space-y-2">
        <p>Processing</p>
        <p class="text-primary text-3xl font-medium font-bricolage">{{ data.data.filter((p) => p.status === 'processing').length }}</p>
      </CardContent>
    </Card>
    <Card class="bg-white/90 border border-[#E5E5E5] py-4">
      <CardContent class="space-y-2">
        <p>Failed</p>
        <p class="text-primary text-3xl font-medium font-bricolage">{{ data.data.filter((p) => p.status === 'failed').length }}</p>
      </CardContent>
    </Card>
  </div>

  <Select v-model="status" @update:model-value="onChangeStatus">
    <SelectTrigger id="select-trigger-status" class="min-w-40">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="(item, index) in listStatus"
        :key="`status-${index}`"
        :value="String(item.value)"
      >
        {{ item.label }}
      </SelectItem>
    </SelectContent>
  </Select>

  <TablePayment
    :data="data"
    :is-fetching="isFetching"
    @on-fetch="fetchPayments"
    @on-page-change="($event) => pagination.setQuery({ ...pagination.meta, page: $event })"
  />
</template>