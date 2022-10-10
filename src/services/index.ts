import { extend } from 'umi-request'
import { history } from 'umi'
import { Message } from '@kdcloudjs/kdesign'
import { ACCESS_TOKEN } from '@/constant'

export interface IResult<T> {
  success: boolean
  errorCode: string
  message: string
  data: T
}

export interface IParams {
  period: string
  companySn?: string
  dataType: string
}

const errorHandler = (error: { response: Response }): Response => {
  localStorage.setItem(ACCESS_TOKEN, '')
  throw error
}

const request = extend({
  errorHandler,
  credentials: 'include',
})

request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        accesstoken: localStorage.getItem(ACCESS_TOKEN) || '',
      },
    },
  }
})

request.interceptors.response.use(async (response) => {
  const { status } = response
  if (status === 200) {
    const data = await response.clone().json()
    const { success, message, state } = data
    if (success !== true && state !== 'success') {
      console.log('error', message || '系统误，请稍后再试[800]')
      localStorage.setItem(ACCESS_TOKEN, '')
    }
  } else {
    console.log('系统误，请稍后再试[900]')
  }
  return response
})

export default request
