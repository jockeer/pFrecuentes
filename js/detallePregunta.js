const $tituloPregunta = document.getElementById('tituloPregunta');
const $respuestaPregunta = document.getElementById('respuestaPregunta');
const $addComentario = document.getElementById('addComentario');
const $comentario = document.getElementById('comentario');

(async function loadPregunta(){
    const API = await fetch(`http://localhost:3000/api/detallePregunta/${parseInt(localStorage.getItem('idPregunta'))}`)
    const respuesta = await API.json();
    const API2 = await fetch(`http://localhost:3000/api/comentarios/${parseInt(localStorage.getItem('idPregunta'))}`)
    const respuesta2 = await API2.json();
    

    $tituloPregunta.textContent = respuesta.data[0].titulo;
    $respuestaPregunta.textContent = respuesta.data[0].respuesta;

    function comentarioTemplate(comentario){
        debugger
        return `<div class="datos">
                    <h6>${comentario.nombre}</h6>
                    <small>${comentario.fecha.substr(0,10)}</small>
                    <p>${comentario.comentario}</p>
                    <hr>
                </div>`;
    }

    function createTemplate(HTMLString){
        const $html = document.implementation.createHTMLDocument();
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
    }

    function renderComentarios(listaComentarios, $container){
        listaComentarios.data.forEach(comentario => {   
          const HTMLString = comentarioTemplate(comentario);
          const comentarioElement = createTemplate(HTMLString)
          $container.append(comentarioElement);
        });    
    }
    $containerComentarios = document.getElementById('containercomentarios')
    renderComentarios(respuesta2, $containerComentarios)
    
})();

$addComentario.addEventListener('submit', ()=>{

    var t = new Date;
    let fecha = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`

    const url = `http://localhost:3000/api/addComentario`

        const data = {};
        data.nombre = 'Estudiante';
        data.comentario = $comentario.value;
        data.idPregunta = localStorage.getItem('idPregunta');
        data.fecha = fecha;
        data.tipoComentario = 'F';

        let JSO = JSON.stringify(data)
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSO, // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('se inserto correctamente'));
});

