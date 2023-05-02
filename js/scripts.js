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

    //commented out because the Object.keys part of the conditional is not functional
    // function add(pokemon) { 
    //     if (typeof(pokemon) === 'object' && Object.keys(pokemon) === ['name']) {
    //         pokemonList.push(pokemon); //adds the object onto the end of the pokemonList array    
    //     } else {
    //         console.error('Please enter an object data type');
    //     }
    // }
    
    //allows you to add a pokemon to the array, but only if it is an object data type
    function add(pokemon) { 
        if (typeof(pokemon) === 'object') {
            pokemonList.push(pokemon);
        } else {
            console.error('Please enter an object data type');
        }
    }
   
    //allows access to the array from outside of the IIFE
    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };

})(); // end of the IIFE

let bigHeight = 5; //the height at which a pokemon is considered big 

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height <= bigHeight) { //if the pokemon is less than the bigHeight, do not print out that it is big
        document.write (`<p> ${pokemon.name} (height: ${pokemon.height}) </p>`); 
    } else { //if the pokemon is greater than the bigHeight, then print that it is big 
        document.write (`<p> ${pokemon.name} (height: ${pokemon.height}) - WOW, that's big! </p>`); 
    }
});

pokemonRepository.add({name: 'Pikachu'});

pokemonRepository.add('Raichu'); //testing functionality of the if-else statement for pokemonRepository.add()

console.log(pokemonRepository.getAll());




