<template>
  <div class="TiposAdminItem">
    <div>
      <q-img :src="item.img" class="TiposAdminItem__image"/>
      <div class="TiposAdminItem__content">
        <p class="TiposAdminItem__title">{{item.name}}</p>
        <p class="TiposAdminItem__field"><b>Descripción: </b><br />{{item.description}}</p>
        <p class="TiposAdminItem__field"><b>Precio base: </b><br />{{item.precioBase}}</p>
      </div>
    </div>
    <div class="TiposAdminItem__actions">
      <q-btn @click="onModify" icon="edit" size="14px" flat dense round />
      <q-btn @click="onDelete" icon="delete" size="14px" color="red-lips" flat dense round />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TiposAdminItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDelete () {
      this.$q.dialog({
        component: () => import("./DeleteTiposItemDialog.vue"),
        parent: this,
        item: this.item
      }).onOk(() => {
        this.$emit('reload-list');
      });
    },
    onModify () {
      this.$q.dialog({
        component: () => import("./ModifyTiposItemDialog.vue"),
        parent: this,
        item: this.item
      }).onOk(() => {
        this.$emit('reload-list');
      });;
    }
  }
}
</script>

<style lang="scss">
// $
.TiposAdminItem {
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

.TiposAdminItem__image{
  height: 100px;
  width: 100%;
}

.TiposAdminItem__content {
  margin-top: 5px;
  margin-bottom: 15px;
}

.TiposAdminItem__title {
  @include font(16px, bold, $dark);
  margin: 0 0 15px;
}

.TiposAdminItem__field {
  @include font(12px, normal, $dark);
  word-break: break-all;
  margin: 0 0 15px;
}

.TiposAdminItem__actions {
  text-align: right;
}
</style>
