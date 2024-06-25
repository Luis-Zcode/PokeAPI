const types = fetch("https://pokeapi.co/api/v2/type/")
const SelectTypes = document.querySelector('#typeOption')
let poke = document.querySelector('.poke')
const btnsAtras = document.querySelector('#atras')
const btnSiguiente = document.querySelector('#siguiente')

let siguienteUrl = 'https://pokeapi.co/api/v2/pokemon'
let atrasUrl = ''
let pokes = []
let html = ''
let HabilidadesTexto = ''
let imagenDetalles = ''
let tipos = ''
let nuevoArr = []
const cargarPokemones = (flag, selectValue) => {
    poke.replaceChildren('')
    let contador = 0
    const pokemones = fetch(flag ? siguienteUrl : atrasUrl)
    pokemones
        .then((Response) => Response.json())
        .then((data) => {
            pokes = data.results
            siguienteUrl = data.next
            atrasUrl = data.previous
            pokes.forEach(pokemon => {
                let Habilidades = fetch(pokemon.url)
                Habilidades.then((respuesta) => respuesta.json())
                    .then((minidata) => {
                        let abilities = minidata.abilities
                        let imagen = minidata.sprites.other.dream_world.front_default
                        imagenDetalles = minidata.sprites.other.showdown.front_shiny
                        abilities.forEach((item) => {
                            HabilidadesTexto += item.ability.name + ', '
                        })
                        HabilidadesTexto = HabilidadesTexto.slice(0, HabilidadesTexto.length - 2)
                        contador = contador + 1
                        if (minidata.types.find((item) => item.type.name == selectValue)
                            || selectValue == undefined) {
                            html = `
                            <div class='gap-2'>
                                <div class="card d-flex align-items-center" >
                                    <p>Nombre del pokemon: ${pokemon.name}</p>
                                    <img class='sizeImg' src='${imagen}'  alt="..."></img>
                                    <p>Habilidades: ${HabilidadesTexto}</p>
                                <div>
                                    <img class='secondImg' src='${imagenDetalles}'></img>
                                    <ahref="${pokemon.url}" class="btn btn-primary detalles">Detalles</a>
                                </div>
                            </div>
                            `
                            poke.insertAdjacentHTML('afterbegin', html)
                        }
                        if (contador == 20 && html == '') {
                            poke.insertAdjacentHTML('afterbegin', `<div class='texto'><h2>No hay datos</h2></div>`)
                            contador = 0
                        }
                        HabilidadesTexto = ''
                        
                    })
            });
        })
        .catch((error) => console.log(error))
}

types.then((response) => response.json())
    .then((data) => {
        tipos = data.results
        tipos.forEach((tipo) => {
            SelectTypes.insertAdjacentHTML('afterbegin',
                `<option value='${tipo.name}'>${tipo.name}</option>`)
        })
    })

SelectTypes.addEventListener('change', (e) => {
    poke.replaceChildren('')
    html = ''
    if(e.target.value == 'todos'){
        cargarPokemones(true, )
    }else{
        cargarPokemones(true, e.target.value)
    }
})

btnSiguiente.addEventListener('click', () => {
    cargarPokemones(true, )
    poke.replaceChildren('')
})

btnsAtras.addEventListener('click', () => {
    cargarPokemones(false, )
})

cargarPokemones(true, )