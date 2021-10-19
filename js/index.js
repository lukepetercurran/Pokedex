"use strict"

$(document).ready(function () {
    fetchPokemon();
    // $('.pokemonSearchCard').hide()
});

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'

    const fetchPokemon = () => {
        const promises = []; // Start off with an empty array of promises
        for (let i = 1; i <= 898; i++) { //Max is 898.
            const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(pokemonUrl).then((res) => res.json())); //For each one of our requests we push them to promise array
        }
        Promise.all(promises).then((results => {
            const pokemon = results.map((data) => ({ //iterating through each result, going to get a reference to each one of those. With each one of those it then converts it to our built object
                name: capitalizeFirstLetter(data.species.name),
                id: data.id,
                image: data.sprites['front_default'],
                image2: data.sprites['front_shiny'],
                type: capitalizeFirstLetter(data.types[0].type.name), //This grabs each name in type and creates a new array. It then joins them into a string.
                color: colors[data.types[0].type.name],
                ability: capitalizeFirstLetter(data.abilities[0].ability.name)
            }));
            displayPokemon(pokemon, "pokedex")
        }))
    };
}