var app = require('http').createServer(resposta);
var fs = require('fs');
var io = require('socket.io')(app);
var usuarios = [];
var ultimas_mensagens = [];

app.listen(process.env.PORT || 8080);
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
    apelido=apelido.replace(/[`~!@#$%&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')

        if(!(apelido in usuarios)){
            socket.apelido = apelido;
            usuarios[apelido] = socket;

                socket.emit("limpar_chat")

            for(indice in ultimas_mensagens){
                socket.emit("atualizar mensagens", `<span style="color:grey">${ultimas_mensagens[indice]}</span>`,'','');
            }

            io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
            io.sockets.emit("atualizar mensagens", "["+pegarDataAtual()+"] ", apelido , " acabou de entrar na sala");

            callback(true);
        }else{
            callback(false);
        }
    });
    
    socket.on("enviar mensagem", function(dados, callback){

        var mensagem_enviada = dados.msg;
        var mensagem_enviada = mensagem_enviada.replace(/[<>\{\}\[\]\\\/]/gi, '')
        var usuario = dados.usu;

        if(usuario == null)
            usuario = '';

            var obj_mensagem = "["+pegarDataAtual()+"] " + '<span class="msgHist">' + socket.apelido + " diz: " + mensagem_enviada;

            if(usuario == ''){
                    socket.emit("atualizar mensagens", "<span style='color:#CDCDCD'>["+pegarDataAtual()+"]  ",socket.apelido, " diz: " + mensagem_enviada) + "</span>";
                    socket.broadcast.emit("atualizar mensagens", "[ " + pegarDataAtual() + " ] ",socket.apelido, " diz: " + mensagem_enviada);
                    
                    armazenaMensagem(obj_mensagem);
            }else{
                    socket.emit("atualizar mensagens", "<span style='color:#CDCDCD'>["+pegarDataAtual()+"] ","você", ` diz para <span style='color:red'>${usuario}</span>: ` + mensagem_enviada) + "</span>";
                    usuarios[usuario].emit("atualizar mensagens", "<span style='color:grey'>["+pegarDataAtual()+"] ",socket.apelido, " diz para você: " + mensagem_enviada + "</span>");
            }
     
            callback();
    });

    socket.on("disconnect", function(){
        delete usuarios[socket.apelido];
        io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
        io.sockets.emit("atualizar mensagens", "["+pegarDataAtual()+"] " ,socket.apelido, " saiu da sala");
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

function armazenaMensagem(mensagem){
    if(ultimas_mensagens.length > 5){
        ultimas_mensagens.shift();
    }

    ultimas_mensagens.push(mensagem);
}
