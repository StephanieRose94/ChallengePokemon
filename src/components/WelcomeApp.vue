<template>
	<div class="text-center globalContain contain-welcome">
		<v-img width="325" cover :src="welcomeUrl" class="image"></v-img>
		<h1 class="mt-7">Welcome to Pokédex</h1>
		<p class="mt-5">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
		<v-btn rounded dark class="principal-button primary mt-5" @click="goList()">
			Get started
		</v-btn>
	</div>
</template>

<script>
	import welcome from "@/assets/images/welcome.png";
	export default {
		
		data() {
			return {
				welcomeUrl:welcome
			}
		},
		methods: {
			goList(){
				console.log("click");
				this.$router.push({ name: "PokemonList" });
			}
		},
	}
</script>

<style>
	.contain-welcome{
		margin-top: 70px;
	}
	.image{
		width: auto;
		margin: auto;
	}
</style>