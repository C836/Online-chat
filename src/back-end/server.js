const { formatar_apelido, gerar_data } = require('./utils/index')

function entrar(socket, io, input_apelido, usuarios, ultimas_mensagens, callback) {
  const apelido = !input_apelido 
    ? null
    : formatar_apelido(input_apelido)

  if (!apelido) {
    socket.apelido = "Anônimo";
    usuarios["Anônimo"] = socket;

    socket.emit("limpar_chat");

    for (indice in ultimas_mensagens) {
      socket.emit("mostrar historico", ultimas_mensagens[indice], "", "");
    }

    io.sockets.emit("atualizar usuarios", Object.keys(usuarios));

    socket.emit("entrou", gerar_data(), "Anônimo", " entrou na sala");

    socket.broadcast.emit(
      "entrou",
      gerar_data(),
      "Anônimo",
      " acabou de entrar na sala"
    );
  } else if (!(apelido in usuarios)) {
    socket.apelido = apelido;
    usuarios[apelido] = socket;

    socket.emit("limpar_chat");

    for (indice in ultimas_mensagens) {
      socket.emit("mostrar historico", ultimas_mensagens[indice], "", "");
    }

    io.sockets.emit("atualizar usuarios", Object.keys(usuarios));

    socket.emit(
      "entrou",
      gerar_data(),
      apelido,
      " entrou na sala"
    );

    socket.broadcast.emit(
      "entrou",
      gerar_data(),
      apelido,
      " acabou de entrar na sala"
    );

    callback(true);
  } else {
    callback(false);
  }
}

function enviar_mensagem(socket, usuarios, dados, ultimas_mensagens, callback) {
  var mensagem_enviada = dados.msg;
  var mensagem_enviada = mensagem_enviada.replace(/[<>\{\}\[\]\\\/]/gi, "");
  var usuario = dados.usu;

  if (usuario == null) usuario = "";

  const obj_mensagem = {data: gerar_data(), nome: socket.apelido, mensagem: mensagem_enviada}

  if (usuario == "") {
    socket.emit(
      "atualizar mensagens",
      gerar_data(),
      socket.apelido,
      ": " + mensagem_enviada
    );
    socket.broadcast.emit(
      "atualizar mensagens",
      gerar_data(),
      socket.apelido,
      ": " + mensagem_enviada
    );
    armazenaMensagem(ultimas_mensagens, obj_mensagem);
  } else if (usuario.length > 1 || socket.apelido === usuario.toString()) {
    callback();
  } else {
    socket.emit(
      "mensagem privada",
      gerar_data(),
      "",
      ` Para <b>${usuario}</b>: ` + mensagem_enviada
    );
    usuarios[usuario].emit(
      "mensagem privada",
      gerar_data(),
      "<b>" + socket.apelido + "</b>",
      ` diz para você: ` + mensagem_enviada
    );
  }

  callback();
}

function desconectar(socket, io, usuarios) {
  delete usuarios[socket.apelido];
  io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
  io.sockets.emit(
    "sair",
    "(" + gerar_data() + ") ",
    socket.apelido,
    " saiu da sala"
  );
}

function armazenaMensagem(ultimas_mensagens, mensagem) {
  if (ultimas_mensagens.length > 5) {
    ultimas_mensagens.shift();
  }

  ultimas_mensagens.push(mensagem);
}

module.exports = {
  entrar: entrar,
  enviar_mensagem: enviar_mensagem,
  desconectar: desconectar
};
