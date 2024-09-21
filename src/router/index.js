import Vue from 'vue';
import VueRouter from 'vue-router';

import Welcome from "@/components/WelcomeApp.vue";
import PokemonList from "@/components/PokemonList.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Welcome',
		component: Welcome
	},
	{
		path: '/PokemonList',
		name: 'PokemonList',
		component: PokemonList
	}
];

const router = new VueRouter({
	mode: 'history',
	routes
});

export default router;