const $btnLogin = document.getElementById('btnLogin');
const $pass = document.getElementById('pass');
const $user = document.getElementById('user');

const verificarUsuario = async (user, pass) => {
    const API = await fetch(`http://localhost:3000/api/verificarUsuario/${user}/${pass}`);
    const res = await API.json();
debugger
    if(res.data.length != 0){
        
        window.sessionStorage.setItem('log','true')
        location.href = '../index.html'
        
    }else{
        window.sessionStorage.setItem('log','false')
        location.href = '../index.html'
        
    }
    
}

$btnLogin.addEventListener('click',()=>{

    verificarUsuario($user.value, $pass.value)

})

