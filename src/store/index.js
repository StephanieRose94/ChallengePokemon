import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store(
	{
		state: {
			favorites: [],
		},
		mutations: {
			ADD_FAVORITE(state,pokemon){
				state.favorites.push(pokemon)
			},
			REMOVE_FAVORITE(state,pokemon){
				state.favorites = state.favorites.filter(p => p.name !== pokemon);
			}
		},
		getters: {
			getFavorites: state => state.favorites
		}
	}
)