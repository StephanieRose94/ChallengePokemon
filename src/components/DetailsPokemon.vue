<template>
	<div>
		<v-dialog v-model="isModalOpen" >
			<!-- Contenido del modal -->
			{{pokemon}}
		</v-dialog>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name:'DetailsPokemon',

		data() {
			return {
				pokemon:{}
			}
		},
		methods: {
			getPokemons(){
				axios.get('https://pokeapi.co/api/v2/pokemon').then(res => {
					this.pokemon = res.data
				}).catch(error => {
					console.log(error);
				})
			},
		},
	
	}
</script>

