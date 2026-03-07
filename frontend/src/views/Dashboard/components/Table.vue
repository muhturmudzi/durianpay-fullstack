<script setup lang="ts">
import { ref } from 'vue'
import CustomTable, { type IHead } from '@/components/CustomTable.vue'

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
    key: 'merchantName',
  },
  {
    label: 'Date',
    key: 'date',
  },
  {
    label: 'Amount',
    key: 'amount',
  },
  {
    label: 'Status',
    key: 'status',
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
  </CustomTable>
</template>