let pokemonRepository = (function () { //beginning of the IIFE
    
    let pokemonList = [];

    pokemonList[0] = {
        name : 'Swampert',
        height: 1.5,
        weight: 81.9,
        type: ['water', 'ground']
    };
    
    pokemonList[1] = {
        name: 'Rayquaza',
        height: 7,
        weight: 206.5,
        type: ['dragon', 'flying']
    };
    
    pokemonList[2] = {
        name: 'Ditto',
        height: 0.3,
        weight: 4,
        type: ['normal']
    };
    
    pokemonList[3] = {
        name: 'Mr. Mime',
        height: 1.3,
        weight: 54.5,
        type: ['psychic', 'fairy']
    };    

    //allows you to add a pokemon to the array
    function add(pokemon) { 
        pokemonList.push(pokemon);
    }

    //allows access to the array from outside of the IIFE
    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };

})();

let bigHeight = 5; //the height at which a pokemon is considered big 

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height <= bigHeight) { //if the pokemon is less than the bigHeight, do not print out that it is big
        document.write (`<p> ${pokemon.name} (height: ${pokemon.height}) </p>`); 
    } else { //if the pokemon is greater than the bigHeight, then print that it is big 
        document.write (`<p> ${pokemon.name} (height: ${pokemon.height}) - WOW, that's big! </p>`); 
    }
});

pokemonRepository.add( {name: 'Pikachu'} );

console.log(pokemonRepository.getAll());


