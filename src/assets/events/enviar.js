$('#mensagem').keypress(function (e) {
    if ((e.which == 13) && ($("#mensagem").val().replace(/\s/g, '') !== "")) {

        var mensagem = $("#mensagem").val();
        var usuario = $("#lista_usuarios").val();

        socket.emit("enviar mensagem", { msg: mensagem, usu: usuario }, function () {
            $("form#chat #mensagem").val("");
        });
    }
})

$("form#chat").submit(function (e) {
    e.preventDefault();

    if ($(this).find("#mensagem").val().replace(/\s/g, '') !== "") {
        var mensagem = $(this).find("#mensagem").val();
        var usuario = $("#lista_usuarios").val();

        socket.emit("enviar mensagem", { msg: mensagem, usu: usuario }, function () {
            $("form#chat #mensagem").val("");
        });
    }
});
