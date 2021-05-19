export function TYPES_LOAD_REQUEST (state) {
	state.loading = true
	state.error = null
}

export function TYPES_LOAD_SUCCESS (state, payload) {
	state.tipos = payload
	state.loading = false
	state.error = null
}

export function TYPES_LOAD_ERROR (state, payload) {{
	state.loading = false
	state.error = payload
}}

