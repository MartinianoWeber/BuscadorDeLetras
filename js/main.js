const artista = document.querySelector('#artista')
const cancion = document.querySelector('#cancion')
const btnBusqueda = document.querySelector('#btnBusqueda')
const resultados = document.querySelector('#resultados')
const cambio = document.querySelector('#cambio')
const errorCampos = document.querySelector('#errorCampos')


const busqueda = {
    artist: '',
    song: ''
}

artista.addEventListener('change', (e) =>{
    busqueda.artist = e.target.value
})
cancion.addEventListener('change', (e) =>{
    busqueda.song = e.target.value
})
console.log(busqueda)


btnBusqueda.addEventListener('click', (e) =>{
    e.preventDefault()
    if((busqueda.artist == '') || (busqueda.song == '')){
        errorCampos.innerHTML = `
        <p class="campos__error">Error algun campo esta vacio!</p>
        `
        setTimeout(() =>{
            errorCampos.innerHTML = ''
        }, 3000)
        return
    }else{
        fetch(`https://api.lyrics.ovh/v1/${busqueda.artist}/${busqueda.song}`) 
        .then( respuesta => {
            return respuesta.json()
        }) 
        .then(resultado => {
                mostrarHtml(resultado)
        })
    }
})


function mostrarHtml(resultado){
    if(resultado.lyrics){
        console.log()
        cambio.classList.add('cambio')
        resultados.innerHTML = `
        <p class="resultado__p">${resultado.lyrics}</p>
        `
    }else{
        resultados.innerHTML = `
        <p class="resultado__p--error">Resultado no encontrado, por favor buscar de otra forma</p>
        `
        setTimeout(() =>{
            formulario.reset()
            resultados.innerHTML = ''
        }, 3000)
        

    }

}

