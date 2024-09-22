<template>
	<div>
		<v-dialog v-model="isOpen" @input="close"  max-width="570">
			<v-card>
				<i class="fa-solid fa-circle-xmark close" @click="close"></i>
				<div class="wallpaper-pokemon">
					<v-img :src="imagePokemon" class="imgPokemon image" width="180"></v-img>
				</div>
				<v-card-text class="text-left infoPokemon mt-5">
					<p><b>Name: </b>{{pokemon.name}}</p>
					<v-divider></v-divider>
					<p><b>Weight: </b>{{pokemon.weight}}</p>
					<v-divider></v-divider>
					<p><b>Height: </b>{{pokemon.height}}</p>
					<v-divider></v-divider>
					<p><b>Types: </b>{{typesNames}}</p>
					<v-divider></v-divider>
				</v-card-text>
				<v-card-actions class="d-flex justify-center pb-5">
					<v-row>
						<v-col cols="6" class="d-flex justify-start">
							<v-btn rounded dark class="principal-button primary pa-5 " @click="sharePokemon()">
								<p class="mb-0">Share to my friends</p>
							</v-btn>
						</v-col>
						<v-col cols="6" class="d-flex justify-end">							
							<div class="containIcon" :class="favorite ? 'effectClick' : ''" @click="!favorite ? addToFavorites(pokemon.name) : removeToFavorites(pokemon.name)">
								<i class="fa-solid fa-star icon-star" :class="!favorite ? 'starDisactive' : 'starActive'"></i>
							</div>
						</v-col>
					</v-row>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-snackbar v-model="snackbar" :timeout="timeout" color="warning">
			<p class="text-center mb-0">copied pokemon!</p> 
		</v-snackbar>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name:'DetailsPokemon',

		data() {
			return {
				pokemon:[],
				imagePokemon:'',
				name:'',
				isOpen: true,
				favorite:false,
				snackbar: false,
				timeout: 1000,
			}
		},
		props: {
			pokemonName: {
				type: String,
				required: true,
			},
		},
		watch: {
			pokemonName: {
				immediate: true,
				handler(newName) {
					if (newName) {
						this.getPokemon(newName);
					}
				},
			},
		},
		mounted() {
				this.valFavorite()
			},
		methods: {
			async getPokemon(name){
				try {
					axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => {
						this.pokemon = res.data
						this.name = res.data.name
						this.imagePokemon = res.data.sprites.other['official-artwork'].front_default
						this.valFavorite(this.name)
					})
				} catch(error)  {
					console.log(error);
				}
			},
			close() {
				this.$emit('close');
			},
			addToFavorites(pokemon) {
				this.$store.commit('ADD_FAVORITE', pokemon)
				this.favorite = true
			},
			removeToFavorites(pokemon) {
				this.$store.commit('REMOVE_FAVORITE', pokemon)
				this.favorite = false
			},
			valFavorite(name) {
				const list = this.$store.getters.getFavorites;
				this.favorite = list.includes(name)
			},
			sharePokemon() {
				const details = `Pokemon: ${this.pokemon.name}, Weight: ${this.pokemon.weight}, Height: ${this.pokemon.height}, Types: ${this.typesNames} `;
				navigator.clipboard.writeText(details)
				this.snackbar = true
			}
		},
		computed: {
			typesNames() {
				if (this.pokemon && this.pokemon.types) {
					return this.pokemon.types.map(item => item.type.name).join(', ');
				} else {
					return ''; 
				}
			}
		}
	}
</script>

<style>
	.wallpaper-pokemon{
		background-image: url(@/assets/images/MaskGroup.png);
		background-size: cover;
		width: 100%;
		padding: 20px;
		
	}
	.imgPokemon{
		max-width: 180px;
	}
	.infoPokemon p{
		margin-bottom: 12px;
		margin-top: 12px;
		text-transform: capitalize;
	}
	.close{
		color: white;
		position: absolute;
		top: 10px;
		font-size: 26px;
		right: 10px;
	}
	.effectClick{
		animation: jump 0.6s ease;
	}

	@keyframes jump {
		0% {
			transform: translateY(0);
		}
		30% {
			transform: translateY(-15px); 
		}
		50% {
			transform: translateY(0);
		}
		70% {
			transform: translateY(-7px);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>

