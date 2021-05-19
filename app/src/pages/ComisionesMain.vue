<template>
  <q-page class="Comisiones">
    <div class="Comisiones__section">
      <div class="Comisiones__actions">
        <q-btn
          class="Comisiones__btn"
          to="/comisiones/board"
          label="See active commissions"
          outline
          color="primary"
        />
        <q-btn
          class="Comisiones__btn"
          to="/comisiones/ordenar"
          label="Order a commission"
          unelevated
          color="primary"
        />
      </div>
      <p class="Comisiones__disclaimer">
        *Please be sure to check the rules in the home page before requesting a
        commission.
      </p>
    </div>
    <div v-if="!!loading && tipos.length <= 0" class="text-center">
      <q-circular-progress indeterminate size="40px" color="primary" />
    </div>
    <div else v-for="item in tipos" :key="item._id">
      <q-separator color="light-gray" />
      <div class="Comisiones__section" >
        <div class="Comisiones__Category row q-col-gutter-lg">
          <div class="Category__description col-xs-12 col-md-7">
            <h2 class="SectionTitle">{{item.name}}</h2>
            <p>
              {{item.description}}
            </p>
            <ul>
              <li>Price: {{item.precioBase}}</li>
            </ul>
          </div>
          <div class="Category__placeholder col-xs-12 col-md-5">
            <q-img :src="item.img" :alt="item.name" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "ComisionesMain",
  mounted() {
    if (this.tipos.length <= 0) {
      this.$store.dispatch('types/loadTypes')
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: `Couldn't load commissions info. Try again later.`
          })
        })
    }
  },
  computed: {
    loading () {
      return this.$store.state.types.loading 
    },
    error () {
      return this.$store.state.types.error
    },
    tipos () {
      return this.$store.state.types.tipos
    }
  }
};
</script>

<style lang="scss">
// $
.Comisiones {
  @include content-width;
}

.Comisiones__section {
  padding: 50px 20px;
}

.Comisiones__actions {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.Comisiones__btn {
  border-radius: 15px;
  letter-spacing: 1px;
  width: 100%;
  margin-bottom: 15px;
  font-weight: 20px;
  @media (min-width: $breakpoint-md-min) {
    width: 47%;
  }
}

.Comisiones__disclaimer {
  text-align: right;
  font-size: 12px;
}

.Category__description {
  .SectionTitle {
    font-size: 20px;
    margin-bottom: 10px;
    @media (min-width: $breakpoint-md-min) {
      font-size: 24px;
    }
  }
  p,
  ul > li {
    @media (min-width: $breakpoint-md-min) {
      font-size: 16px;
    }
  }
}

.Category__placeholder {
  display: flex;
  align-items: center;
}
</style>
