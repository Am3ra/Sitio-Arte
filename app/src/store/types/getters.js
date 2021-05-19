export function typesAsListOfStrings (state) {
	return state.tipos.map(type => type.name)
}
