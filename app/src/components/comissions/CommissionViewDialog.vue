<template>
  <q-dialog ref="CommissionViewDialog" @hide="onDialogHide">
    <q-card class="CommissionDetailView q-pb-lg q-px-lg">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" color="red-lips" flat round dense v-close-popup />
      </q-card-section>

      <!-- <q-separator></q-separator> -->

      <q-card-section horizontal>
        <q-card-section class="col-8">
          <div class="CommissionDetailView-Title">Commission Details</div>
          <div class="CommissionDetailView-Description-Title q-pt-md">
            Description
          </div>
          <p caption>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <q-card-section class="CommissionDetailView-Progress">
            <div>Progess:</div>
            <!-- <q-scroll-area
              horizontal
              class="CommissionDetailView-ProgressScroll"
            >
              <div class="try2 row no-wrap">
                <q-img
                  src="https://placeimg.com/500/300/nature"
                  spinner-color="white"
                  style="height: 140px; max-width: 150px"
                ></q-img>
                <q-img
                  src="https://placeimg.com/500/300/nature"
                  spinner-color="white"
                  style="height: 140px; max-width: 150px"
                ></q-img>
                <q-img
                  src="https://placeimg.com/500/300/nature"
                  spinner-color="white"
                  style="height: 140px; max-width: 150px"
                ></q-img>
              </div>
            </q-scroll-area> -->
            <q-scroll-area
              horizontal
              style="height: 210px; width: 100%"
              class="col bg-grey-1 rounded-borders"
            >
              <div class="row no-wrap">
                <div
                  v-for="n in 10"
                  :key="n"
                  style="width: 100%"
                  class="q-pa-md"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto fuga quae veritatis blanditiis sequi id expedita
                  amet esse aspernatur! Iure, doloribus!
                </div>
              </div>
            </q-scroll-area>
          </q-card-section>
          <q-card-section
            class="q-pa-md row justify-center CommissionDetailView-Chat"
          >
            <div style="width: 100%; max-width: 400px">
              <q-chat-message
                name="me"
                avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                :text="['hey, how\'s the commission going?']"
                sent
              />
              <q-chat-message
                name="Lele"
                avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                :text="['doing fine, it\'ll be ready soon!']"
              />
            </div>
            <q-input
              dense
              autofocus
              @keyup.enter="prompt = false"
              label="Send a message"
              outlined
              class="q-mt-lg"
            />
          </q-card-section>
        </q-card-section>

        <q-separator vertical></q-separator>

        <q-card-section class="col-4">
          Pedido el 3 de marzo 2021
          <br />
          Aceptado el 7 de marzo 2021
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "CommissionViewDialog",
  data() {
    return {
      token: "",
    };
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.CommissionViewDialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.CommissionViewDialog.hide();
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

.CommissionDetailView-Title {
  @include font(24px, bold, $primary);
}

.CommissionDetailView-btn {
  border-radius: 10px;
  letter-spacing: 1px;
  min-width: 48%;
  font-size: 16pnone;
}
.CommissionDetailView {
  min-width: 50vw;
}

.CommissionDetailView-Chat {
  background-color: rgb(241, 241, 241);
}

.CommissionDetailView-ProgressScroll {
  height: 100px;
  width: 100%;
  background-color: gray;
  .try2 {
    background-color: #fff;
    width: 100%;
    height: 100%;
  }
}
</style>