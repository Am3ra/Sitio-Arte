
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/comisiones',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ComisionesMain.vue') },
      { path: 'board', component: () => import('pages/ComisionesBoard.vue') },
      { path: 'ordenar', component: () => import('pages/OrderComission.vue')}
    ]
  },
  {
    path: '/portafolio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Portfolio.vue') }
    ]
  },

  {
  	path: '/login',
  	component: () => import('layouts/MainLayout.vue'),
  	children:[
  		{ path: '', component: () => import('pages/AdminLogin.vue')}
  	]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', redirect: 'comisiones' },
      { path: 'comisiones', component: () => import('pages/AdminLogin.vue') },
      { path: 'portafolio', component: () => import('pages/AdminPortafolio.vue') },
      { path: 'tienda', component: () => import('pages/AdminLogin.vue') },
      { path: 'tipos', component: () => import('pages/AdminTipos.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
