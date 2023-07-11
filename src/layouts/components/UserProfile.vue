<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import avatar1 from '@images/avatars/avatar-1.png';

const auth = useAuthStore()

const handleLogout = async () => await auth.logout()
</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold"> {{ auth?.user?.name }} </VListItemTitle>
            <VListItemSubtitle>{{ auth?.user?.top_role }}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <VListItem to="/admin/users" link>
            <template #prepend>
              <VIcon class="me-2" icon="mdi-account-multiple-outline" size="22" />
            </template>

            <VListItemTitle>Manage Users</VListItemTitle>
          </VListItem>

          <VListItem to="/admin/permissions" link>
            <template #prepend>
              <VIcon class="me-2" icon="mdi-security" size="22" />
            </template>

            <VListItemTitle>Manage Permissions</VListItemTitle>
          </VListItem>

          <VListItem to="/admin/settings" link>
            <template #prepend>
              <VIcon class="me-2" icon="mdi-cog-outline" size="22" />
            </template>

            <VListItemTitle>Profile Settings</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template #prepend>
              <VIcon class="me-2" icon="mdi-logout" size="22" />
            </template>

            <VListItemTitle @click="handleLogout">Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
