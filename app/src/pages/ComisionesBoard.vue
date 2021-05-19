<template>
  <q-page class="ComisionesBoard" :style-fn="myTweak">
    <q-scroll-area horizontal class="Comisiones__ScrollArea">
      <div class="Comisiones__content">
        <Kanban title="Lista de espera(aprobados)" :items="approved" />
        <Kanban title="En progreso" :items="doing" />
        <Kanban title="Completado" :items="done" :loading="false" />
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
export default {
  name: "ComisionesBoard",
  components: {
    Kanban: () => import("../components/comissions/Kanban.vue"),
  },
  data: () => ({
    approved: [
      {
        title: "Twitch badges - Johnny",
        status: "approved",
      },
      {
        title: "Twitch badges - otherguyXD",
        status: "approved",
      },
      {
        title: "Twitch badges - MarieStreams",
        status: "approved",
      },
      {
        title: "Twitch badges - Formeee",
        status: "approved",
      },
      {
        title: "Twitch badges - Ninja",
        status: "approved",
      },
      {
        title: "Twitch badges - otherguy",
        status: "approved",
      },
      {
        title: "Twitch badges - username",
        status: "approved",
      },
      {
        title: "Twitch badges - Johnny",
        status: "approved",
      },
    ],

    doing: [
      {
        title: "Twitch badges - Johnny",
        status: "doing",
        progress: 30,
        hasComments: true,
      },
      {
        title: "Emotes - Mary",
        status: "doing",
        progress: 65,
        hasComments: false,
      },
    ],

    done: [
      {
        title: "Twitch badges - Kisekii",
        status: "done",
        progress: 100,
        hasComments: true,
        finalThumb: require("../assets/images/kanban_thumb.png"),
      },
    ],
  }),
  methods: {
    myTweak(offset) {
      return {
        minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh",
        height: offset ? `calc(100vh - ${offset}px)` : "100vh",
      };
    },
  },
};
</script>

<style lang="scss">
// $
.ComisionesBoard {
  width: 90vw;
  margin: 0 auto;
  padding: 30px 0;
  @media (min-width: $breakpoint-md-min) {
    width: 85vw;
  }
}

.Comisiones__ScrollArea {
  height: 100%;
  width: 100%;
  height: 100%;
}

.Comisiones__content {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  height: 100%;
}
</style>
