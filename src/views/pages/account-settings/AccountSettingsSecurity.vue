<script lang="ts" setup>
const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('12345678')
const newPassword = ref('87654321')
const confirmPassword = ref('87654321')

const passwordRequirements = [
  'Minimum 8 characters long - the more, the better',
  'At least one lowercase character',
  'At least one number, symbol, or whitespace character',
]

const recentDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'mdi-microsoft-windows', color: 'primary' },
  },
  {
    browser: 'Chrome on iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'mdi-cellphone', color: 'error' },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'mdi-android', color: 'success' },
  },
  {
    browser: 'Chrome on MacOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'mdi-apple', color: 'secondary' },
  },
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'mdi-microsoft-windows', color: 'primary' },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'mdi-android', color: 'success' },
  },
]
</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Change Password">
        <VForm>
          <VCardText>
            <!-- Current Password -->
            <VRow class="mb-3">
              <VCol cols="12" md="6">
                <!-- current password -->
                <VTextField v-model="currentPassword" :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  label="Current Password" @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible" />
              </VCol>
            </VRow>

            <!-- New Password -->
            <VRow>
              <VCol cols="12" md="6">
                <!-- new password -->
                <VTextField v-model="newPassword" :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  label="New Password" @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible" />
              </VCol>

              <VCol cols="12" md="6">
                <!-- confirm password -->
                <VTextField v-model="confirmPassword" :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  label="Confirm New Password"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible" />
              </VCol>
            </VRow>
          </VCardText>

          <!-- Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">Password Requirements:</p>

            <ul class="d-flex flex-column gap-y-3">
              <li v-for="item in passwordRequirements" :key="item" class="d-flex">
                <div>
                  <VIcon size="7" icon="mdi-circle" class="me-3" />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn>Save changes</VBtn>

            <VBtn type="reset" color="secondary" variant="tonal">
              Reset
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Two-steps verification -->
    <VCol cols="12">
      <VCard title="Two-steps verification">
        <VCardText>
          <p class="font-weight-semibold">Two factor authentication is not enabled yet.</p>
          <p>
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a
            password to log in.
            <a href="javascript:void(0)" class="text-decoration-none">Learn more.</a>
          </p>

          <VBtn> Enable two-factor authentication </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <!-- Table -->
      <VCard title="Recent Devices">
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">BROWSER</th>
              <th scope="col">DEVICE</th>
              <th scope="col">LOCATION</th>
              <th scope="col">RECENT ACTIVITIES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="device in recentDevices" :key="device.recentActivity">
              <td>
                <VIcon start :icon="device.deviceIcon.icon" :color="device.deviceIcon.color" />
                {{ device.browser }}
              </td>
              <td>{{ device.device }}</td>
              <td>{{ device.location }}</td>
              <td>{{ device.recentActivity }}</td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
