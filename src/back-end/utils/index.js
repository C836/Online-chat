function format_nickname(nickname) {
  return nickname.replace(/[`~!@#$%&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
}

function generate_date() {
  const current_time = new Date().toLocaleString('en-US', {
    timeZone: "America/Sao_Paulo",
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

  return current_time;
}

function generate_history (socket, message_list) {
  for (index in message_list) {
    socket.emit("mostrar historico", message_list[index]);
  }
}

module.exports = {
  format_nickname: format_nickname,
  generate_date: generate_date,
  generate_history: generate_history
};
