<script setup lang="ts">
import { usePermissionsStore } from '@/stores/usePermissionsStore';
import { useUsersStore } from '@/stores/useUsersStore';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import { VForm } from 'vuetify/components/VForm';

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

const usersStore = useUsersStore()
const permissionsStore = usePermissionsStore()
const form = reactive<any>({
  password: '',
  password_confirmation: ''
})

const rules = {
  name: { required },
  email: { required, email },
  password: {
    required,
    minLength: minLength(8)
  },
  password_confirmation: {
    required,
    minLength: minLength(8),
    sameAs: sameAs(computed(() => form.password))
  }
}
const statuses = [{
  key: 'active',
  value: 'Active'
}, {
  key: 'inactive',
  value: 'Inactive'
}]

const v$ = useVuelidate(rules, form)

const handleSubmit = async () => {
  const result = await v$.value.$validate()

  if (result) {
    await usersStore.storeUser(form)
  }
}

const closeDialog = () => emit('update:isDialogVisible', false)

watch(
  props,
  () => {
    form.name = usersStore.isUserSelected ? usersStore.selectedUser.name : ''
    form.email = usersStore.isUserSelected ? usersStore.selectedUser.email : ''
    form.status = usersStore.isUserSelected ? usersStore.selectedUser.status : 'active'
    form.roles = usersStore.isUserSelected ? usersStore.selectedUser.roles.map((r: any) => r.id) : []
  },
  { deep: true },
)

onMounted(async () => await permissionsStore.getRoles())
</script>

<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 900" :model-value="isDialogVisible"
    @update:model-value="closeDialog">
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="closeDialog" />

    <VCard class="pa-sm-8 pa-5">
      <!-- Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h4 mb-3"> {{ false ? 'Edit' : 'Add New' }} User </VCardTitle>
        <p class="text-base mb-0">Set User Details</p>
      </VCardItem>

      <VCardText class="mt-6">
        <!-- Form -->
        <VForm @submit.prevent="handleSubmit">
          <VRow>
            <!-- Name -->
            <VCol cols="6">
              <AppTextField class="mb-2" v-model="form.name" label="Name" placeholder="Enter Name"
                :message="v$?.name?.$errors[0]?.$message" />
            </VCol>

            <!-- Email -->
            <VCol cols="6">
              <AppTextField class="mb-2" v-model="form.email" label="Email" placeholder="Enter Email" type="email"
                :message="v$?.email?.$errors[0]?.$message" />
            </VCol>

            <!-- Password -->
            <VCol cols="6">
              <AppTextField class="mb-2" v-model="form.password" label="Password" placeholder="Enter Password"
                type="password" :message="v$?.password?.$errors[0]?.$message" />
            </VCol>

            <!-- Password Confirmation -->
            <VCol cols="6">
              <AppTextField class="mb-2" v-model="form.password_confirmation" label="Password Confirmation"
                placeholder="Enter Password Confirmation" type="password"
                :message="v$?.password_confirmation?.$errors[0]?.$message" />
            </VCol>

            <!-- Status -->
            <VCol cols="12">
              <AppSelect v-model="form.status" label="Status" :items="statuses" item-value="key" item-title="value"
                :menu-props="{ maxHeight: 200 }" />
            </VCol>

            <!-- Roles -->
            <VCol cols="12">
              <VLabel>Roles</VLabel>
              <VRow>
                <VCol cols="4" v-for="role in permissionsStore.roles" :key="`role-${role.id}`">
                  <VCheckbox v-model="form.roles" :label="role.formatted_name" :value="role.id" dense>
                  </VCheckbox>
                </VCol>
              </VRow>
            </VCol>

            <!-- Actions button -->
            <div class="d-flex align-center justify-center gap-3 mt-6">
              <SubmitButton :block="false" :loading="false"></SubmitButton>

              <VBtn color="secondary" variant="tonal" @click="closeDialog">
                Cancel
              </VBtn>
            </div>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
