<script setup lang="ts">
import { TxLoading } from "./";

const props = withDefaults(
  defineProps<{
    type: "button" | "submit";
    label?: string;
    icon?: string;
    isAction?: boolean;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
  }>(),
  {
    type: "button",
    disabled: false,
    loading: false,
    isAction: false,
  }
);
</script>

<template>
  <button
    :type="props.type"
    :class="[
      'tx-custom-button tx-flex tx-justify-center',
      { action: isAction },
    ]"
    :disabled="disabled || loading"
  >
    <div class="tx-flex tx-gap-2 tx-self-center">
      <TxLoading v-if="props.loading" :text="props.loadingText" />
      <span v-if="!props.loading && props.label">{{ props.label }}</span>
      <i v-if="props.icon" :class="props.icon" />
    </div>
  </button>
</template>
.
.