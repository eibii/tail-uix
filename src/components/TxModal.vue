<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";

import TxButton from "./TxButton.vue";

const emit = defineEmits(["update:modelValue"]);
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    btnYes?: string;
    btnNo?: string;
  }>(),
  {}
);
const show = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    show.value = val;
  }
);
watch(show, (val) => {
  emit("update:modelValue", val);
});

onBeforeMount(() => {
  if (props.modelValue) {
    show.value = props.modelValue;
  }
});
</script>

<template>
  <XyzTransition appear xyz="fade big">
    <div
      v-if="show"
      tabindex="-1"
      class="fixed top-0 left-0 right-0 z-50 flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center"
    >
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative rounded-lg shadow bg-dark-50">
          <div
            class="flex items-center justify-between p-5 border-b rounded-t border-light-900"
          >
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
              <slot name="header" />
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="small-modal"
              @click="show = !show"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="p-6 space-y-6">
            <slot name="body" />
          </div>
          <div
            class="flex items-center p-6 space-x-2 border-t rounded-b border-light-900"
          >
            <TxButton v-if="props.btnYes" isAction :label="props.btnYes" />
            <TxButton
              v-if="props.btnNo"
              :label="props.btnNo"
              @click="show = !show"
            />
          </div>
        </div>
      </div>
    </div>
  </XyzTransition>
</template>
