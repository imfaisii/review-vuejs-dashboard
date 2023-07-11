import env from '@/constants/env'
import { useAuthStore } from '@/stores/useAuthStore'
import { getExceptionMessage } from '@/utils/useHelper'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const { VITE_APP_API_URL: BASE_URL } = env

export default async function useApiFetch(uri: string, options: AxiosRequestConfig = {}): Promise<any> {
  const auth = useAuthStore()
  const $notify: any = inject('$notify')

  const config: AxiosRequestConfig = {
    url: `${BASE_URL}${uri}`,
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const token = auth.accessToken || localStorage.getItem('access_token')

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }

  const apiInstance: AxiosInstance = axios.create(config)

  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: any) => {
      if (error.response && error.response.status === 401) {
        if ($notify) {
          $notify.error('You have been logged out. Token expired')
        }
        auth.logout()
      } else if (error?.response?.data?.message == 'The route dashboard could not be found.') {
        auth.redirectToDashboard()
      } else {
        if ($notify) {
          $notify.error(getExceptionMessage(error))
        }
      }
      return Promise.reject(error)
    },
  )

  return await apiInstance.request<any>(config)
}
