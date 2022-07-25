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

module.exports = {
  formatar_apelido: formatar_apelido,
  gerar_data: gerar_data
};
