var app = require('http').createServer(resposta);
var fs = require('fs');
var io = require('socket.io')(app);
var usuarios = [];

app.listen(3000);
console.log("Aplicação está em execução...");

function resposta (req, res) {
     var arquivo = "";
     if(req.url == "/"){
         arquivo = __dirname + '/index.html';
     }else{
         arquivo = __dirname + req.url;
     }
     fs.readFile(arquivo,
         function (err, data) {
              if (err) {
                   res.writeHead(404);
                   return res.end('Página ou arquivo não encontrados');
              }

              res.writeHead(200);
              res.end(data);
         }
     );
}

io.on("connection", function(socket){
    socket.on("entrar", function(apelido, callback){
            if(!(apelido in usuarios)){
                socket.apelido = apelido;
                usuarios[apelido] = socket;

                io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
                io.sockets.emit("atualizar mensagens", "[ " + pegarDataAtual() + " ] ", apelido , " acabou de entrar na sala");

                callback(true);
            }else{
                callback(false);
            }
        });
        socket.on("enviar mensagem", function(mensagem_enviada, callback){
            io.sockets.emit("atualizar mensagens", "[ " + pegarDataAtual() + " ] ",socket.apelido, " diz: " + mensagem_enviada);
            callback();
        });
    });

function pegarDataAtual(){
 var dataAtual = new Date();
 var hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
 var minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();
 var segundo = (dataAtual.getSeconds()<10 ? '0' : '') + dataAtual.getSeconds();

 var dataFormatada = hora + ":" + minuto + ":" + segundo;
 return dataFormatada;
}

