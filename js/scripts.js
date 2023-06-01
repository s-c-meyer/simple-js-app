let pokemonRepository = (function () { //beginning of the IIFE
    
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

    //used to create all of the buttons on the screen for each pokemon in the pokemonList array. 
    function addListItem(pokemon) {
        let listedPokemon = document.querySelector('ul');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let pokeButton = document.createElement('button')
        
        // capitalize the first letter of the pokemon's name
        let capPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        
    
        pokeButton.innerText = capPokemonName;
        pokeButton.classList.add('pokeButton');
        pokeButton.classList.add('btn'); //make this button a Bootstrap button
        pokeButton.classList.add('btn-primary');
        pokeButton.setAttribute('data-bs-toggle', 'modal'); 
        pokeButton.setAttribute('data-bs-target', '#pokemonModal'); 
        listItem.classList.add('border-0'); //remove the default borders from all list items
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

    //shows details loaded from the API about a specific pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
      //Capitalizing pokemon's name for the modal
      let capPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      
      //Adding content to the modal
      let modalTitle = document.querySelector('.modal-title');
      modalTitle.textContent = capPokemonName;

      let pokemonImage = document.querySelector('.pokemon-img');
      pokemonImage.src = pokemon.imageUrl;

      let pokemonHeight = document.querySelector('.pokemon-height')
      pokemonHeight.textContent = "Height: " + (pokemon.height / 10) + " m";

    }

    //this will fetch data from the API
    function loadList() { 
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        let url= item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //this is where details are added to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };

})(); // end of the IIFE

//this ensures that the pokemon list is only rendered after (and if) all of the information has been received (fetched) from the server. 
pokemonRepository.loadList().then(function() { //fetches the data from the Pokemon API
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon); //creates all of the buttons for the pokemon on the screen
    });
});