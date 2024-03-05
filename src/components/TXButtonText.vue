<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    icon?: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);
</script>

<template>
  <button
    type="button"
    class="tx-custom-button-text flex justify-center"
    :disabled="props.disabled"
  >
    <div class="flex gap-2 self-center">
      <span>{{ props.label }}</span>
      <i v-if="props.icon" :class="props.icon" />
    </div>
  </button>
</template>
