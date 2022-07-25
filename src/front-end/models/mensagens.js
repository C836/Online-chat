class Mensagem {
  constructor(data, nome, mensagem) {
    this.data = data;
    this.nome = nome;
    this.mensagem = mensagem;
  }

  entrou() {

    const p_data = document.createElement("span");
    const p_data_texto = document.createTextNode(this.data)
    p_data.classList.add("data");
    p_data.appendChild(p_data_texto);


    const p_nome = document.createElement("span");
    const p_nome_texto = document.createTextNode(this.nome)
    p_nome.classList.add("nome");
    p_nome.appendChild(p_nome_texto);


    const p_mensagem = document.createElement("span");
    const p_mensagem_texto = document.createTextNode(this.mensagem)
    p_mensagem.classList.add("mensagem");
    p_mensagem.appendChild(p_mensagem_texto);


    const p = document.createElement("p");
    p.appendChild(p_data);
    p.appendChild(p_nome)
    p.appendChild(p_mensagem)
    p.classList.add("entrou");

    return p
  }
}

