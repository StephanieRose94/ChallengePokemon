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
							<v-btn rounded dark class="principal-button primary pa-5 " @click="goHome()">
								<p class="mb-0">Share to my friends</p>
							</v-btn>
						</v-col>
						<v-col cols="6" class="d-flex justify-end">							
							<div class="containIcon">
								<i class="fa-solid fa-star icon-star"></i>
							</div>
						</v-col>
					</v-row>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import axios from "axios";


	export default {
		name:'DetailsPokemon',

		data() {
			return {
				pokemon:{},
				imagePokemon:'',
				isOpen: true,
			}
		},
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		watch: {
		id: {
			immediate: true,
			handler(newId) {
				if (newId) {
					this.getPokemon(newId);
				}
			},
		},
	},
		methods: {
			async getPokemon(id){
				try {
					console.log(id);
					axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
						this.pokemon = res.data
						console.log(res.data);
						this.imagePokemon = res.data.sprites.other.dream_world.front_default
					})
				} catch(error)  {
					console.log(error);
				}
			},
			close() {
				this.$emit('close');
			},
		},
		computed: {
			typesNames() {
				return this.pokemon.types.map(item => item.type.name).join(', ');
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
</style>

