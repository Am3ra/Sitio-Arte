import { axiosInstance } from 'boot/axios';

export function loadTypes ({ commit, dispatch}) {
	commit('TYPES_LOAD_REQUEST')
	return axiosInstance.get("/tipos")
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          commit('TYPES_LOAD_SUCCESS', response.data);
        } else {
          throw new Error("Something went wrong, try again later.")
        }
      })
      .catch((e) => {
        commit('TYPES_LOAD_ERROR', e)
      });
}

