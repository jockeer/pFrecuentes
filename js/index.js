const $formSearch = document.getElementById('formSearch');
const $containerpFrecuentes = document.getElementById('containerpFrecuentes');
const $textSearch = document.getElementById('textSearch');
const $containerbuscador = document.getElementById('containerbuscador');
let $categoria = '';
let $containerPregunta;
let $lista = [];

function createTemplate(HTMLString){
    const $html = document.implementation.createHTMLDocument();
    $html.body.innerHTML = HTMLString;
    return $html.body.children[0];
}

const load = async (categoria)=>{

    const API = await fetch(`http://localhost:3000/api/llenarFrecuentes/${categoria}`);
    const respuesta = await API.json();

    
    
    function preguntaTemplate(pregunta){
        return `<li>
                    <h6>${pregunta.titulo}</h6>
                    <hr>
                </li>`;
    }
    
    function addEventClick($element,$pregunta){
        $element.addEventListener('click', () => {
            localStorage.setItem('idPregunta',`${$pregunta.id}`)
            location.href='modulos/pregunta.html'
        })
    }
    function renderCategoria(listaPreguntas, $container){
        listaPreguntas.data.forEach(pregunta => {   
          const HTMLString = preguntaTemplate(pregunta);
          const preguntaElement = createTemplate(HTMLString)
          addEventClick(preguntaElement,pregunta);
          $container.append(preguntaElement);
        });    
    }
    if(categoria == 'option1'){
        $categoria='option1'
        $containerPregunta = document.getElementById('cat1')
    }else if(categoria == 'option2'){
        
        $categoria='option2'
        $containerPregunta = document.getElementById('cat2')
    }else if(categoria == 'option3'){
        $categoria='option3'
        $containerPregunta = document.getElementById('cat3')
        
    }else{
        $categoria='option4'
        $containerPregunta = document.getElementById('cat4')
        
    }
    renderCategoria(respuesta, $containerPregunta)
};

load('option1');
load('option2');
load('option3');
load('option4');

const preguntaBuscada = async (texto) => {
    // debugger
    const API = await fetch(`http://localhost:3000/api/preguntaBuscada/${texto}`);
    const respuesta = await API.json();
//[4,4]
    // if (respuesta.data.length != 0) {
    //     // $lista.push(respuesta.data[0].id)
    //     if ($lista.length >= 1) {
    //         const contador = 0;
    //         for (let f = 0; f < $lista.length; f++) {
                
    //             if (respuesta.data[0].id === s) {
                    
    //             } else {
                    
    //             };
    //         };
            
    //     }else{
    //         $lista.push(respuesta.data[0].id)
    //     };
    // };

    function preguntaTemplate(pregunta){
        return `<li>
                    <h6>${pregunta.titulo}</h6>
                    <hr>
                </li>`;
    }

    function addEventClick($element,$pregunta){
        $element.addEventListener('click', () => {
            localStorage.setItem('idPregunta',`${$pregunta.id}`)
            location.href='modulos/pregunta.html'
        })
    }

    function renderBuscador(ListaBuscada, $container){
        ListaBuscada.data.forEach(pregunta => {   
          const HTMLString = preguntaTemplate(pregunta);
          const preguntaElement = createTemplate(HTMLString)
          addEventClick(preguntaElement,pregunta);
          $container.append(preguntaElement);
        });    
    }

    $containerPregunta = document.getElementById('containerPalabraBuscada')
    renderBuscador(respuesta, $containerPregunta)
};

$formSearch.addEventListener('submit',()=>{
    if($textSearch.value === ''){
        $containerpFrecuentes.style.display='block';
        $containerbuscador.style.display='none';
    }else{
        $containerpFrecuentes.style.display='none';
        $containerbuscador.style.display='block';
        $containerPregunta = document.getElementById('containerPalabraBuscada');
        $containerPregunta.innerHTML='';

        var diccionario = ['para', 'donde', 'como', 'desde', 'mismo', 'puede', 'cual', 'partir', 'debe', 'dentro', 'parte', 'fecha', 'sido', 'este', 'pues', 'haber', 'sobre', 'sería', 'esta', 'bien', 'todo', 'forma', 'estas','con', 'todos', 'todas', 'cuales', 'fechas', 'partes', 'estos', 'bajo', 'debió', 'debería', 'falta', 'días', 'tiene', 'tienes', 'misma', 'dicha'];

        const $buscador = textSearch.value;
        let palabrasClave = $buscador.split(' ').filter(counter => counter.length > 2);
        
        for (let j = 0; j < diccionario.length; j++) {
            for (let l = 0; l < palabrasClave.length; l++) {
                if (diccionario[j] == palabrasClave[l]) {
                    palabrasClave.splice(l, 1)
                }
            }
        }
        console.log(palabrasClave.length)

            // preguntaBuscada(palabrasClave)       
        for (let i = 0; i < palabrasClave.length; i++) {
            preguntaBuscada(palabrasClave[i])       
        }
    };
    //http://localhost:3000/api/preguntaBuscada/materia

});

