<template>
  <q-page class="OrderComission">
    <h1 class="SectionTitle">Ordenar nueva comision</h1>
    <q-form @submit="onSubmit" class="OrderComission__Form">
      <div class="FormSection">
        <h2 class="FormSection__title">About You</h2>
        <q-input
          class="Form__field"
          outlined
          v-model="name"
          label="Name or nickname (to know what to call you)"
          :rules="[(val) => !!val || 'This field is required']"
        />
        <div class="row q-col-gutter-x-lg">
          <q-select
            class="Form__field col-xs-12 col-md-6"
            outlined
            v-model="contact_type"
            :options="contact_options"
            label="Preferred means of contact"
            :rules="[(val) => !!val || 'This field is required']"
          />
          <q-input
            class="Form__field col-xs-12 col-md-6"
            outlined
            v-model="contact_username"
            label="Contact username (Discord, Twitter...)"
            :rules="[(val) => !!val || 'This field is required']"
          />
        </div>
      </div>
      <div class="FormSection">
        <h2 class="FormSection__title">About the Commission</h2>
        <div class="row q-col-gutter-x-lg">
          <q-select
            class="Form__field col-xs-12 col-md-6"
            outlined
            v-model="category"
            :options="category_options"
            :loading="category_options_loading"
            label="Type of commission"
            :rules="[(val) => !!val || 'This field is required.']"
          >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          </q-select>
        </div>
        <q-input
          class="Form__field"
          v-model="description"
          label="Please describe what you would like..."
          outlined
          type="textarea"
          :rules="[(val) => !!val || 'This field is required.']"
        />
      </div>

      <div class="FormSubmit">
        <q-btn
          type="submit"
          class="Form__btn"
          label="Order Commission"
          color="primary"
          :loading="loading"
          unelevated
        />
      </div>
    </q-form>
  </q-page>
</template>



<script>
export default {
  name: "OrderComission",
  mounted () {
    if (this.category_options.length <= 0) {
      this.$store.dispatch('types/loadTypes')
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: `Couldn't load commissions info. Try again later.`
          })
        })
    }
  },
  data: () => ({
    name: null,
    contact_type: null,
    contact_username: null,
    category: null,
    description: null,

    contact_options: ["Discord", "Instagram", "Twitter", "Correo"],

    loading: false,
  }),
  methods: {
    onSubmit() {
      this.loading = true;

      let req = {
        name: this.name,
        contact: this.contact_type,
        username: this.contact_username,
        tipo: this.category,
        description: this.description,
      };

      this.$axios
        .post("/crearComision", req)
        .then((response) => {
          let token = response.data?.token;
          if (!!token) {
            this.$q.dialog({
              component: () =>
                import("../components/comissions/OrderSuccessDialog.vue"),
              parent: this,
              confirmationCode: token,
            });
          } else {
            this.$q.notify({
              type: "negative",
              message: `Something went wrong, please try again later :c`,
            });
          }
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
          this.loading = false;
          this.$q.notify({
            type: "negative",
            message: `Something went wrong, please try again later :c`,
          });
        });
    },
  },
  computed: {
    category_options_loading () {
      return this.$store.state.types.loading
    },
    category_options () {
      return this.$store.getters['types/typesAsListOfStrings']
    }
  }
};
</script>

<style lang="scss">
// $
.OrderComission {
  @include content-width;
  padding: 30px 20px;
}

.OrderComission__Form {
  margin-bottom: 50px;
}

.FormSection {
  margin-bottom: 30px;
}

.FormSection__title {
  @include font(18px, bold, $gray);
  margin: 0 0 5px;
}

.Form__field {
  margin-bottom: 20px;
  .q-field__control {
    border-radius: 10px;
  }
}
.FormSubmit {
  text-align: right;
}

.Form__btn {
  width: 100%;
  letter-spacing: 1px;
  border-radius: 10px;
  font-size: 16px;
  @media (min-width: $breakpoint-md-min) {
    width: 47%;
  }
}
</style>
