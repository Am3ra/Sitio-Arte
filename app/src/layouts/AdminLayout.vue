<template>
  <q-layout view="lHh Lpr fFf">

    <MobileHeader @drawer-toggle="drawer = !drawer" />

    <AdminSidebar :drawer="drawer" @update-drawer="(v) => drawer = v"/>

    <q-page-container>
      <router-view />
    </q-page-container>

    <Footer />

  </q-layout>
</template>

<script>
export default {
  name: 'AdminLayout',
  components: {
    MobileHeader: () => import('../components/general/MobileHeader.vue'),
    AdminSidebar: () => import('../components/general/AdminSidebar.vue'),
    Footer: () => import('../components/general/Footer.vue'),
  },
  data: () => ({
    drawer: false,
  })
}
</script>
