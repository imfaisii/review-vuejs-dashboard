import useApiFetch from '@/composables/useApiFetch'
import { ACCESS_TOKEN_KEY } from '@/constants/general'
import { isValidToken } from '@/middlewares/auth'
import { getExceptionMessage } from '@/utils/useHelper'
import { defineStore } from 'pinia'

type User = {
  id: number
  name: string
  email: string
}

type Credentials = {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const user = ref<User | null>(null)
  const isLoading = ref<boolean>(false)
  const isLoggedIn = computed(() => !!user.value)
  const $notify: any = inject('$notify')
  const router = useRouter()

  const fetchUser = async () => {
    const { data } = await useApiFetch('/user')
    await setUser(data.user)
  }

  const login = async (credentials: Credentials) => {
    isLoading.value = true

    try {
      const { data: loginData } = await useApiFetch('/login', {
        data: credentials,
        method: 'POST',
      })

      await setToken(loginData.access_token)
      await setUser(loginData.user)
      redirectToDashboard()
    } catch (error: any) {
      if (error?.response?.data?.message == 'The route dashboard could not be found.') {
        redirectToDashboard()

        return
      }

      $notify.error(getExceptionMessage(error))
    } finally {
      isLoading.value = false
    }
  }

  const setUser = async (userData: User | any) => {
    user.value = userData

    if (!accessToken.value && isValidToken(getStorageToken().value)) {
      accessToken.value = getStorageToken().value
    }
  }
  const setToken = async (token: any) => {
    accessToken.value = token
    getStorageToken().value = token
  }

  const destroyUser = async () => (user.value = null)
  const destroyToken = async () => {
    getStorageToken().value = null
    accessToken.value = null
  }

  const getStorageToken = () => useStorage(ACCESS_TOKEN_KEY, null)

  const logout = async () => {
    destroyUser()
    destroyToken()
    redirectToLogin()
  }

  const redirectToLogin = () => {
    $notify.success('Redirecting to login')
    router.push('/login')
  }

  const redirectToDashboard = () => {
    $notify.success('Redirecting to dashboard')
    router.push('/dashboard')
  }

  return {
    user,
    login,
    logout,
    fetchUser,
    isLoggedIn,
    isLoading,
    accessToken,
    redirectToDashboard,
    redirectToLogin,
    setToken,
    setUser,
    destroyUser,
    destroyToken,
  }
})
