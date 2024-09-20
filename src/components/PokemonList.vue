<template>
	<div class="globalContain containList">
		<LoadingPokeball v-if="load" :loading="load"></LoadingPokeball>
		<div v-if="!load" class="fade">
			<v-text-field solo placeholder="Search" v-model="searchQuery" class="filter mb-3" @input="filterPokemon"></v-text-field>
			<div v-if="pokemonFound">
				<v-card v-bind="attrs"
				v-on="on" v-for="pokemon in listFilter" :key="pokemon.id" elevation="0" class="pa-3 pl-5 pr-5 mb-3 d-flex justify-space-between">
					<h3 class="name">{{ pokemon.name }}</h3>
					<div class="containIcon">
						<iconStar iconStyle="icon-star"></iconStar>
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
		<v-col v-if="pokemonFound" class="buttons-footer d-flex justify-center" cols="12">
			<v-row class="globalContain">
				<v-col cols="6" class="pt-1">
					<v-btn rounded dark block class="principal-button primary mt-5 pa-3 mb-2" @click="goHome()">
						<iconList iconStyle="icon-button pr-1"></iconList>
						<p class="mb-0">All</p>
					</v-btn>
				</v-col>
				<v-col cols="6" class="pt-1">
					<v-btn rounded dark block class="principal-button primary mt-5 pa-3 mb-2" @click="goHome()">
						<iconStar iconStyle="icon-button pr-1"></iconStar> 
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
	import iconStar from "@/components/icons/iconStar.vue";
	import iconList from "@/components/icons/iconList.vue";
	// import DetailsPokemon from "@/components/DetailsPokemon.vue";
	
	export default{
		data() {
			return {
				pokemons: [],
				listFilter:[],
				load: true,
				searchQuery: '',
	
			}
		},
		mounted() {
			this.getPokemons()
		},
		methods: {
			getPokemons(){
				axios.get('https://pokeapi.co/api/v2/pokemon').then(res => {
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
				console.log('Búsqueda:', this.searchQuery);
				this.listFilter = this.pokemons.filter(pokemon =>
				pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				);
			},
			goHome(){
				console.log("click");
				this.$router.push({ name: "PokemonList" });
			}
		},
		computed: {
			pokemonFound(){
				return this.listFilter.length > 0 ? true : false;
			}
		},
		components: {
			LoadingPokeball,
			iconStar,
			iconList,
			// DetailsPokemon
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
		margin-top: 35px;
		margin-bottom: 100px;
	} 
	.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
		box-shadow:  0px 5px 5px 0px rgb(0 0 0 / 5%) !important;    
	}
	.icon-star{
		fill: var(--disabled-grey);
		width: 26px;
	}
	.name{
		color: var(--principal-grey);
		font-weight: 500;
		text-transform: capitalize;
	}
	.containIcon{
		width: auto;
		height: auto;
		background-color: var(--second-grey);
		border-radius: 50px !important;
		padding: 5px 5px 2px 5px;
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
		fill: white;
		width: 22px;
	}	
</style>