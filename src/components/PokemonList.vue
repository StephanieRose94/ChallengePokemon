<template>
	<div class="globalContain containList">
		<LoadingPokeball v-if="load" :loading="load"></LoadingPokeball>
		<div v-if="!load" class="fade">
			<div class="containSearch">
				<i class="fa-solid fa-magnifying-glass"></i>
				<v-text-field solo placeholder="Search" v-model="searchQuery" class="filter mb-3" @input="filterPokemon"></v-text-field>
			</div>
			<div v-if="pokemonFound" >
				<v-card  v-for="pokemon in listFilter" :key="pokemon.id" @click="openModal(pokemon.name)" elevation="0" class="pa-3 pl-5 pr-5 mb-3 d-flex justify-space-between">
					<h3 class="name">{{ pokemon.name }}</h3>
					<div class="containIcon">
						<i class="fa-solid fa-star icon-star" :class="isFavorite(pokemon.name) ? 'starActive' : 'starDisactive' "></i>
					</div>
				</v-card>
			</div>
			<div v-else>
				<v-col class="text-center">
					<h1>Uh-oh!</h1>
					<p>You look lost on your journey!</p>
					<v-btn rounded dark class="principal-button primary mt-2" @click="goHome()">
						Go back home
					</v-btn>
				</v-col>
			</div>
		</div>
		<DetailsPokemon v-if="isModalOpen" :id="selectedId" @close="isModalOpen = false" ></DetailsPokemon>
		<v-col v-if="pokemonFound" class="buttons-footer d-flex justify-center" cols="12">
			<v-row class="globalContain">
				<v-col cols="6" class="pt-1">
					<v-btn rounded dark block class="principal-button  mt-5 pa-3 mb-2" :class="!favoritesActive ? 'primary' : 'info'" @click="allPokemons()">
						<i class="fa-solid fa-list-ul icon-button pr-1"></i>
						<p class="mb-0">All</p>
					</v-btn>
				</v-col>
				<v-col cols="6" class="pt-1">
					<v-btn rounded dark block class="principal-button mt-5 pa-3 mb-2" :class="favoritesActive ? 'primary' : 'info'" @click="favoritePokemons()">
						<i class="fa-solid fa-star icon-button pr-1"></i>
						<p class="mb-0">Favorites</p>
					</v-btn>
				</v-col>
			</v-row>
		</v-col>
	</div>  
</template>

<script>
	import axios from "axios";
	import LoadingPokeball from "@/components/LoadingPokeball.vue";
	import DetailsPokemon from "@/components/DetailsPokemon.vue";
	
	export default{
		data() {
			return {
				pokemons: [],
				listFilter:[],
				listFilterFavorites:[],
				favoritesActive:false,
				load: true,
				searchQuery: '',
				selectedId: null,
				isModalOpen: false,
	
			}
		},
		mounted() {
			this.getPokemons()
		},
		watch:{
			searchQuery(newVal){
				console.log(newVal, '------------');
				if (newVal == '') {
					console.log('entro');
					this.clearSearch()
				}
	
			}
		},
		methods: {
			getPokemons(){
				axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=649').then(res => {
					setTimeout(() => {
							this.load = false;
					}, 2000);
					this.load = true;
					this.pokemons = res.data.results
					this.listFilter = this.pokemons
				}).catch(error => {
					console.log(error);
				})
			},
			filterPokemon(){
				
				// if (this.favoritesActive == true) {
				// 	const listFilterFav = this.listFilter 
				// 	console.log(listFilterFav, 'lista favoritos');
				// 	this.listFilter = listFilterFav.filter(pokemon =>
				// 	pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				// 	);
				// } else {	
				// 	this.listFilter = this.pokemons.filter(pokemon =>
				// 	pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				// 	);
				// }
				const list = this.getListPokemon()
				this.listFilter = this.filterPokemonSearch(list)
			},
			filterPokemonSearch(list){
				return list.filter(pokemon =>
					pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				);
			},
			clearSearch(){
				this.listFilter = this.getListPokemon()
			},
			getListPokemon(){
				return this.favoritesActive == true ? this.listFilterFavorites : this.pokemons
			},
			goHome(){
				console.log("click");
				this.$router.push({ name: "Welcome" });
			},
			openModal(id) {
				this.selectedId = id;
				this.isModalOpen = true;
			},
			favoritePokemons() {
				this.favoritesActive=true
				this.listFilterFavorites = this.pokemons.filter(pokemon =>
					this.favorites.includes(pokemon.name.toLowerCase())
				);
				this.listFilter = this.listFilterFavorites

		},
			allPokemons(){
				this.listFilter = this.pokemons
				this.favoritesActive=false
			}
		},
		computed: {
			pokemonFound(){
				return this.listFilter.length > 0 ? true : false;
			},
			favorites() {
				return this.$store.getters.getFavorites;
			},
			isFavorite() {
				return (pokemon) => this.$store.getters.isFavorite(pokemon);
			}
		},
		components: {
			LoadingPokeball,
			DetailsPokemon
		}
	}
</script>

<style>
	.fade{
		animation: fadeIn 1s;
	}
	@keyframes fadeIn {
	0% { opacity: 0; }
	100% { opacity: 1; }
	}
	.containList{
		margin-top: 145px;
		margin-bottom: 80px;
		position: relative;
	} 
	.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
		box-shadow:  0px 5px 5px 0px rgb(0 0 0 / 5%) !important;    
	}
	.icon-star{
		font-size: 26px;
	}
	.starActive{
		color: var(--yellow);
	}
	.starDisactive{
		color: var(--disabled-grey);
	}
	.name{
		color: var(--principal-grey);
		font-weight: 500;
		text-transform: capitalize;
	}
	.containIcon{
		width: auto;
		background-color: var(--second-grey);
		border-radius: 50px !important;
		padding: 5px 5px 5px 5px;
	}
	.buttons-footer{
		position: absolute;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 80px;
		background-color: white;
		box-shadow: 0px -5px 5px -0px rgb(0 0 0 / 10%)
	}
	.icon-button{
		color: white;
		font-size: 22px;
	}	
	.containSearch{
		position: relative;
		background-color: var(--white-background);
		position: fixed;
		top: 0;
		z-index: 99;
		width: 90%;
		max-width: 600px;
		padding-top: 50px;

	}
	.containSearch i {
		position: absolute;
		z-index: 1;
		left: 15px;
		top: 67px;
	font-size: 18px;
	color: var(--disabled-grey);
	}
	.v-text-field.v-text-field--solo .v-input__control input {
		padding-left: 35px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {

    display: none;
}
</style>