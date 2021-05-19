<template>
  <div class="PortfolioAdminItem">
    <div>
      <q-img :src="item.img" class="PortfolioAdminItem__image" />
      <div class="PortfolioAdminItem__content">
        <p class="PortfolioAdminItem__url"><b>URL:</b><br />{{ item.link }}</p>
      </div>
    </div>
    <div class="PortfolioAdminItem__actions">
      <q-btn @click="onModify" icon="edit" size="14px" flat dense round />
      <q-btn
        @click="onDelete"
        icon="delete"
        size="14px"
        color="red-lips"
        flat
        dense
        round
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PortfolioAdminItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDelete() {
      this.$q
        .dialog({
          component: () => import("./DeletePortfolioItemDialog.vue"),
          parent: this,
          item: this.item,
        })
        .onOk(() => {
          this.$emit("reload-portfolio");
        });
    },
    onModify() {
      this.$q
        .dialog({
          component: () => import("./ModifyPortfolioItemDialog.vue"),
          parent: this,
          item: this.item,
        })
        .onOk(() => {
          this.$emit("reload-portfolio");
        });
    },
  },
};
</script>

<style lang="scss">
// $
.PortfolioAdminItem {
  border-radius: 5px;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  border: 1px solid $light-gray;
  padding: 10px 8px;
  margin-bottom: 7px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.PortfolioAdminItem__image {
  height: 100px;
  width: 100%;
}

.PortfolioAdminItem__content {
  margin-top: 5px;
  margin-bottom: 15px;
}

.PortfolioAdminItem__url {
  @include font(12px, normal, $dark);
  word-break: break-all;
  margin: 0 0 5px;
}

.PortfolioAdminItem__actions {
  text-align: right;
}
</style>
