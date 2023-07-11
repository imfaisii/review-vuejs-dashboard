<script lang="ts" setup>
import { useUsersStore } from '@/stores/useUsersStore';
import { paginationMeta } from '@/utils/usePaginationMeta';
import { VDataTableServer } from 'vuetify/labs/VDataTable';

const isAddUserDialogVisible = ref(false)
const usersStore = useUsersStore()

// Headers
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Status', key: 'status' },
  { title: 'Role', key: 'role', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
]

const resolveUserRoleVariant = (role: string) => {
  const roleLowerCase = role.toLowerCase()

  if (roleLowerCase === 'super admin') return { color: 'warning', icon: 'tabler-device-laptop' }

  return { color: 'primary', icon: 'tabler-user' }
}

const resolveUserStatusVariant = (stat: string) => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'error'

  return 'primary'
}

onMounted(async () => await usersStore.fetchUsers())
</script>
<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard class="users-card">
          <VCardTitle class="pl-4 pr-4 mt-3 mb-2">
            <VRow class="text-layout">
              <VCol cols="6" class="text-left">
                <h6 class="text-h5">Users Table</h6>
              </VCol>
              <VCol cols="6" class="text-right">
                <VBtn @click="isAddUserDialogVisible = true" color="primary">
                  Create User
                </VBtn>
              </VCol>
            </VRow>
          </VCardTitle>
          <VCardText class="d-flex align-center flex-wrap gap-4 py-4 no-padding">
            <VDataTableServer v-model:items-per-page="usersStore.meta.per_page"
              v-model:page="usersStore.meta.current_page" :items="usersStore.users" :items-length="10" :headers="headers"
              @update:sortBy="usersStore.meta.sort = $event" class="text-no-wrap">
              <template #top>
                <VProgressLinear v-if="usersStore.isLoading" indeterminate color="primary" :height="2">
                </VProgressLinear>
              </template>

              <!-- Name -->
              <template #item.name="{ item }">
                <div class="d-flex align-center">
                  <div class="d-flex flex-column">
                    <h6 class="text-base">
                      {{ item.raw.name }}
                    </h6>
                  </div>
                </div>
              </template>

              <!-- Email -->
              <template #item.email="{ item }">
                <div class="d-flex align-center">
                  <div class="d-flex flex-column">
                    <span class="text-sm text-medium-emphasis">{{ item.raw.email }}</span>
                  </div>
                </div>
              </template>

              <!-- Status -->
              <template #item.status="{ item }">
                <VChip label size="small" class="text-capitalize" :color="resolveUserStatusVariant(item.raw.status)">
                  {{ item.raw.status }}
                </VChip>
              </template>

              <!-- Role -->
              <template #item.role="{ item }">
                <div class="d-flex align-center gap-4">
                  <VAvatar :size="30" :color="resolveUserRoleVariant(item.raw.top_role).color" variant="tonal">
                    <VIcon :size="20" :icon="resolveUserRoleVariant(item.raw.top_role).icon" />
                  </VAvatar>
                  <span class="text-capitalize">
                    {{ item.raw.top_role == '' ? 'No role' : item.raw.top_role }}
                    {{ item.raw.roles.length > 1 ? `( +${item.raw.roles.length - 1} )` : '' }}
                  </span>
                </div>
              </template>

              <!-- Actions -->
              <template #item.actions="{ item }">
                <IconBtn>
                  <VIcon icon="tabler-edit" />
                </IconBtn>
                <IconBtn @click="usersStore.deleteUser(item.raw.id)">
                  <VIcon color="error" icon="tabler-trash" />
                </IconBtn>
              </template>

              <!-- pagination -->
              <template #bottom>
                <VDivider />
                <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
                  <p class="text-sm text-disabled mb-0">
                    {{ paginationMeta(usersStore.meta, usersStore.meta.total) }}
                  </p>

                  <v-pagination v-model="usersStore.meta.current_page" :length="usersStore.meta.last_page"
                    :total-visible="6">
                    <template #prev="slotProps">
                      <VBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
                        Previous
                      </VBtn>
                    </template>
                    <template #next="slotProps">
                      <VBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
                        Next
                      </VBtn>
                    </template>
                  </v-pagination>
                </div>
              </template>
            </VDataTableServer>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <AddEditUserDialog v-model:is-dialog-visible="isAddUserDialogVisible" />
  </section>
</template>
