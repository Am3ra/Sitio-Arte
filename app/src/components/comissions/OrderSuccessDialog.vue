<template>
  <q-dialog
    ref="OrderSuccessDialog"
    class="OrderSuccessDialog"
    @hide="onDialogHide"
    persistent
  >
    <div class="OrderSuccessDialog__content">
      <q-img
        class="OrderSuccessDialog__image"
        src="~assets/images/order_success.png"
        alt="Commission request submitted"
      />
      <h2 class="OrderSuccessDialog__title">
        Your commision request has been submitted
      </h2>
      <p>
        Your request will be reviewed, and you will be notified of any question
        or detail.
      </p>
      <p>
        Please store the following <strong>access token</strong> in order to be
        able to follow-up on your comssion request in the Active Comission
        section
      </p>
      <h3 class="OrderSuccessDialog__confirmationCode">
        {{ confirmationCode }}
      </h3>
      <q-btn
        v-close-popup
        to="/comisiones/board"
        class="OrderSuccessDialog__btn"
        label="go to active commissions"
        unelevated
        color="primary"
      />
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: "OrderSuccessDialog",
  props: {
    confirmationCode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      state: "initial",
      email: null,
    };
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.OrderSuccessDialog.show();
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
  },
};
</script>

<style lang="scss">
// $
.OrderSuccessDialog {
  .OrderSuccessDialog__content {
    background-color: white;
    border-radius: 15px;
    padding: 45px 30px 50px;
    text-align: center;
    width: 600px;
    max-width: 80vw;

    @media (min-width: $breakpoint-md-min) {
      padding: 50px 50px 58px;
    }
  }

  .OrderSuccessDialog__image {
    width: 40%;
  }

  .OrderSuccessDialog__title {
    @include font(24px, bold, $primary);
    margin-bottom: 10px;
    @media (min-width: $breakpoint-md-min) {
      font-size: 26px;
    }
  }

  p {
    font-size: 14px;
  }

  .OrderSuccessDialog__confirmationCode {
    @include font(26px, bold, $gray);
    margin: 10px 0 35px;
    @media (min-width: $breakpoint-md-min) {
      font-size: 28px;
    }
  }

  .OrderSuccessDialog__btn {
    border-radius: 10px;
    letter-spacing: 1px;
  }
}
</style>
