const interface = document.querySelector("#interface");

disable(interface);

const login_form = document.querySelector("#login_form");
login_form.addEventListener("submit", (form_element) => on_login(form_element));

function on_login(form_element) {
  form_element.preventDefault();

  const form_data = form_element.target;
  const username = form_data.username.value;

  const submitter = form_element.submitter.id

  if (submitter === "login") {
    login(username);
  } else if (submitter === "incognito_login") {
    incognito_login();
  }
}

function login(username) {
  socket.emit("entrar", username, (valido) => {
    if (valido) {
      enable(interface);

      disable(login_form)
    } else {
      alert("Nome já utilizado nesta sala");
    }
  });
}

function incognito_login() {
  enable(interface);

  socket.emit("entrar", null)

  disable(login_form)
}

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