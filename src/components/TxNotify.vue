<script setup lang="ts">
import type { NotifyMessage } from "../@types";

import * as _ from "lodash-es";

import TxNotifyMessage from "./TxNotifyMessage.vue";

const emit = defineEmits(["onRemoveMessage"]);
const props = defineProps<{ messages: NotifyMessage[] }>();
/**
 * Lida com a remoção de uma mensagem da lista de notificações.
 * @param {number} idx - O índice da mensagem a ser removida.
 */
const onRemoveMessage = (idx: number) => {
  if (_.isNumber(idx)) {
    emit("onRemoveMessage", idx);
  }
};
</script>

<template>
  <div
    class="tx-fixed tx-top-5 tx-right-5 tx-z-50 tx-flex tx-flex-col tx-gap-2"
  >
    <XyzTransition-group appear xyz="fade right-100 back-5">
      <template v-for="(message, i) in props.messages" :key="i">
        <TxNotifyMessage
          v-if="message"
          :message="message"
          :idx="i"
          @onRemoveMessage="onRemoveMessage"
        />
      </template>
    </XyzTransition-group>
  </div>
</template>
