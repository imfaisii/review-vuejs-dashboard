<script lang="ts" setup>
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
    default: false,
  },
  buttonText: {
    type: String,
    required: true,
    default: () => 'Submit',
  },
  block: {
    type: Boolean,
    required: false,
    default: () => true,
  },
})
</script>

<template>
  <v-btn
    :loading="loading"
    :disabled="loading"
    :block="block"
    type="submit"
  >
    <span v-if="!loading">{{ buttonText }}</span>
    <v-progress-circular
      v-else
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-btn>
</template>
