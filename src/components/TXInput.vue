<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { vMaska } from "maska";

import "../assets/css/build.css";

const emit = defineEmits(["update:modelValue", "onFocus", "onBlur", "onClick"]);
const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    validate?: any;
    submitted?: boolean;
    type?: "text" | "password" | "number";
    label?: string;
    icon?: string;
    disabled?: boolean;
    required?: boolean;
    isShowPassword?: boolean;
    mask?: string;
    texts: {
      validateRequired: string;
      validateEmail: string;
      validateStrongPassword: string;
    };
  }>(),
  {
    submitted: false,
    type: "text",
    disabled: false,
    isShowPassword: false,
  }
);
const inputValue = ref();
const acitve = ref(false);
const runFocus = (event: FocusEvent) => {
  acitve.value = true;
  emit("onFocus", event);
};

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
  }
);
watch(inputValue, (val) => {
  emit("update:modelValue", val);
});
watch(
  () => props.submitted,
  () => {
    props?.validate?.$touch();
  }
);

onBeforeMount(() => {
  if (props.modelValue) {
    inputValue.value = props.modelValue;
  }
});
</script>

<template>
  <label class="tx-field">
    <span v-if="props.required && props.label">{{ props.label }}</span>
    <div v-if="!props.required && props.label">{{ props.label }}</div>
    <i
      :class="[
        icon,
        { 'tx-cursor-pointer hover:tx-text-primary': props.isShowPassword },
      ]"
    />
    <i
      class="tx-hidden bi bi-x tx-cursor-pointer hover:tx-text-primary"
      :style="{ right: `${props.icon ? 35 : 12}px` }"
    />
    <input
      v-model="inputValue"
      :class="[{ 'tx-pr-14': props.icon, 'tx-pr-7': !props.icon }]"
      :type="type"
      autocomplete="off"
      :disabled="disabled"
      v-maska
      v-bind="
        Object.assign(
          validate?.minLength
            ? { minlength: validate?.minLength.$params.min }
            : {},
          validate?.maxLength
            ? { maxlength: validate?.maxLength.$params.max }
            : {},
          validate?.minValue ? { min: validate?.minValue.$params.min } : {},
          validate?.maxValue ? { max: validate?.maxValue.$params.max } : {},
          props.mask ? { 'data-maska': props.mask } : {}
        )
      "
      @focus="runFocus"
      @blur="emit('onBlur', $event)"
      @click="emit('onClick', $event)"
    />
    <div
      class="tx-mt-1 tx-px-2 tx-min-h-[20px] tx-flex tx-flex-col tx-gap-y-2 tx-text-xs tx-font-extralight tx-text-red-700"
    >
      <div class="tx-hidden">{{ props.texts.validateRequired }}</div>
      <div class="tx-hidden">{{ props.texts.validateEmail }}</div>
      <div class="tx-hidden">{{ props.texts.validateStrongPassword }}</div>
    </div>
  </label>
</template>
