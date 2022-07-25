var app = require("http").createServer(resposta);
var fs = require("fs");
var io = require("socket.io")(app);
var usuarios = [];
var ultimas_mensagens = [];

const { entrar, enviar_mensagem, desconectar } = require("./src/back-end/server.js");

app.listen(process.env.PORT || 8080);

function resposta(req, res) {
  var arquivo = "";
  if (req.url == "/") {
    arquivo = "./src/front-end/index.html";
  } else {
    arquivo = __dirname + req.url;
  }

  fs.readFile(arquivo, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("Página ou arquivo não encontrados");
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on("connection", function (socket) {
  socket.on("entrar", (apelido, callback) => entrar(socket, io, apelido, usuarios, ultimas_mensagens, callback));

  socket.on("enviar mensagem", (dados, callback) => enviar_mensagem(socket, usuarios, dados, ultimas_mensagens, callback) );

  socket.on("disconnect", () => desconectar(socket, io, usuarios));
});
