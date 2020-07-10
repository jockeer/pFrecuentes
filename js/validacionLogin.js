const $btnadd = document.getElementById('btnadd')
if(sessionStorage.getItem('log') === 'true'){
    $btnadd.style.display = 'block'
}else{
    $btnadd.style.display = 'none'
}