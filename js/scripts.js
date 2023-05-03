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

    //used to create all of the buttons on the screen for each pokemon in the pokemonList array, then also adds an event listener on each one. 
    function addListItem(pokemon) {
        let listedPokemon = document.querySelector('ul');
        let listItem = document.createElement('li');
        let pokeButton = document.createElement('button')
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add('pokeButton');
        listItem.appendChild(pokeButton);
        listedPokemon.appendChild(listItem);
        addEventListener(pokeButton, pokemon);
    }

    //Used to add an event listener to a certain button, also calls the showDetails function to console log the pokemon name
    function addEventListener (button, pokemon) {
        button.addEventListener ('click', function() {
            showDetails(pokemon); //you must use an anonymous function here to call showDetails, because if you passed a parameter in the Event Listener argument it will fire upon page load. 
        });
    }

    //logs the name of the passed pokemon into the console
    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

})(); // end of the IIFE

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});





