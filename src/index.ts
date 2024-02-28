import type { App } from "vue";

import TXInput from "./components/TXInput.vue";
// exportação padrão com instalação automática
export default {
  install(app: App): void {
    app.component("TXInput", TXInput);
  },
};
// exportação individual
export { TXInput };
