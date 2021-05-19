<template>
  <q-dialog ref="DeletePortfolioItemDialog" @hide="onDialogHide">
    <q-card class="DeletePortfolioItemDialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="DeletePortfolioItemDialog__title">Eliminar imagen</div>
        <q-space />
        <q-btn icon="close" color="red-lips" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <p>
          ¿Estás seguro de querer eliminar esta imagen de tu portafolio? Ya no
          habría vuelta atrás si la eliminas.
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          class="DeletePortfolioItemDialog__btn"
          label="Cancelar"
          color="gray"
          :disable="loading"
          outline
          v-close-popup
        />
        <q-btn
          @click="onDeleteItem"
          class="DeletePortfolioItemDialog__btn"
          label="Eliminar"
          color="red-lips"
          :loading="loading"
          unelevated
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "DeletePortfolioItemDialog",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.DeletePortfolioItemDialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.DeletePortfolioItemDialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onDeleteItem() {
      this.loading = true;

      this.$axios
        .delete("borrarImagen/" + this.item._id)
        .then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: "positive",
              message: `Imagen eliminada.`,
            });
            this.$emit("ok");
            this.hide();
          } else {
            this.$q.notify({
              type: "negative",
              message: `Oops, algo salió mal. Intenta otra vez.`,
            });
          }
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$q.notify({
            type: "negative",
            message: `Oops, algo salió mal. Intenta otra vez.`,
          });
        });
    },
  },
};
</script>

<style lang="scss">
// $
.DeletePortfolioItemDialog {
  padding: 24px;
  min-width: 90vw;

  @media (min-width: $breakpoint-md-min) {
    padding: 28px 30px;
    min-width: 600px;
  }
  .DeletePortfolioItemDialog__title {
    @include font(24px, bold, $primary);
  }

  p {
    font-size: 16px;
  }

  .DeletePortfolioItemDialog__btn {
    border-radius: 10px;
    letter-spacing: 1px;
    min-width: 200px;
    font-size: 15px;
  }
}
</style>
