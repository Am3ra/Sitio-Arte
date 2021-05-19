<template>
  <q-page class="AdminTipos">
    <h1 class="AdminTipos__title">Categorías de comisiones</h1>
    <div class="text-right AdminTipos__actions">
      <q-btn @click="onAddNewCategory" class="AdminTipos__btn" label="Subir nueva categoría" color="primary" no-caps unelevated/>
    </div>
    <div v-if="!!error" class="text-center">
      <h2 class="AdminTipos__error">{{ error }}</h2>
    </div>
    <div v-else-if="!!loading" class="text-center">
      <q-spinner size="40px" color="primary" />
    </div>
    <div v-else-if="categories.length <= 0" class="text-center">
      <h2 class="AdminTipos__noticeTitle">Todavía no has subido ninguna categoría</h2>
      <p  class="AdminTipos__noticeText">Agrega nuevas categorías para que la gente pueda verlas en la sección de comisiones</p>
    </div>
    <div v-else class="AdminTipos__list row q-col-gutter-md">
      <div class="col-xs-12 col-sm-4 col-md-3" v-for="item in categories" :key="item._id">
        <TiposAdminItem :item="item" @reload-list="loadList" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AdminPortafolio",
  components: {
    TiposAdminItem: () => import('../components/tipos/TiposAdminItem.vue')
  },
  mounted () {
    this.loadList()
  },
  data: () => ({
    loading: false,
    error: null,

    categories: []
  }),
  methods: {
    loadList () {
      this.loading = true;
      this.$axios
        .get("/tipos")
        .then((response) => {
          if (response.status === 200 && Array.isArray(response.data)) {
            this.categories = response.data;
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
    onAddNewCategory () {
      this.$q.dialog({
        component: () => import("../components/tipos/AddTiposItemDialog.vue"),
        parent: this
      }).onOk(() => {
        this.loadList()
      });
    }
  }
};
</script>

<style lang="scss">
// $
.AdminTipos {
  padding: 50px 24px;

  @media (min-width: $breakpoint-md-min) {
    padding: 70px 50px;
  }
}

.AdminTipos__title {
  @include font(26px, bold, $primary);
  margin: 0 0 35px;
}

.AdminTipos__actions {
  margin-bottom: 35px;
}

.AdminTipos__btn {
  border-radius: 10px;
  letter-spacing: 1px;
}

.AdminTipos__error {
  @include font(24px, bold, $red-lips);
  margin: 0;
}

.AdminTipos__list {
}
</style>
