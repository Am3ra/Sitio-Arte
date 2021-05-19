<template>
  <q-header class="Header" height-hint="98">
    <div class="Header__mobile">
      <q-btn flat round color="primary" size="16px" icon="menu" @click="$emit('drawer-toggle')" />
    </div>
  </q-header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
.Header {
  background-color: white;
  color: $gray;
}

.Header__mobile {
  padding: 10px 18px;
  -webkit-box-shadow: 0px 2px 14px -5px $light-gray; 
  box-shadow: 0px 2px 10px -5px $light-gray;

  display: block;

  @media (min-width: $breakpoint-md-min) {
    display: none;
  }
}

</style>
