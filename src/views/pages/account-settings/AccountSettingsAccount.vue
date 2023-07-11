<script lang="ts" setup>
import { useAuthStore } from '@/stores/useAuthStore';
import avatar1 from '@images/avatars/avatar-1.png';

const { user } = useAuthStore()
const isAccountDeactivated = ref(false)
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <!-- Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="avatar1" />
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="user.name" label="Name" />
              </VCol>

              <!-- Email -->
              <VCol md="6" cols="12">
                <VTextField v-model="user.email" label="Email" type="email" />
              </VCol>

              <!-- Email Verified On -->
              <VCol md="6" cols="12">
                <VTextField v-model="user.email" label="Email" type="email" />
              </VCol>

              <!-- Organization -->
              <VCol cols="12" md="6">
                <VTextField label="Organization" value="" />
              </VCol>

              <!-- Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn disabled>Save changes</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- Deactivate Account -->
      <VCard title="Deactivate Account">
        <VCardText>
          <div>
            <VCheckbox v-model="isAccountDeactivated" label="I confirm my account deactivation" />
          </div>

          <VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3">
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
