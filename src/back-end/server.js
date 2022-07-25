function entrar(socket, io, apelido, usuarios, ultimas_mensagens, callback) {
  apelido = apelido.replace(/[`~!@#$%&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");

  if (apelido === "Anônimo") {
    socket.apelido = apelido;
    usuarios[apelido] = socket;

    socket.emit("limpar_chat");

    for (indice in ultimas_mensagens) {
      socket.emit("mostrar historico", ultimas_mensagens[indice], "", "");
    }

    io.sockets.emit("atualizar usuarios", Object.keys(usuarios));

    socket.emit(
      "entrou",
      "(" + pegarDataAtual() + ") ",
      apelido,
      " entrou na sala"
    );

    socket.broadcast.emit(
      "entrou",
      "(" + pegarDataAtual() + ") ",
      apelido,
      " acabou de entrar na sala"
    );

    callback(true);
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
      "(" + pegarDataAtual() + ") ",
      apelido,
      " entrou na sala"
    );

    socket.broadcast.emit(
      "entrou",
      "(" + pegarDataAtual() + ") ",
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

  var obj_mensagem =
    "(" +
    pegarDataAtual() +
    ") " +
    '<span class="msgHist">' +
    socket.apelido +
    ": " +
    mensagem_enviada;

  if (usuario == "") {
    socket.emit(
      "atualizar mensagens",
      "(" + pegarDataAtual() + ") ",
      socket.apelido,
      ": " + mensagem_enviada
    );
    socket.broadcast.emit(
      "atualizar mensagens",
      "(" + pegarDataAtual() + ") ",
      socket.apelido,
      ": " + mensagem_enviada
    );
    armazenaMensagem(ultimas_mensagens, obj_mensagem);
  } else if (usuario.length > 1 || socket.apelido === usuario.toString()) {
    callback();
  } else {
    socket.emit(
      "mensagem privada",
      "(" + pegarDataAtual() + ") ",
      "",
      ` Para <b>${usuario}</b>: ` + mensagem_enviada
    );
    usuarios[usuario].emit(
      "mensagem privada",
      "(" + pegarDataAtual() + ") ",
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
    "(" + pegarDataAtual() + ") ",
    socket.apelido,
    " saiu da sala"
  );
}

function pegarDataAtual() {
  var dataAtual = new Date().toLocaleString("en-US", {
    timeZone: "America/Sao_Paulo",
  });
  dataAtual = dataAtual.split(" ");
  var periodo = dataAtual[2];
  dataAtual = dataAtual[1].split(":");

  var hora = (dataAtual[0] < 10 ? "0" : "") + dataAtual[0];
  var minuto = dataAtual[1];
  var segundo = dataAtual[2];

  var dataFormatada = hora + ":" + minuto + ":" + segundo + " " + periodo;
  return dataFormatada;
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
