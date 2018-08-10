<template>
  <v-snackbar
      v-model="isModal"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      color="success"
    >
      {{ modalText }}
      <v-btn
        color="white"
        flat
        @click="closeModal"
      >
        Close
      </v-btn>
  </v-snackbar>
</template>

<script>
import Constant from "../../constant.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      y: "top",
      x: null,
      mode: "",
      timeout: 10000
    };
  },
  computed: mapState(["isModal", "modalText"]),
  updated() {
    setTimeout(this.closeModal, 3000);
  },
  methods: {
    closeModal() {
      this.$store.commit(Constant.SHOW_MODAL, {
        isModal: false,
        modalText: ""
      });
    }
  }
};
</script>

<style scoped>
</style>
