<template>
  <q-dialog ref="AddPortfolioItemDialog" @hide="onDialogHide">
    <q-card class="AddPortfolioItemDialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="AddPortfolioItemDialog__title">Agregar imagen</div>
        <q-space />
        <q-btn icon="close" color="red-lips" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form @submit="onFormSubmit">
          <q-img
            class="AddPortfolioItemDialog__thumbnail"
            v-if="file_url"
            :src="file_url"
          />

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
            :rules="[(val) => !!val || 'Campo requerido']"
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
            v-model="url"
            name="url"
            id="url"
            type="url"
            label="URL (Twitter, Instagram, ...)"
            :rules="[(val) => !!val || 'Campo requerido']"
            :disable="loading"
            outlined
          />
          <div class="text-right">
            <q-btn
              class="AddPortfolioItemDialog__btn"
              type="submit"
              label="Agregar"
              color="primary"
              :loading="loading"
              unelevated
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "AddPortfolioItemDialog",
  data() {
    return {
      file: null,
      file_url: null,
      url: null,

      loading: false,
    };
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.AddPortfolioItemDialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.AddPortfolioItemDialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onFormSubmit() {
      this.loading = true;

      const formData = new FormData();
      formData.append("img", this.file);
      formData.append("link", this.url);

      this.$axios
        .post("/addImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            this.$q.notify({
              type: "positive",
              message: `Imagen agregada exitosamente.`,
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

    urlFromFile() {
      if (FileReader && this.file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.file_url = reader.result;
        };

        reader.readAsDataURL(this.file);
      }
    },

    onRejected() {
      this.$q.notify({
        type: "negative",
        message: "Archivo inválido",
      });
    },
  },
};
</script>

<style lang="scss">
// $
.AddPortfolioItemDialog {
  padding: 30px 24px;
  min-width: 90vw;

  @media (min-width: $breakpoint-md-min) {
    padding: 40px 30px;
    min-width: 600px;
  }
  .AddPortfolioItemDialog__title {
    @include font(24px, bold, $primary);
  }

  .AddPortfolioItemDialog__thumbnail {
    height: 200px;
    width: 100%;
    margin-bottom: 20px;
  }

  .AddPortfolioItemDialog__btn {
    border-radius: 10px;
    letter-spacing: 1px;
    min-width: 200px;
    font-size: 16px;
  }
}
</style>
