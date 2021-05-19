<template>
  <q-footer class="Footer">
    <q-toolbar>
      <q-toolbar-title class="Footer__copyright">
        © la lele 2021
      </q-toolbar-title>
      <q-btn
        flat
        round
        class="Footer__social-link"
        color="white"
        icon="fab fa-instagram"
        type="a"
        href="https://www.instagram.com/lelemoonnart/"
        target="_blank"
      />
      <q-btn
        flat
        round
        class="Footer__social-link"
        color="white"
        icon="fab fa-twitter"
        type="a"
        href="https://twitter.com/Lelemoonn"
        target="_blank"
      />
      <q-btn
        flat
        round
        class="Footer__social-link"
        color="white"
        icon="fab fa-twitch"
        type="a"
        href="twitch.tv/lelemoonn"
        target="_blank"
      />
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
.Footer {
  background-color: $salmon-pink;

  .Footer__copyright {
    font-size: 12px;
  }
  .Footer__social-link {
    font-size: 10px;
    margin-left: 5px;
  }
}
</style>
