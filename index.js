//const fetch = require('cross-fetch')
let listaPokemon = [];
let listaPokemonNombres = [];
async function getPokemons_1stGen(nro) {
    for (let i = 1; i <= nro; i++) {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const pokemon = await result.json()
        console.log(pokemon)
        listaPokemon.push(pokemon)
        listaPokemonNombres.push(pokemon.name)

        let tipos = []
        for (let i = 0; i < pokemon.types.length; i++) {
            tipos.push(pokemon.types[i].type.name)
        }

        var contenedor = document.getElementById("album");
        var card = document.createElement("div");
        card.innerHTML = '\
        <div class="col">\
            <div class="card shadow-sm">\
                <img src=' + pokemon.sprites.front_default + ' class="card-img-top" alt="sprite" id="sprite">\
                <div class="card-body">\
                    <h5 class="card-title" id="name">' + pokemon.name + '</h5>\
                    <p class="card-text lead text-muted">' + tipos + '</p>\
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="moreInfo(&quot;' + pokemon.id + '&quot;)">+ Info</button>\
                </div>\
            </div>\
        </div>'
        contenedor.appendChild(card)
    }
    console.log('listaPokemon', listaPokemon)
};


getPokemons_1stGen(50)
function buscarAutomatico(){
    buscar()
}
function limpiar(){
    document.getElementById('itemBuscar').value=''
    buscar()
}
function buscar(){
    let itemBuscar = document.getElementById('itemBuscar').value;
    console.log('itemBuscar', itemBuscar)
    let resultado = listaPokemonNombres.filter(element => element.includes(itemBuscar))
    console.log(resultado)
    var contenedor = document.getElementById("album");
    contenedor.innerHTML='';
    for (let i = 0; i < resultado.length; i++) {
        for(let j=0; j < listaPokemon.length; j++){
            if(resultado[i]==listaPokemon[j].name){
                let tipos = []
                for (let i = 0; i < listaPokemon[j].types.length; i++) {
                    tipos.push(listaPokemon[j].types[i].type.name)
                }
                var card = document.createElement("div");
                card.innerHTML = '\
                <div class="col">\
                    <div class="card shadow-sm">\
                        <img src=' + listaPokemon[j].sprites.front_default + ' class="card-img-top" alt="sprite" id="sprite">\
                        <div class="card-body">\
                            <h5 class="card-title" id="name">' + listaPokemon[j].name + '</h5>\
                            <p class="card-text lead text-muted">' + tipos + '</p>\
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="moreInfo(&quot;' + listaPokemon[j].id + '&quot;)">+ Info</button>\
                        </div>\
                    </div>\
                </div>'
                contenedor.appendChild(card)
            }
        }
    }
}
function moreInfo(id){
    console.log('DETALLE', id)
    getDetallePokemon(id)
}
async function getDetallePokemon(id) {
    const detalleResult = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const detallePokemon = await detalleResult.json();
    console.log(detallePokemon)
    document.getElementById('modNombre').innerText = detallePokemon.name
    let dpImagen = document.getElementById("modImagen")
    dpImagen.setAttribute('src', detallePokemon.sprites.front_default);
    let tipos = []
    for (let i = 0; i < detallePokemon.types.length; i++) {
        tipos.push(detallePokemon.types[i].type.name)
    }
    document.getElementById('modTipo').innerText = tipos
    document.getElementById('modGenId').innerText = detallePokemon.id
    document.getElementById('modGenAltura').innerText = detallePokemon.height
    document.getElementById('modGenPeso').innerText = detallePokemon.weight

    for (let i = 0; i < detallePokemon.stats.length; i++) {
        if(detallePokemon.stats[i].stat.name == 'hp'){
            document.getElementById('modEstHP').innerText = detallePokemon.stats[i].base_stat
        }
        if(detallePokemon.stats[i].stat.name == 'attack'){
            document.getElementById('modEstAtaque').innerText = detallePokemon.stats[i].base_stat
        }
        if(detallePokemon.stats[i].stat.name == 'defense'){
            document.getElementById('modEstDefensa').innerText = detallePokemon.stats[i].base_stat
        }
        if(detallePokemon.stats[i].stat.name == 'special-attack'){
            document.getElementById('modEstAtaqueEspecial').innerText = detallePokemon.stats[i].base_stat
        }
        if(detallePokemon.stats[i].stat.name == 'special-defense'){
            document.getElementById('modEstDefensaEspecial').innerText = detallePokemon.stats[i].base_stat
        }
        if(detallePokemon.stats[i].stat.name == 'speed'){
            document.getElementById('modEstVelocidad').innerText = detallePokemon.stats[i].base_stat
        }
    }
    var ListaMoves = document.getElementById("modListaMoves");
    ListaMoves.innerHTML=''
    for (let i = 0; i < 10; i++) {
        let move = document.createElement("li");
        move.innerHTML = '<li class="list-group-item" style="margin: 0; padding-top: 0; padding-bottom: 0;">' + detallePokemon.moves[i].move.name + '</li>'
        ListaMoves.appendChild(move)
    }
};