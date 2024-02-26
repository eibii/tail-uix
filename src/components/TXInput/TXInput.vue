<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { vMaska } from "maska";

const emit = defineEmits(["update:modelValue", "onFocus", "onBlur", "onClick"]);
const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    validate?: any;
    submitted?: boolean;
    type: "text" | "password" | "number";
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
  <label class="field">
    <span v-if="props.required && props.label">{{ props.label }}</span>
    <div v-if="!props.required && props.label">{{ props.label }}</div>
    <i
      :class="[
        icon,
        { 'cursor-pointer hover:text-primary': props.isShowPassword },
      ]"
    />
    <i
      class="hidden bi bi-x cursor-pointer hover:text-primary"
      :style="{ right: `${props.icon ? 35 : 12}px` }"
    />
    <input
      v-model="inputValue"
      :class="[{ 'pr-14': props.icon, 'pr-7': !props.icon }]"
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
      class="mt-1 px-2 min-h-[20px] flex flex-col gap-y-2 text-xs font-extralight text-red-700"
    >
      <div class="hidden">{{ props.texts.validateRequired }}</div>
      <div class="hidden">{{ props.texts.validateEmail }}</div>
      <div class="hidden">{{ props.texts.validateStrongPassword }}</div>
    </div>
  </label>
</template>
