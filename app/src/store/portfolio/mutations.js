export function PORTFOLIO_LOAD_REQUEST (state) {
	state.loading = true
	state.error = null
}

export function PORTFOLIO_LOAD_SUCCESS (state, payload) {
	state.images = payload
	state.loading = false
	state.error = null
}

export function PORTFOLIO_LOAD_ERROR (state, payload) {{
	state.loading = false
	state.error = payload
}}
