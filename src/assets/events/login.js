$('#interface').css('pointer-events','none');

$("form#login").submit(function (e) {
    e.preventDefault();

    if ($("#apelido").val() != "") {
        meuNome = $("#apelido").val()
        socket.emit("entrar", $(this).find("#apelido").val(), function (valido) {

            if (valido) {
                $("#login").fadeOut(200);
                $("#background").removeClass("preLogin")
                $("#interface").removeClass("preLogin")
            } else {
                $("#acesso_usuario").val("");
                alert("Nome já utilizado nesta sala");
            }
        });

        $('#interface').css('pointer-events','auto');
    }
});

$("#anon").click(function () {

    $("#background").removeClass("preLogin")
    $("#interface").removeClass("preLogin")

    socket.emit("entrar", `Anônimo`, function (valido) {
        $("#login").fadeOut(200);
    });

    $('#interface').css('pointer-events','auto');
});

socket.on("atualizar usuarios", function (usuarios) {
    $("#lista_usuarios").empty();
    $("#lista_usuarios").append("<option value=''>Todos</option>");
    $.each(usuarios, function (indice) {
        var opcao_usuario = $("<option />").text(usuarios[indice]);
        if (usuarios[indice] !== 'Anônimo') {
            $("#lista_usuarios").append(opcao_usuario)
        }
    });
});