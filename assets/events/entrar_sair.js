socket.on("entrou", function (data, nome, mensagem) {

    var mensagem_formatada = $("<p />").html(
        "<span class='data'>" + data + "</span>" + `<span class="fonte"><b>${nome}</b>` + mensagem).addClass("msg_entrou");

    $("#historico").append(
        $("<div />").html(mensagem_formatada).addClass("div_entrou"));

    document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
});


socket.on("sair", function (data, nome, mensagem) {

    var mensagem_formatada = $("<p />").html(
        "<span class='data'>" + data + "</span>" + `<span class="fonte"><b>${nome}</b>` + mensagem).addClass("msg_saiu");

    $("#historico").append(
        $("<div />").html(mensagem_formatada).addClass("div_saiu"));

    document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
});

socket.on("mostrar historico", function (data, nome, mensagem) {

    var mensagem_formatada = $("<p />").html(
        "<span class='dataHist'>" + data + "</span>" + `<span class="fonte"><b>${nome}</b>` + mensagem).addClass("msg_hist");

    $("#historico").append(
        $("<div />").html(mensagem_formatada));

    document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
});
