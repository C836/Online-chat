var socket = io.connect();
    var meuNome = ''

    $('#mensagem').keypress(function (e) {
    if ((e.which == 13)&&($("#mensagem").val().replace(/\s/g, '')!=="")) {

        var mensagem = $("#mensagem").val();
        var usuario = $("#lista_usuarios").val();

        socket.emit("enviar mensagem", {msg: mensagem, usu: usuario}, function(){
        $("form#chat #mensagem").val("");
        });
    }
})

    $("form#chat").submit(function(e){
        e.preventDefault();

        if($(this).find("#mensagem").val().replace(/\s/g, '')!==""){
            var mensagem = $(this).find("#mensagem").val();
            var usuario = $("#lista_usuarios").val();

            socket.emit("enviar mensagem", {msg: mensagem, usu: usuario}, function(){
            $("form#chat #mensagem").val("");
            });
        }
    });

        socket.on("limpar_chat", function(){
            $("#historico").text('')
        })

        socket.on("entrou", function(data,nome,mensagem){

            var mensagem_formatada = $("<p />").html(
                data+`<span style="font: 400 16px 'Poppins', sans-serif;"><b>${nome}</b>`+mensagem).addClass("msg_entrou");

            $("#historico").append(
                $("<div />").html(mensagem_formatada).addClass("div_entrou"));
        
        document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
        });

        socket.on("sair", function(data,nome,mensagem){

            var mensagem_formatada = $("<p />").html(
                data+`<span style="font: 400 16px 'Poppins', sans-serif;"><b>${nome}</b>`+mensagem).addClass("msg_saiu");

            $("#historico").append(
                $("<div />").html(mensagem_formatada).addClass("div_saiu"));

            document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
            });

        socket.on("atualizar mensagens", function(data,nome,mensagem){
            if(nome===meuNome){
                var mensagem_formatada = $("<p />").html(
                    data+`<span style="font: 400 16px 'Poppins', sans-serif;"><b>${nome}</b>`+mensagem).addClass("msg_propria");}
            else{
                var mensagem_formatada = $("<p />").html(
                    data+`<span style="font: 400 16px 'Poppins', sans-serif;"><b>${nome}</b>`+mensagem).addClass("msg_outros");}

        $("#historico").append(
            $("<div />").html(mensagem_formatada));
        
        document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
    });

        socket.on("mensagem privada", function(data,nome,mensagem){

                var mensagem_formatada = $("<p />").html(
                    data+nome+mensagem).addClass("msg_privada");

            $("#historico").append(
                $("<div />").html(mensagem_formatada));
            
            document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
        });

        socket.on("mostrar historico", function(data,nome,mensagem){

                var mensagem_formatada = $("<p />").html(
                    data+`<span style="font: 400 16px 'Poppins', sans-serif;"><b>${nome}</b>`+mensagem).addClass("msg_hist");

            $("#historico").append(
                $("<div />").html(mensagem_formatada));
            
            document.getElementById("historico").scrollTop = document.getElementById("historico").scrollHeight;
        });

    $("form#login").submit(function(e){
    e.preventDefault();

    if($("#apelido").val()!=""){
        meuNome=$("#apelido").val()
        socket.emit("entrar", $(this).find("#apelido").val(), function(valido){
            $("#background").removeClass("preLogin")
            $("#interface").removeClass("preLogin")

            if(valido){
                $("#login").fadeOut(200);
            }else{
                $("#acesso_usuario").val("");
                alert("Nome já utilizado nesta sala");
            }
        });
    }
});

    $("#anon").click(function() {

        $("#background").removeClass("preLogin")
        $("#interface").removeClass("preLogin")

        socket.emit("entrar", `Anônimo`, function(valido){
            $("#login").fadeOut(200);
    });
    });

socket.on("atualizar usuarios", function(usuarios){
$("#lista_usuarios").empty();
$("#lista_usuarios").append("<option value=''>Todos</option>");
    $.each(usuarios, function(indice){
        var opcao_usuario = $("<option />").text(usuarios[indice]);
            if(usuarios[indice]!=='Anônimo'){
                $("#lista_usuarios").append(opcao_usuario)}
        });
});
