import type { AxiosResponse } from 'axios'
import instance from './http'

export interface IPaymentList {
  data: IPayment[]
}

export interface IPayment {
  paymentId: number | null
  merchantName: string
  date: string
  amount: number
  status: IStatusPayment
}

export type IStatusPayment = 'completed' | 'processing' | 'failed'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPaymentList = async (params: any): Promise<AxiosResponse<IPaymentList>> => {
  try {
    const res: AxiosResponse<IPaymentList> = await instance.get('/payment', { params })

    return res
  } catch (error) {
    throw new Error(String(error))
  }
}