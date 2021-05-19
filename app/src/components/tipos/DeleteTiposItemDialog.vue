<template>
  <q-dialog ref="DeleteTiposItemDialog" @hide="onDialogHide">
		<q-card class="DeleteTiposItemDialog" >
        <q-card-section class="row items-center q-pb-none">
          <div class="DeleteTiposItemDialog__title">Eliminar categoría</div>
          <q-space />
          <q-btn icon="close" color="red-lips" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <p>
            ¿Estás seguro de querer eliminar esta categoría? Ya no habría vuelta atrás si la eliminas.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="DeleteTiposItemDialog__btn"
            label="Cancelar"
            color="gray"
            :disable="loading"
            outline
            v-close-popup
          />
          <q-btn
            @click="onDeleteItem"
            class="DeleteTiposItemDialog__btn"
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
  name: 'DeleteTiposItemDialog',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.DeleteTiposItemDialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.DeleteTiposItemDialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onDeleteItem () {
      this.loading = true
      
      this.$axios
        .delete('borrarTipo/' + this.item._id).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: `Imagen eliminada.`
            })
            this.$emit('ok')
            this.hide()
          } else {
            this.$q.notify({
              type: 'negative',
              message: `Oops, algo salió mal. Intenta otra vez.`
            })
          }
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$q.notify({
            type: 'negative',
            message: `Oops, algo salió mal. Intenta otra vez.`
          })
        });
    }
  }
}
</script>

<style lang="scss">
// $
.DeleteTiposItemDialog{
  padding: 24px;
  min-width: 90vw;

  @media (min-width: $breakpoint-md-min) {
    padding: 28px 30px;
    min-width: 600px;
  }
  .DeleteTiposItemDialog__title {
    @include font(24px, bold, $primary);
  }

  p {
    font-size: 16px;
  }

  .DeleteTiposItemDialog__btn {
    border-radius: 10px;
    letter-spacing: 1px;
    min-width: 200px;
    font-size: 15px;
  }
}
</style>
