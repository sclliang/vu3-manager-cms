/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import LocalCache from '@/utils/cache'
class Service {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      timeout: 10000
    })
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = LocalCache.getItem('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    })
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      return response
    })
  }
  request<T>(config: AxiosRequestConfig) {
    return this.instance.request<T>(config)
  }
  post<T>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }
  get<T>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }
}

export default Service
