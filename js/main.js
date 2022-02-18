"use strict"

$(document).ready(function () {
    fetchPokemon();
    $('.pokemonSearchCard').hide()
});

const colors = {
    fire: '#f08030',
    grass: '#78c850',
    electric: '#f8d030',
    water: '#6890f0',
    ground: '#e0c068',
    rock: '#b8a038',
    fairy: '#EE99ac',
    poison: '#a040a0',
    bug: '#a8ba20',
    dragon: '#7038f8',
    psychic: '#f85888',
    flying: '#90AAD7',
    fighting: '#c03028',
    normal: '#a8a878',
    ghost: '#705898',
    ice: '#98d8d8'
}

    const fetchPokemon = () => {
        const promises = [];
        // Start off with an empty array of promises
        for (let i = 1; i <= 898; i++) {
            //Max is 898.
            const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(pokemonUrl).then((res) => res.json()));
            //For each one of our requests we push them to promise array
        }
        Promise.all(promises).then((results => {
            const pokemon = results.map((data) => ({
                //iterating through each result, going to get a reference to each one of those. With each one of those it then converts it to our built object
                name: capitalizeFirstLetter(data.species.name),
                id: data.id,
                image: data.sprites['front_default'],
                image2: data.sprites['front_shiny'],
                type: capitalizeFirstLetter(data.types[0].type.name),
                //This grabs each name in type and creates a new array. It then joins them into a string.
                color: colors[data.types[0].type.name],
                habitat: capitalizeFirstLetter(data.location.name)
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
                    <h4 class="card-title m-0 p-0 text-center">Habitat:</h4>
                    <div class="row text-center">
                        <div class="col-8 card-text text-center m-2">${pokeman.habitat}

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

function getPokemonData() {
    let userPokemonInput = $("#userPokemonInput").val()
    const promises = [];
    let url = `https://pokeapi.co/api/v2/pokemon/${userPokemonInput}`
    promises.push(fetch(url).then((data) => data.json()))
    Promise.all(promises).then((results => {
        const pokemon = results.map((data) => ({ //iterating through each result, going to get a reference to each one of those. With each one of those it then converts it to our built object
            name: capitalizeFirstLetter(data.species.name),
            id: data.id,
            image: data.sprites['front_default'],
            type: capitalizeFirstLetter(data.types[0].type.name), //This grabs each name in type and creates a new array. It then joins them into a string.
            color: colors[data.types[0].type.name],
            habitat: capitalizeFirstLetter(data.location.name)
        }));
        displayPokemon(pokemon, "userPokemonSearchDisplay")
    }))
}

//Favorite button press jQuery//
$(document).on('click', '.fas', function () {
    $(this).toggleClass('red');
    localStorage.setItem(this.id, this.id)
    localStorageArray.push(this.id)

});

//Local Storage

let localStorageArray = [];
let localStoragePromises = [];

function localStoragePokemon(localStorageArrayElementValue) {
    let userPokemonFavorite = localStorage.getItem(localStorageArrayElementValue)
    let url = `https://pokeapi.co/api/v2/pokemon/${userPokemonFavorite}`
    localStoragePromises.push(fetch(url).then((data) => data.json()))
    Promise.all(localStoragePromises).then((results => {
        const pokemon = results.map((data) => ({ //iterating through each result, going to get a reference to each one of those. With each one of those it then converts it to our built object
            name: capitalizeFirstLetter(data.species.name),
            id: data.id,
            image: data.sprites['front_default'],
            type: capitalizeFirstLetter(data.types[0].type.name), //This grabs each name in type and creates a new array. It then joins them into a string.
            color: colors[data.types[0].type.name],
            habitat: capitalizeFirstLetter(data.location.name)
        }));
        displayPokemon(pokemon, "userFavoritePokemon")
    }))
}

$("#yourFavoritesNavBarLink").click(function (e) {
    e.preventDefault();
    localStorageArray.forEach(pokemon => localStoragePokemon(pokemon))
    console.log(localStorageArray)
    $('#pokedex').hide();
})

//Clear local storage
$("#clearFavoritesNavBarLink").click(function () {
    location.reload()
    localStorageArray = [];
})

//Back to top button event listeners and javascript
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);


function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}