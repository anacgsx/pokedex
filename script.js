let currentPokemonId = 1;

async function getPokemon(nameOrId) {
    nameOrId = nameOrId || document.getElementById('pokemon-name').value.toLowerCase();
    const url = (`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Pokemon não encontrado");
        }
        const data = await response.json();
        displayPokemonInfo(data);
        currentPokemonId = data.id

    } catch (error) {
        document.getElementById("pokemon-info").innerHTML = `<p>${error.message}</p>`;
    }
}

function displayPokemonInfo(pokemon){
    const pokemonInfo = `
    <h2>${pokemon.name.toUpperCase()} (#${pokemon.id}) </h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>Altura: ${pokemon.height} cm</p>
    <p>Peso: ${pokemon.weight} kg</p>
    <p>Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    `;
    document.getElementById("pokemon-info").innerHTML = pokemonInfo;

    const type = pokemon.types[0].type.name;
        
    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
        };

    document.body.style.backgroundColor = typeColors[type] || '#FFFFFF';
}
function nextPokemon() {
    currentPokemonId+=1;
    getPokemon(currentPokemonId);
}

function previousPokemon() {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        getPokemon(currentPokemonId);
    }
}
window.onload = () => {
    getPokemon(currentPokemonId);
};


