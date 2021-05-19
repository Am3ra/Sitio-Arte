<template>
  <div class="Kanban">
    <h2 class="Kanban__title">{{ title }}</h2>
    <div v-if="loading" class="text-center">
      <q-circular-progress indeterminate size="40px" color="gray" />
    </div>
    <q-scroll-area v-else style="flex: 1 1 auto">
      <KanbanItem v-for="(item, index) in items" :key="index" :item="item" />
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  name: "Kanban",
  components: {
    KanbanItem: () => import("./KanbanItem.vue"),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
// $
.Kanban {
  height: 100%;
  width: 320px;
  max-width: 90vw;
  padding: 20px 15px;
  margin: 0 20px;

  background-color: #efefef;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  .Kanban__title {
    @include font(16px, bold, $gray);
    margin: 0 0 15px;
    @media (min-width: $breakpoint-md-min) {
      font-size: 18px;
    }
  }
}
</style>
