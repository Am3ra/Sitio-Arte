<template>
	<q-drawer
    v-model="drawerModel"
    :width="260"
    show-if-above
    content-class="AdminSidebar"
  >
    <h1 class="AdminSidebar__title">Administrador</h1>
    <q-list class="AdminSidebar__menu" dark dense>
    	<q-item to="/admin/comisiones" class="AdminSidebar__link" clickable v-ripple>
    		<q-item-section>
    			Comisiones
    		</q-item-section>
    	</q-item>
    	<q-item to="/admin/portafolio" class="AdminSidebar__link" clickable v-ripple>
    		<q-item-section>
    			Portafolio
    		</q-item-section>
    	</q-item>
    	<q-item to="/admin/tienda" class="AdminSidebar__link" clickable v-ripple>
    		<q-item-section>
    			Tienda
    		</q-item-section>
    	</q-item>
    	<q-item to="/admin/tipos" class="AdminSidebar__link" clickable v-ripple>
    		<q-item-section>
    			Categorías
    		</q-item-section>
    	</q-item>
    </q-list>
    <div class="text-right">
    	<q-btn to="/" class="AdminSidebar__logout" label="Cerrar Sesión" icon-right="logout" no-caps flat dense />
    </div>
  </q-drawer>
</template>

<script>
export default {
	name: 'AdminSidebar',
	props: {
		drawer: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		drawerModel: {
			get () { return this.drawer },
			set (value) { this.$emit('update-drawer', value) }
		}
	}
}
</script>

<style lang="scss">
.AdminSidebar {
	background-color: $gray;
	padding: 40px 25px 20px;

	display: flex; 
	flex-direction: column;

	.AdminSidebar__title {
		@include font(24px, bold, white);
		margin: 0 0 25px;
	}

	.AdminSidebar__menu {
		flex-grow: 1;
	}

	.AdminSidebar__link {
		text-transform: uppercase;
		font-size: 16px;

		&.q-router-link--active {
			font-weight: bold;
		}
	}

	.AdminSidebar__logout {
		color: white;
	}
}
</style>