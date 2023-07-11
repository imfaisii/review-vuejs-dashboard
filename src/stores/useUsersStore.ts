import useApiFetch from '@/composables/useApiFetch'
import { defaultPagination } from '@/constants/pagination'
import { getExceptionMessage, reshapeParams } from '@/utils/useHelper'
import { defineStore } from 'pinia'

type UserData = {
  name: string
  email: string
  roles: number[]
  password: string
  password_confirmation: string
  status: string
}

export const useUsersStore = defineStore('users', () => {
  const endPoint = '/users'
  const users = ref([])
  const selectedUser = ref<any>(null)
  const isLoading = ref(false)
  const meta = ref(defaultPagination)
  const $notify: any = inject('$notify')

  // Add a flag variable to indicate intentional modification of `meta` inside the watcher
  let isFetching = false

  const isUserSelected = computed(() => !!selectedUser.value)

  const fetchUsers = async (options = {}) => {
    isLoading.value = true
    const { data, meta: serverMeta } = await useApiFetch(reshapeParams(endPoint, meta, options))
    users.value = data.users
    meta.value = serverMeta
    isLoading.value = false
  }

  const storeUser = async (userData: UserData, options: any = { method: 'POST' }) => {
    try {
      isLoading.value = true
      await useApiFetch('/users', {
        data: userData,
        ...options,
      })
      await fetchUsers()
      $notify.success('User was saved successfully.')
    } catch (error) {
      $notify.error(getExceptionMessage(error))
    } finally {
      isLoading.value = false
    }
  }

  const deleteUser = async (userId: number, options = { method: 'DELETE' }) => {
    try {
      isLoading.value = true
      await useApiFetch(`${endPoint}/${userId}`, options)
      $notify.success('User was deleted successfully.')
      await fetchUsers()
    } catch (error) {
      $notify.error(getExceptionMessage(error))
    } finally {
      isLoading.value = false
    }
  }

  watch(
    meta,
    async () => {
      if (isFetching) return

      isFetching = true
      await fetchUsers()
      isFetching = false
    },
    { deep: true },
  )

  return {
    users,
    isLoading,
    isUserSelected,
    selectedUser,
    meta,
    fetchUsers,
    storeUser,
    deleteUser,
  }
})
