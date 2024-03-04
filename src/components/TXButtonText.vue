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
    class="tx-custom-button-text tx-flex tx-justify-center"
    :disabled="props.disabled"
  >
    <div class="tx-flex tx-gap-2 tx-self-center">
      <span>{{ props.label }}</span>
      <i v-if="props.icon" :class="props.icon" />
    </div>
  </button>
</template>
