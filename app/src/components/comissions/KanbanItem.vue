<template>
  <div class="KanbanItem" @click="seeDetail" >
    <q-img
      v-if="item.status === 'done' && item.finalThumb"
      :src="item.finalThumb"
      class="KanbanItem__image"
    />
    <div class="KanbanItem__content">
      <div
        class="KanbanItem__status"
        :style="{ backgroundColor: colorByStatus }"
      ></div>
      <p class="KanbanItem__title">{{ item.title }}</p>
      <div class="KanbanItem__progressDetails">
        <q-icon
          class="KanbanItem__hasComments"
          name="question_answer"
          color="light-gray"
          v-if="item.hasComments"
        />
        <template v-if="!!item.progress && item.status === 'doing'">
          <q-linear-progress
            class="KanbanItem__progress"
            size="md"
            :value="item.progress / 100"
          />
          <span class="KanbanItem__progressLabel">{{ item.progress }}%</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KanbanItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    seeDetail: function () {
      this.$q
        .dialog({
          component: () => import("./TokenRequestDialog.vue"),
          parent: this,
        })
        .onOk(() => {
          this.$q.dialog({
            component: () => import("./CommissionViewDialog.vue"),
            parent: this,
          });
          console.log("hello!");
        });
    },
  },
  computed: {
    colorByStatus: function () {
      switch (this.item.status) {
        case "approved":
          return "#ffff6f";
        case "doing":
          return "#ff8181";
        case "done":
          return "#7ae697";
        default:
          return "#ee6700";
      }
    },
  },
};
</script>

<style lang="scss">
// $
.KanbanItem {
  border-radius: 5px;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  margin-bottom: 7px;

  .KanbanItem__image {
    width: 100%;
  }

  .KanbanItem__content {
    padding: 14px 12px 13px;
  }

  .KanbanItem__status {
    height: 10px;
    width: 30%;
    border-radius: 15px;
    margin-bottom: 10px;
  }
  .KanbanItem__title {
    font-size: 15px;
    margin-bottom: 0;
  }

  .KanbanItem__progressDetails {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin-top: 3px;
  }

  .KanbanItem__hasComments {
    margin-right: 10px;
  }
  .KanbanItem__progress {
    width: 150px;
    border-radius: 5px;
  }
  .KanbanItem__progressLabel {
    @include font(10px, normal, $gray);
    margin-left: 5px;
  }
}
</style>
