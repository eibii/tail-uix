<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

defineEmits(["update:modelValue"]);
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    disabled?: boolean;
    isShowPassword?: boolean;
    isError?: boolean;
    msgError?: string;
    noValidate?: boolean;
  }>(),
  {
    disabled: false,
  }
);
const field = ref();

onBeforeMount(() => {
  if (props.modelValue) {
    field.value = props.modelValue;
  }
});
</script>

<template>
  <div class="tx-field">
    <div class="tx-flex tx-items-center tx-gap-2">
      <label class="tx-check">
        <input
          v-model="field"
          :class="[{ 'tx-error': props.isError }]"
          type="checkbox"
          :disabled="props.disabled"
          @input="(ev: any) => $emit('update:modelValue', ev?.target?.value)"
        />
        <i class="bi bi-check" />
      </label>
      <span v-if="props.label" class="text-xs font-extralight">{{
        props.label
      }}</span>
    </div>
    <div
      v-if="$slots.validate"
      class="mt-1 px-2 min-h-[20px] flex flex-col gap-y-2 text-xs font-extralight text-red-700"
    >
      <slot name="validate" />
    </div>
  </div>
</template>
