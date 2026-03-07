import { reactive } from 'vue'
import type { ITableMeta } from '@/components/CustomTable.vue'

export const usePagination = () => {
  const meta = reactive<ITableMeta>({
    page: 1,
    limit: 10,
    sortBy: 'id',
    typeSort: 'desc'
  })

  const setQuery = (params: ITableMeta) => {
    Object.assign(meta, params)
  }

  return {
    meta,
    setQuery
  }
}