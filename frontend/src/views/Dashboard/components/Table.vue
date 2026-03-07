<script setup lang="ts">
import { ref } from 'vue'
import CustomTable, { type IHead } from '@/components/CustomTable.vue'
import { toCurrencyFormat, formatDate } from '@/lib/utils'

interface Props<T> {
  data: T
  isFetching: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<Props<any>>()
const emit = defineEmits(['onFetch', 'onEdit', 'onPageChange'])

const head = ref<IHead[]>([
  {
    label: '#',
    key: 'no',
    thClass: 'w-1/12',
  },
  {
    label: 'Merchant Name',
    key: 'merchant',
  },
  {
    label: 'Date',
    key: 'createdAt',
  },
  {
    label: 'Amount',
    key: 'amount',
  },
  {
    label: 'Status',
    key: 'status',
    tdClass: 'capitalize',
  }
])
</script>

<template>
  <CustomTable
    :head="head"
    :data="data.data"
    :meta="data.meta"
    :is-fetching="isFetching"
    @on-page-change="emit('onPageChange', $event)"
  >
    <template #createdAt="{ item }">
      {{ formatDate(item.createdAt) }}
    </template>
    <template #amount="{ item }">
      {{ toCurrencyFormat(item.amount) }}
    </template>
  </CustomTable>
</template>