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

    //used to create all of the buttons on the screen for each pokemon in the pokemonList array, then also adds an event listener on each one. 
    function addListItem(pokemon) {
        let listedPokemon = document.querySelector('ul');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let pokeButton = document.createElement('button')
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add('pokeButton');
        pokeButton.classList.add('btn'); //make this button a Bootstrap button
        pokeButton.classList.add('btn-primary');
        // pokeButton.setAttribute(data-bs-toggle, 'modal'); //this causes all of my buttons to not show up at all
        // pokeButton.setAttribute(data-bs-target, '#pokemonModal'); //this also causes all of my buttons to not show up at all
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
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
        });
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

    // function showLoadingMsg() {
    //     console.log('THIS IS THE TIME TO ADD A LOADING MESSAGE');
    // }

    // function hideLoadingMsg() {
    //     console.log('THIS IS THE TIME TO HIDE A LOADING MESSAGE');
    // }

    function showModal(name, height, imageUrl) {
        let modalContainer = document.querySelector('#modal-container');
        
        modalContainer.innerHTML = ''; //clear the content of the modal
        
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let nameElement = document.createElement('h1');
        nameElement.innerText = name;

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('pkmn-image');
        
        let imgElement = document.createElement('img');
        imgElement.src = imageUrl;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ';
        heightElement.innerHTML += height;

        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(imgContainer);
        imgContainer.appendChild(imgElement);
        modal.appendChild(heightElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    //This allows the user to press the escape key to close the modal, ONLY if it is visible to begin with
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key = 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        // showLoadingMsg: showLoadingMsg,
        // hideLoadingMsg: hideLoadingMsg,
    };

})(); // end of the IIFE


//this ensures that the pokemon list is only rendered after (and if) all of the information has been received (fetched) from the server. 
pokemonRepository.loadList().then(function() { //fetches the data from the Pokemon API
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon); //creates all of the buttons for the pokemon on the screen
    });
});