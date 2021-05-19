import { axiosInstance } from 'boot/axios';

export function loadPortfolio ({ commit, dispatch}) {
	commit('PORTFOLIO_LOAD_REQUEST')
	return axiosInstance.get("/galeria")
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          commit('PORTFOLIO_LOAD_SUCCESS', response.data);
        } else {
          throw new Error("Something went wrong, try again later.")
        }
      })
      .catch((e) => {
        commit('PORTFOLIO_LOAD_ERROR', e)
      });
}
