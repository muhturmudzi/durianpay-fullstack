import type { AxiosResponse } from 'axios'
import instance from './http'
import type { ITableMeta } from '@/components/CustomTable.vue'

export interface IPaymentList {
  meta: ITableMeta
  data: IPayment[]
}

export interface IPayment {
  id: number | null
  merchant: string
  createdAt: string
  amount: number
  status: IStatusPayment
}

export type IStatusPayment = 'completed' | 'processing' | 'failed'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPaymentList = async (params: any): Promise<AxiosResponse<IPaymentList>> => {
  try {
    const res: AxiosResponse<IPaymentList> = await instance.get('/dashboard/v1/payments', { params })

    return res
  } catch (error) {
    throw new Error(String(error))
  }
}