const $btnAdd = document.getElementById('btnAdd')

$btnAdd.addEventListener('click',()=>{


    const url = `http://localhost:3000/api/addPregunta`

        const data = {};
        data.titulo = document.getElementById('titulo').value
        data.respuesta = document.getElementById('repuesta').value
        data.categoria = document.getElementById('categoria').value

        let JSO = JSON.stringify(data)
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSO, // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => location.reload());
})