const { format_nickname, generate_date, generate_history } = require('./utils/index')

function entrar(socket, io, input_apelido, usuarios, ultimas_mensagens, callback) {
  const apelido = !input_apelido 
    ? null
    : format_nickname(input_apelido)

  if(apelido in usuarios) {
    callback(false);
    return
  }

  socket.apelido = apelido;
  usuarios[apelido] = socket;

  socket.emit("limpar_chat");
  io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
  generate_history(socket, ultimas_mensagens)

  io.sockets.emit(
    "entrou",
    generate_date(),
    apelido,
    " entrou na sala"
  );

  if(apelido) {
    callback(true);
    return
  }
}

function enviar_mensagem(socket, usuarios, dados, ultimas_mensagens, callback) {
  var mensagem_enviada = dados.msg;
  var mensagem_enviada = mensagem_enviada.replace(/[<>\{\}\[\]\\\/]/gi, "");
  var usuario = dados.usu;

  if (usuario == null) usuario = "";

  const obj_mensagem = {data: generate_date(), nome: socket.apelido, mensagem: mensagem_enviada}

  if (usuario == "") {
    socket.emit(
      "atualizar mensagens",
      generate_date(),
      socket.apelido,
      ": " + mensagem_enviada
    );
    socket.broadcast.emit(
      "atualizar mensagens",
      generate_date(),
      socket.apelido,
      ": " + mensagem_enviada
    );
    armazenaMensagem(ultimas_mensagens, obj_mensagem);
  } else if (usuario.length > 1 || socket.apelido === usuario.toString()) {
    callback();
  } else {
    socket.emit(
      "mensagem privada",
      generate_date(),
      "",
      ` Para <b>${usuario}</b>: ` + mensagem_enviada
    );
    usuarios[usuario].emit(
      "mensagem privada",
      generate_date(),
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
    "(" + generate_date() + ") ",
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
