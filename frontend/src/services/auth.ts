import type { AxiosResponse } from 'axios'
import instance from './http'

export interface ILogin {
  email: string
  password: string
}

export interface ILoginResponse {
  email: string
  role: IRole
  token: string
}

export type IRole = 'cs' | 'operation' | ''

export const login = async (body: ILogin): Promise<AxiosResponse<ILoginResponse>> => {
  try {
    const res: AxiosResponse<ILoginResponse> = await instance.post('/dashboard/v1/auth/login', body)

    return res
  } catch (error) {
    throw new Error(String(error))
  }
}