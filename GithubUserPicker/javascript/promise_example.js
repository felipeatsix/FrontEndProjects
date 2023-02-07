// https://pokeapi.co/api/v2/pokemon/charizard

fetch("https://pokeapi.co/api/v2/pokemon/charizard")
    .then((result) => result.json())
    .then((charizard) => {
        return {
            name: charizard.name
        }
    })
    .then((obj) => {
        console.log(obj)
    })