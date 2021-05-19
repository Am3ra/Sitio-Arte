<template>
  <q-page class="Home">
    <section class="Home__main">
      <!-- <h1 class="Home__title">lele dibujitos</h1> -->
      <q-img alt="Lelemoonn" src="~assets/logo-lele.png" width="50%" />
      <div class="SocialLinks">
        <q-btn
          flat
          round
          class="SocialLinks__item"
          color="gray"
          icon="fab fa-instagram"
          type="a"
          href="https://www.instagram.com/lelemoonnart/"
          target="_blank"
        />
        <q-btn
          flat
          round
          class="SocialLinks__item"
          color="gray"
          icon="fab fa-twitter"
          type="a"
          href="https://twitter.com/Lelemoonn"
          target="_blank"
        />
        <q-btn
          flat
          round
          class="SocialLinks__item"
          color="gray"
          icon="fab fa-twitch"
          type="a"
          href="https://www.twitch.tv/lelemoonn"
          target="_blank"
        />
      </div>
    </section>
    <q-separator color="light-gray" />
    <section class="Home__section">
      <h2 class="SectionTitle">Rules</h2>
      <ul>
        <li>PayPal invoices only.</li>
        <li>Payments are always upfront.</li>
        <li>If you want to make merchandise out of a commission, please specify so. (You must pay a 50% extra from base price for commercial use.)</li>
        <li>I can reject commissions containing: Mecha/Furry/NSFW.</li>
        <li>Feel free to DM me if you have any questions.</li>
      </ul>
    </section>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
};
</script>

<style lang="scss">
// $
.Home {
  @include content-width;
}

.Home__main {
  padding: 50px 30px;
  text-align: center;
}

.Home__section {
  padding: 50px 20px;
}

.Home__title {
  @include font(38px, bold, $red-lips);
  letter-spacing: 3px;
  margin: 0 0 20px;
  @media (min-width: $breakpoint-md-min) {
    font-size: 50px;
  }
}

.SocialLinks {
  margin-top: 20px;
  .SocialLinks__item {
    color: $gray;
    font-size: 10px;
    margin: 0 8px;
  }
}
</style>
