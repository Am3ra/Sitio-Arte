<template>
  <q-dialog ref="ModifyPortfolioItemDialog" @hide="onDialogHide">
		<q-card class="ModifyPortfolioItemDialog" >
        <q-card-section class="row items-center q-pb-none">
          <div class="ModifyPortfolioItemDialog__title">Modificar categoría</div>
          <q-space />
          <q-btn icon="close" color="red-lips" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="onFormSubmit">
            
            <q-img class="ModifyPortfolioItemDialog__thumbnail" v-if="item.img" :src="item.img" />

            <q-input
              class="Form__field"
              v-model="name"
              name="name"
              id="name"
              type="text"
              label="Nombre de categoría"
              :rules="[val => !!val || 'Campo requerido']"
              :disable="loading"
              outlined
            />

            <q-input
              class="Form__field"
              v-model="description"
              name="description"
              id="description"
              type="textarea"
              label="Descripción"
              :rules="[val => !!val || 'Campo requerido']"
              :disable="loading"
              outlined
            />

            <q-input
              class="Form__field"
              v-model="price"
              name="price"
              id="price"
              type="text"
              label="Precio base"
              :rules="[val => !!val || 'Campo requerido']"
              :disable="loading"
              outlined
            />

            <div class="row justify-between q-mt-lg">
              <q-btn v-close-popup class="ModifyPortfolioItemDialog__btn" label="Cancelar" color="gray" :disable="loading" outline/>
              <q-btn class="ModifyPortfolioItemDialog__btn" type="submit" label="Guardar" color="primary" :loading="loading" unelevated/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ModifyPortfolioItemDialog',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      name: this.item.name || null,
      description: this.item.description || null,
      price: this.item.precioBase || null,

      loading: false
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.ModifyPortfolioItemDialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.ModifyPortfolioItemDialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onFormSubmit () {
      this.loading = true

      const values = {
        name: this.name,
        description: this.description,
        precioBase: this.price,
      }

      this.$axios
        .patch('modificarTipo/' + this.item._id, values).then((response) => {
          if (response.status === 202) {
            this.$q.notify({
              type: 'positive',
              message: `Cambios guardados.`
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
    },
    
    urlFromFile () {
      if(FileReader && this.file) {
        const reader = new FileReader()
        reader.onload = () => {
          this.file_url = reader.result
        }

        reader.readAsDataURL(this.file)
      }
    },

    onRejected () {
      this.$q.notify({
        type: 'negative',
        message: "Archivo inválido"
      })
    }
  },
  computed: {
    thumbnail: function () { return this.file_url || this.item.img }
  }
}
</script>

<style lang="scss">
// $
.ModifyPortfolioItemDialog{
  padding: 25px 24px;
  min-width: 90vw;

  @media (min-width: $breakpoint-md-min) {
    padding: 20px 30px;
    min-width: 600px;
  }
  .ModifyPortfolioItemDialog__title {
    @include font(24px, bold, $primary);
  }

  .ModifyPortfolioItemDialog__thumbnail {
    height: 200px;
    width: 100%;
    margin-bottom: 20px;
  }

  .ModifyPortfolioItemDialog__btn {
    border-radius: 10px;
    letter-spacing: 1px;
    min-width: 48%;
    font-size: 16px;
  }
}
</style>
