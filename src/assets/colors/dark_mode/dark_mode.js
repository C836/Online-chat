if(localStorage.getItem("dark")==='on'){
    ligarDark()
    document.querySelector("#onOff").checked = true;
}
else if(localStorage.getItem("dark")==='off'){
    desligarDark();
    document.querySelector("#onOff").checked = false;
}


document.getElementById("toggleDark").addEventListener("change", ()=>{
    console.log("login")
    if(document.getElementById('onOff').checked){
        ligarDark()
    } else{
        desligarDark()
    }
})

document.getElementById("checkMenu").addEventListener("change", ()=>{
    console.log("menu")
    if(document.getElementById("checkMenu").checked){
        ligarDark()
    } else{
        desligarDark()
    }
})

function ligarDark(){
    document.querySelector('#background').style.backgroundColor="var(--escuroBackground)"
    document.querySelector('main').style.backgroundColor="var(--escuroOutline)"

    document.querySelector('#historico').style.backgroundColor="var(--escuroSecundaria)"
    document.querySelector('#mensagem').style.backgroundColor="var(--escuroSecundaria)"
        document.querySelector('#mensagem').style.color="white"

    document.querySelector('#lista_usuarios').style.backgroundColor="var(--escuroSecundaria)"
        document.querySelector('#lista_usuarios').style.color="white"

    document.querySelector("#checkMenu").checked = true;

    localStorage.setItem("dark", "on")
}

function desligarDark(){
    document.querySelector('#background').style.backgroundColor="var(--claroBackground)"
    document.querySelector('main').style.backgroundColor="var(--claroOutline)"

    document.querySelector('#historico').style.backgroundColor="var(--claroSecundaria)"
    document.querySelector('#mensagem').style.backgroundColor="var(--claroSecundaria)"
        document.querySelector('#mensagem').style.color="black"

    document.querySelector('#lista_usuarios').style.backgroundColor="var(--claroSecundaria)"
        document.querySelector('#lista_usuarios').style.color="black"
    
    document.querySelector("#checkMenu").checked = false;

    localStorage.setItem("dark", "off")
}