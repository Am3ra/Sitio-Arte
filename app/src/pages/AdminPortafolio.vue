<template>
  <q-page class="AdminPortafolio">
    <h1 class="AdminPortafolio__title">Portafolio</h1>
    <div class="text-right AdminPortafolio__actions">
      <q-btn @click="onAddNewImage" class="AdminPortafolio__btn" label="Subir nueva imágen" color="primary" no-caps unelevated/>
    </div>
    <div v-if="!!error" class="text-center">
      <h2 class="AdminPortfolio__error">{{ error }}</h2>
    </div>
    <div v-else-if="!!loading" class="text-center">
      <q-spinner size="40px" color="primary" />
    </div>
    <div v-else class="AdminPortafolio__list row q-col-gutter-md">
      <div class="col-xs-12 col-sm-4 col-md-3" v-for="item in portfolio" :key="item._id">
        <PortfolioAdminItem :item="item" @reload-portfolio="loadPortfolio" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AdminPortafolio",
  components: {
    PortfolioAdminItem: () => import('../components/portfolio/PortfolioAdminItem.vue')
  },
  mounted () {
    this.loadPortfolio()
  },
  data: () => ({
    loading: false,
    error: null,

    portfolio: []
  }),
  methods: {
    loadPortfolio () {
      this.loading = true;
      this.$axios
        .get("/galeria")
        .then((response) => {
          if (response.status === 200 && Array.isArray(response.data)) {
            this.portfolio = response.data;
            this.error = null;
          } else {
            this.error = "Algo salió mal, intenta otra vez :c";
          }
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.error = "Algo salió mal, intenta otra vez :c";
        });
    },
    onAddNewImage () {
      this.$q.dialog({
        component: () => import("../components/portfolio/AddPortfolioItemDialog.vue"),
        parent: this
      }).onOk(() => {
        this.loadPortfolio()
      });
    }
  }
};
</script>

<style lang="scss">
// $
.AdminPortafolio {
  padding: 50px 24px;

  @media (min-width: $breakpoint-md-min) {
    padding: 70px 50px;
  }
}

.AdminPortafolio__title {
  @include font(26px, bold, $primary);
  margin: 0 0 35px;
}

.AdminPortafolio__actions {
  margin-bottom: 35px;
}

.AdminPortafolio__btn {
  border-radius: 10px;
  letter-spacing: 1px;
}

.AdminPortfolio__error {
  @include font(24px, bold, $red-lips);
  margin: 0;
}

.AdminPortafolio__list {
}
</style>
