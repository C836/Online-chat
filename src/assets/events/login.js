const interface = document.querySelector("#interface");
const background = document.querySelector("#background")

disable(interface);
disable(background)

const login_form = document.querySelector("#login_form");
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
      $("#background").removeClass("disabled");
      $("#interface").removeClass("disabled");
      disable(login_form)
    } else {
      $("#acesso_usuario").val("");
      alert("Nome já utilizado nesta sala");
    }
  });
}

function incognito_login() {
  $("#background").removeClass("disabled");
  $("#interface").removeClass("disabled");

  socket.emit("entrar", `Anônimo`, function (valido) {
    $("#login").fadeOut(200);
  });

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