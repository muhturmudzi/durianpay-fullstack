<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { LoaderCircle } from 'lucide-vue-next'
import { getValue } from '@/lib/utils'

export interface IHead {
  label: string
  key: string
  sortable?: boolean
  thClass?: string
  tdClass?: string
}

export interface ITableMeta {
  page: number
  limit: number
  totalData?: number
  totalPage?: number
  status?: string
  sortBy?: string
  typeSort?: string
}

interface Props<T> {
  head: IHead[]
  data: T
  meta: ITableMeta
  isFetching: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props = defineProps<Props<any>>()
const emit = defineEmits(['onPageChange'])

const isEmptyData = computed(() => {
  return props.data.length < 1
})

const activePage = ref(props.meta.page)
watch(
  () => activePage.value,
  (newPage) => {
    emit('onPageChange', newPage)
  }
)

watch(
  () => props.meta.page,
  (newPage) => {
    activePage.value = newPage
  }
)
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead
          v-for="(itemHead, indexHead) in head"
          :key="`head-${itemHead.label}-${indexHead}`"
          :class="itemHead.thClass"
        >
          <slot :name="`head-${itemHead.key}`">
            <span>{{ itemHead.label }}</span>
          </slot>
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody v-if="!isFetching && !isEmptyData">
      <template v-for="(itemBody, indexBody) in data" :key="`body-${indexBody}`">
        <TableRow>
          <TableCell
            v-for="(itemHead, indexHead) in head"
            :key="`col-${itemHead.label}-${indexHead}`"
            :class="itemHead.tdClass"
          >
            <span v-if="itemHead.key === 'no'">
              {{ (meta.page * meta.limit) - meta.limit + Number(indexBody) + 1 }}
            </span>
            <slot
              v-if="!['no'].some(key => key === itemHead.key)"
              :name="itemHead.key"
              :item="itemBody"
              :index="indexBody"
            >
              {{ getValue(itemHead.key, itemBody) }}
            </slot>
          </TableCell>
        </TableRow>
      </template>
    </TableBody>

    <TableBody v-if="!isFetching && isEmptyData">
      <TableCell :colspan="head.length">
        <p class="text-center">No data available</p>
      </TableCell>
    </TableBody>

    <TableBody v-if="isFetching">
      <TableCell :colspan="head.length">
        <div class="flex justify-center items-center space-x-2">
          <LoaderCircle :size="24" class="animate-spin" />
          <span>Loading</span>
        </div>
      </TableCell>
    </TableBody>
  </Table>

  <Pagination
    v-if="!isEmptyData"
    v-slot="{ page }"
    v-model:page="activePage"
    :items-per-page="meta.limit"
    :total="meta.totalData"
    :default-page="meta.page"
    class="mt-4"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>