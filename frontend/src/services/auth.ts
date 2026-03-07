import type { AxiosResponse } from 'axios'
import instance from './http'

export interface ILogin {
  email: string
  password: string
}

export interface ILoginResponse {
  data: IToken
}

export interface IToken {
  token: string
}

export type IRole = 'admin' | ''

export const login = async (body: ILogin): Promise<AxiosResponse<ILoginResponse>> => {
  try {
    const res: AxiosResponse<ILoginResponse> = await instance.post('/user/login', body)

    return res
  } catch (error) {
    throw new Error(String(error))
  }
}