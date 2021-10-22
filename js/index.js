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
}

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

const displayPokemon = ((pokemon, divId) => {
    console.log(pokemon)

    const pokemonHTMLString = pokemon.map(pokeman =>
        `
        <div class="col-sm-12 col-med-6 col-lg-4 col-xl-4 col-xxl-2">
            <div id="${pokeman.name}" class="card card-flip card-front mb-2 shadow-lg pokemonCard" style="background-color: ${pokeman.color} ">
                <!--        <div class="card-front">-->
                <img class="card-img-top" src="${pokeman.image}"/>
                <h4 class="card-title text-center">${pokeman.id}. ${pokeman.name}</h4>
                <div class="row text-center">
                    <div class="col-12 card-text text-center m-2">Type: ${pokeman.type}
                    </div>
                </div>
                <!--        </div> -->
                <div class="card card-back mb-2 shadow-lg pokemonCard" style="background-color: ${pokeman.color}">
                    <img class="card-img mb-0 pb-0" src="${pokeman.image2}"/>
                    <h4 class="card-title m-0 p-0 text-center">Ability:</h4>
                    <div class="row text-center">
                        <div class="col-8 card-text text-center m-2">${pokeman.ability}
                        </div>
                        <div class="col-3 my-auto">
                            <i id="${pokeman.id}" class="fas fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `)

    $('#' + divId).html(pokemonHTMLString)
})

//Used to capitalize letters for data from API.
const capitalizeFirstLetter = (string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
})

$("#userPokemonInputBtn").click(function (e) {
    e.preventDefault();
    getPokemonData();
    $('#pokedex').hide()
})

$("#userPokemonInput").on('keypress', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        getPokemonData()
        $('#pokedex').hide()
    }
});

}