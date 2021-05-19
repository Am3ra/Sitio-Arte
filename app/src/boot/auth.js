export default async ({ store, router }) => {
  const TOKEN = localStorage.getItem('token')

  if (TOKEN) {
    store.dispatch('auth/setToken', TOKEN)
  }

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.state.auth.token) {
        store.dispatch('auth/logout')
        return next({
          path: '/login',
        })
      }
      return next()
    }

    if (to.matched.some(record => record.meta.requiresNotAuth)) {
      if (store.state.auth.token) {
        return next({
          path: '/admin'
        })
      }
      return next()
    }

    return next()
  })
}
