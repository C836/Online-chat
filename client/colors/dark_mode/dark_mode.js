document.addEventListener("change", ()=>{
    if(document.getElementById('onOff').checked){
        document.querySelector('#background').style.backgroundColor="var(--escuroBackground)"
        document.querySelector('main').style.backgroundColor="var(--escuroOutline)"

        document.querySelector('#historico').style.backgroundColor="var(--escuroSecundaria)"
        document.querySelector('#mensagem').style.backgroundColor="var(--escuroSecundaria)"
            document.querySelector('#mensagem').style.color="white"

        document.querySelector('#lista_usuarios').style.backgroundColor="var(--escuroSecundaria)"
            document.querySelector('#lista_usuarios').style.color="white"
    } else{
        document.querySelector('#background').style.backgroundColor="var(--claroBackground)"
        document.querySelector('main').style.backgroundColor="var(--claroOutline)"

        document.querySelector('#historico').style.backgroundColor="var(--claroSecundaria)"
            document.querySelector('#historico').style.backgroundColor="var(--claroSecundaria)"
        document.querySelector('#mensagem').style.backgroundColor="var(--claroSecundaria)"
            document.querySelector('#mensagem').style.color="black"

        document.querySelector('#lista_usuarios').style.backgroundColor="var(--claroSecundaria)"
    }
})