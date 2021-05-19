<template>
  <q-layout view="hhh lpr fFf">

    <Header />

    <q-page-container>
      <router-view />
    </q-page-container>

    <Footer />

  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  components: {
    Footer: () => import('../components/general/Footer.vue'),
    Header: () => import('../components/general/Header.vue')
  },
  data () {
    return {
    }
  }
}
</script>
