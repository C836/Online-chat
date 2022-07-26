const interface = document.querySelector("#interface");

const login_form = document.querySelector("#login");
login_form.addEventListener("submit", (form_element) => on_login(form_element));

function on_login(form_element) {
  form_element.preventDefault();

  const form_data = form_element.target;
  const username = form_data.username.value;

  const incognito = !username.trim().length;

  if (!incognito) {
    login(username);
  } else {
    incognito_login();
  }
}

function login(username) {
  socket.emit("entrar", username, function (valido) {
    if (valido) {
      $("#login").fadeOut(200);
      $("#background").removeClass("preLogin");
      $("#interface").removeClass("preLogin");
    } else {
      $("#acesso_usuario").val("");
      alert("Nome já utilizado nesta sala");
    }
  });

  interface.classList.remove("disabled")
}

function incognito_login() {
  $("#background").removeClass("preLogin");
  $("#interface").removeClass("preLogin");

  socket.emit("entrar", `Anônimo`, function (valido) {
    $("#login").fadeOut(200);
  });

  interface.classList.remove("disabled")
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