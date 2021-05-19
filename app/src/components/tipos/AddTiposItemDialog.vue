<template>
  <q-dialog ref="AddTiposItemDialog" @hide="onDialogHide">
		<q-card class="AddTiposItemDialog" >
        <q-card-section class="row items-center q-pb-none">
          <div class="AddTiposItemDialog__title">Agregar categoría</div>
          <q-space />
          <q-btn icon="close" color="red-lips" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="onFormSubmit">
            
            <q-img class="AddTiposItemDialog__thumbnail" v-if="file_url" :src="file_url" />

            <q-file
              class="Form__field"
              v-model="file"
              @input="urlFromFile"
              name="file"
              id="file"
              label="Sube un archivo"
              outlined
              accept=".jpg, .png, image/*"
              @rejected="onRejected"
              :rules="[val => !!val || 'Campo requerido']"
              :disable="loading"
            >
              <template v-slot:prepend>
                <q-avatar>
                  <q-icon name="attach_file" />
                </q-avatar>
              </template>
            </q-file>

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

            <div class="text-right">
              <q-btn class="AddTiposItemDialog__btn" type="submit" label="Agregar" color="primary" :loading="loading" unelevated/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'AddTiposItemDialog',
  data () {
    return {
      file: null,
      file_url: null,

      name: null,
      description: null,
      price: null,

      loading: false,
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.AddTiposItemDialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.AddTiposItemDialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onFormSubmit () {

      this.loading = true;

      const formData = new FormData();
      formData.append('img', this.file);
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('precioBase', this.price);

      this.$axios
        .post(
          "/crearTipo",
          formData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          if (response.status === 201) {
            this.$q.notify({
              type: 'positive',
              message: `Categoría creada exitosamente.`
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
  }
}
</script>

<style lang="scss">
// $
.AddTiposItemDialog{
  padding: 30px 24px;
  min-width: 90vw;

  @media (min-width: $breakpoint-md-min) {
    padding: 40px 30px;
    min-width: 600px;
  }
  .AddTiposItemDialog__title {
    @include font(24px, bold, $primary);
  }

  .AddTiposItemDialog__thumbnail {
    height: 200px;
    width: 100%;
    margin-bottom: 20px;
  }

  .AddTiposItemDialog__btn {
    border-radius: 10px;
    letter-spacing: 1px;
    min-width: 200px;
    font-size: 16px;
  }
}
</style>
