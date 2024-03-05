<script setup lang="ts">
import type { NotifyMessage } from "./@types";

import { ref, watch, onMounted } from "vue";

const emit = defineEmits(["onRemoveMessage"]);
const props = defineProps<{
  idx: number;
  message: NotifyMessage;
}>();
const percentAnimate = ref(0);
const percentPause = ref(0);
const isPaused = ref(false);
const rAFId = ref(0);
/**
 * Anima um valor de um valor inicial para um valor final durante uma duração especificada.
 *
 * @param {number} end - O valor final para animar.
 * @param {number} [start=0] - O valor inicial para animar a partir. Padrão é 0.
 * @param {number} [duration=1000] - A duração da animação em milissegundos. Padrão é 1000ms.
 */
const animateValue = (end: number, start = 0, duration = 1000) => {
  let startTimestamp: any = null;
  const step = (timestamp: any) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    percentAnimate.value = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      rAFId.value = window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
/**
 * Lida com a remoção de uma mensagem da lista de notificações.
 * @param {number} idx - O índice da mensagem a ser removida.
 */
const onRemoveMessage = (idx: number) => {
  emit("onRemoveMessage", idx);
};
// Observa as mudanças na porcentagem
watch(percentAnimate, (val) => {
  if (val === 100) onRemoveMessage(props.idx);
});
// Controle da porcentagem ao passar o mouse por cima da notificação, pausando a animação
watch(isPaused, (val) => {
  if (val) {
    percentPause.value = percentAnimate.value;
    window.cancelAnimationFrame(rAFId.value);
  } else {
    const duration = props.message.duration || 1000;
    const percent = props.message.percent || 100;
    const percentTimeRemaining = 100 - percentPause.value;
    const uTime = duration / 100;
    animateValue(percent, percentPause.value, uTime * percentTimeRemaining);
  }
});

onMounted(() => {
  if (props.message.autoClose) {
    animateValue(props.message.percent || 100, 0, props.message.duration);
  }
});
</script>

<template>
  <div
    :class="`tx-notify tx-${message.status}`"
    @mouseleave="isPaused = false"
    @mouseover="isPaused = true"
  >
    <div
      class="tx-absolute tx-bottom-0 tx-left-0 h-1 tx-bg-black/30 tx-rounded-full"
      :style="{ width: `${percentAnimate}%` }"
    ></div>
    <!-- Botão de excluir -->
    <div class="tx-absolute tx-top-1 tx-right-1">
      <i class="tx-close" icon="bi bi-x-circle" @click="onRemoveMessage(idx)" />
    </div>
    <div class="tx-flex tx-gap-3">
      <!-- Ícone -->
      <div class="tx-flex-none tx-flex tx-items-center tx-text-4xl">
        <i
          :class="[
            {
              'tx-text-lime-900': message.status === 'success',
              'tx-text-red-900': message.status === 'danger',
              'tx-text-amber-900': message.status === 'warn',
              'tx-text-sky-900': message.status === 'info',
            },
          ]"
          icon="bi bi-exclamation-triangle"
        />
      </div>
      <div class="tx-flex-1 tx-flex tx-flex-col">
        <!-- Título -->
        <div class="tx-title">{{ message.title }}</div>
        <!-- Mensagem -->
        <div class="tx-message">
          {{ message.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.tx-notify
  @apply tx-relative tx-overflow-hidden tx-bg-lime-600/80 tx-border-[0.5px] tx-border-lime-600/80 tx-rounded-lg tx-backdrop-blur-lg tx-w-72 tx-p-2

  & .tx-close
    @apply tx-text-white/70 hover:tx-text-white tx-text-[14px] tx-cursor-pointer

  & .tx-title
    @apply tx-text-sm tx-font-bold tx-text-gray-100

  & .message
    @apply text-sm
.tx-danger
  @apply tx-bg-red-500/70 tx-border-red-500/80

.tx-warn
  @apply tx-bg-amber-500/70 tx-border-amber-500/80

.tx-info
  @apply tx-bg-sky-500/70 tx-border-sky-500/80
</style>
