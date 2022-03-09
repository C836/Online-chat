var socket = io.connect();
var meuNome = ''

socket.on("limpar_chat", function () {
    $("#historico").text('')
})

socket.on("atualizar mensagens", function (data, nome, mensagem) {
    if (nome === meuNome) {
        var mensagem_formatada = $("<p />").html(
            "<span class='data'>" + data + "</span></br>" + `<span style="font: 400 16px 'Poppins', sans-serif;"><b>${nome}</b>` + mensagem).addClass("msg_propria");
    }

    else {
        var mensagem_formatada = $("<p />").html(
            "<span class='data'>" + data + "</span></br>" + `<span style="font: 400 16px 'Poppins', sans-serif;"><b>${nome}</b>` + mensagem).addClass("msg_outros");
    }

    $("#historico").append(
        $("<div />").html(mensagem_formatada));

    document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
});

socket.on("mensagem privada", function (data, nome, mensagem) {
    var mensagem_formatada = $("<p />").html(
        "<span class='dataHist'>" + data + "</span></br>" + nome + mensagem).addClass("msg_privada");

        $("#historico").append(
            $("<div />").html(mensagem_formatada).addClass("div_saiu"));    

    document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
});

