function formatar_apelido(apelido) {
  return apelido.replace(/[`~!@#$%&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
}

function gerar_data() {
  const horario_atual = new Date().toLocaleString('en-US', {
    timeZone: "America/Sao_Paulo",
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

  return horario_atual;
}

function generate_history (socket, message_list) {
  for (index in message_list) {
    socket.emit("mostrar historico", message_list[index]);
  }
}

module.exports = {
  formatar_apelido: formatar_apelido,
  gerar_data: gerar_data,
  generate_history: generate_history
};
