<script setup lang="ts">
import { usePermissionsStore } from '@/stores/usePermissionsStore'
import { capitalizeFirstLetter } from '@/utils/useString'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { VForm } from 'vuetify/components/VForm'

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
}

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: () => false,
  },
})

const emit = defineEmits<Emit>()

const panel = ref(0)
const refPermissionForm = ref<VForm>()
const permissionsStore = usePermissionsStore()
const form = reactive<any>({})

const rules = {
  name: { required },
}

const v$ = useVuelidate(rules, form)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    permissionsStore.isRoleSelected ? await permissionsStore.updateRole(form) : await permissionsStore.storeRole(form)
    emit('update:isDialogVisible', false)
  }
}

const closeDialog = () => emit('update:isDialogVisible', false)

watch(
  props,
  () => {
    form.name = permissionsStore.isRoleSelected ? permissionsStore.selectedRole.name : ''
    form.permissions = permissionsStore.isRoleSelected
      ? permissionsStore.selectedRole.permissions.map((p: any) => p.id)
      : []
  },
  { deep: true },
)

onMounted(async () => await permissionsStore.getPermissions())
</script>

<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 900" :model-value="isDialogVisible"
    @update:model-value="closeDialog">
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="closeDialog" />

    <VCard class="pa-sm-8 pa-5">
      <!-- Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h4 mb-3"> {{ permissionsStore.isRoleSelected ? 'Edit' : 'Add New' }} Role </VCardTitle>
        <p class="text-base mb-0">Set Role Permissions</p>
      </VCardItem>

      <VCardText class="mt-6">
        <!-- Form -->
        <VForm @submit.prevent="handleSubmit" ref="refPermissionForm">
          <!-- Role name -->
          <AppTextField v-model="form.name" label="Role Name" placeholder="Enter Role Name"
            :message="v$?.name?.$errors[0]?.$message" />

          <VRow class="text-layout">
            <VCol cols="6" class="text-left">
              <h6 class="text-h5 mt-8 mb-3">Role Permissions</h6>
            </VCol>
            <VCol cols="6" class="text-right">
              <h6 v-if="form.permissions.length > 0" class="text-sm mt-10 mb-3 font-weight-medium">
                Selected Permissions: {{ form.permissions.length }}
              </h6>
            </VCol>
          </VRow>

          <!-- Permissions -->
          <VExpansionPanels v-model="panel" class="no-icon-rotate">
            <VExpansionPanel v-for="(permissionModule, idx) in permissionsStore.permissions" :key="`module-${idx}`">
              <VExpansionPanelTitle disable-icon-rotate>{{ capitalizeFirstLetter(permissionModule.name) }}
                <template #actions>
                  <VIcon size="18" icon="tabler-alert-circle" color="primary" />
                </template>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VRow>
                  <VCol cols="4" md="3" v-for="permission in permissionModule.submodules" :key="permission">
                    <VCheckbox v-model="form.permissions" :label="permission.name" :value="permission.id" dense>
                    </VCheckbox>
                  </VCol>
                </VRow>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>

          <!-- Actions button -->
          <div class="d-flex align-center justify-center gap-3 mt-6">
            <SubmitButton :block="false" :loading="permissionsStore.isLoading"></SubmitButton>

            <VBtn color="secondary" variant="tonal" @click="closeDialog">
              Cancel
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
