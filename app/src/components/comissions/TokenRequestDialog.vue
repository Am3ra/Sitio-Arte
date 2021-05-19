<template>
  <q-dialog
    ref="TokenRequestDialog"
    class="TokenRequestDialog"
    @hide="onDialogHide"
    persistent
  >
    <q-card class="TokenRequestDialog" style="min-width: 350px">
      <q-card-section>
        <div class="TokenRequestDialog-title">Your Token</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="token"
          autofocus
          @keyup.enter="prompt = false"
          label="Token"
		  outlined
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn class="TokenRequestDialog-btn" label="Cancel" color="gray" outline v-close-popup />
        <q-btn class="TokenRequestDialog-btn " @click="processToken" label="Submit" color="primary" type="submit" unelevated v-close-popup />
      </q-card-actions>
	</q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "TokenRequestDialog",
  data() {
    return {
      token: "",
    };
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.TokenRequestDialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.OrderSuccessDialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    processToken() {
		this.$emit("ok",this.token);
	},
  },
};
</script>

<style lang="scss">
// $
.TokenRequestDialog-title{
	@include font(24px, bold, $primary);
}

.TokenRequestDialog-btn {
    border-radius: 10px;
    letter-spacing: 1px;
    min-width: 48%;
    font-size: 16px;
  }

</style>
