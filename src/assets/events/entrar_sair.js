const historico = document.querySelector("#historico");

socket.on("entrou", function (data, nome, mensagem) {
  const mensagem_formatada = new Mensagem(data, nome, mensagem).formatar("entrou");

  const container = new Mensagem().container(mensagem_formatada, "entrou_container")
  
  historico.appendChild(container);
  historico.scrollTop = historico.scrollHeight;
});


socket.on("sair", function (data, nome, mensagem) {
  if(nome!==null){
    const mensagem_formatada = new Mensagem(data, nome, mensagem).formatar("saiu");

    const container = new Mensagem().container(mensagem_formatada, "saiu_container")
    
    historico.appendChild(container);
    historico.scrollTop = historico.scrollHeight
  }
});

socket.on("mostrar historico", function (objeto_mensagem) {
  const { nome, data, mensagem } = objeto_mensagem;
  const mensagem_formatada = new Mensagem(data, nome, mensagem).formatar("historico");

  const container = new Mensagem().container(mensagem_formatada)
  
  historico.appendChild(container);
  historico.scrollTop = historico.scrollHeight
});

