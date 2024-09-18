<template>
    <div>
        <ul>
            <li v-for="pokemon in pokemons" :key="pokemon.name">
                {{ pokemon.name }}
            </li>
        </ul>
    </div>
    
</template>
<script>
    import axios from "axios";

    export default{
        data() {
            return {
                pokemons: [],
            }
        },
        mounted() {
            this.getPokemons()
        },
        methods: {
            getPokemons(){
                axios.get('https://pokeapi.co/api/v2/pokemon').then(res => {
                    this.pokemons = res.data.results
                }).catch(error => {
                    console.log(error);
                })
            }
        },
    }
</script>
<style>

</style>