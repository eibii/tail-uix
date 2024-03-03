<script setup lang="ts">
const props = defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="flex gap-2">
    <svg class="spinner self-center" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
    <span v-if="props.text" class="self-center">{{ props.text }}</span>
  </div>
</template>

<style lang="sass" scoped>
.spinner
  animation: rotate 2s linear infinite
  width: 20px
  height: 20px

  & .path
    stroke: white
    stroke-linecap: round
    animation: dash 1.5s ease-in-out infinite

@keyframes rotate
  100%
    transform: rotate(360deg)

@keyframes dash
  0%
    stroke-dasharray: 1, 150
    stroke-dashoffset: 0

  50%
    stroke-dasharray: 90, 150
    stroke-dashoffset: -35

  100%
    stroke-dasharray: 90, 150
    stroke-dashoffset: -124
</style>