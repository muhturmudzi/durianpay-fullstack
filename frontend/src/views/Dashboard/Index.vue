<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted, watch } from 'vue'
import TablePayment from './components/Table.vue'
import { usePagination } from '@/composables/usePagination'
import type { IPaymentList } from '@/services/payment'
// import { getPaymentList } from '@/services/payment'
import {
  Card,
  CardContent,
} from '@/components/ui/card'

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
    // const res = await getPaymentList({
    //   ...pagination.meta,
    // })
    // data.data = res.data.data
    // data.meta = res.data.meta

    data.data = [
      {
        paymentId: 1,
        merchantName: 'Merchant A',
        date: '2024-06-01',
        amount: 100,
        status: 'completed'
      },
      {
        paymentId: 2,
        merchantName: 'Merchant B',
        date: '2024-06-02',
        amount: 200,
        status: 'processing'
      },
      {
        paymentId: 3,
        merchantName: 'Merchant C',
        date: '2024-06-03',
        amount: 300,
        status: 'failed'
      }
    ]
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
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mb-6">
    <Card class="bg-white/90 border border-[#E5E5E5] py-4">
      <CardContent class="space-y-2">
        <p>Total</p>
        <p class="text-primary text-3xl font-medium font-bricolage">3</p>
      </CardContent>
    </Card>
    <Card class="bg-white/90 border border-[#E5E5E5] py-4">
      <CardContent class="space-y-2">
        <p>Success</p>
        <p class="text-primary text-3xl font-medium font-bricolage">2</p>
      </CardContent>
    </Card>
    <Card class="bg-white/90 border border-[#E5E5E5] py-4">
      <CardContent class="space-y-2">
        <p>Failed</p>
        <p class="text-primary text-3xl font-medium font-bricolage">1</p>
      </CardContent>
    </Card>
  </div>

  <TablePayment
    :data="data"
    :is-fetching="isFetching"
    @on-fetch="fetchPayments"
    @on-page-change="($event) => pagination.setQuery({ ...pagination.meta, page: $event })"
  />
</template>