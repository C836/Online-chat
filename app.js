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

        if(apelido==='Anônimo'){
            socket.apelido = apelido;
            usuarios[apelido] = socket;

                socket.emit("limpar_chat")

            for(indice in ultimas_mensagens){
                socket.emit("mostrar historico", ultimas_mensagens[indice],'','');
            }

            io.sockets.emit("atualizar usuarios", Object.keys(usuarios));

            socket.emit("entrou", "["+pegarDataAtual()+"] ", apelido , " entrou na sala");

            socket.broadcast.emit("entrou", "["+pegarDataAtual()+"] ", apelido , " acabou de entrar na sala");

            callback(true);
        }

        else if(!(apelido in usuarios)){
            socket.apelido = apelido;
            usuarios[apelido] = socket;

                socket.emit("limpar_chat")

            for(indice in ultimas_mensagens){
                socket.emit("mostrar historico", ultimas_mensagens[indice],'','');
            }

            io.sockets.emit("atualizar usuarios", Object.keys(usuarios));

            socket.emit("entrou", "["+pegarDataAtual()+"] ", apelido , " entrou na sala");

            socket.broadcast.emit("entrou", "["+pegarDataAtual()+"] ", apelido , " acabou de entrar na sala");

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
                    socket.emit("atualizar mensagens", '['+pegarDataAtual()+'] '  ,socket.apelido, " diz: " + mensagem_enviada);
                    socket.broadcast.emit("atualizar mensagens", "[" + pegarDataAtual() + "] ",socket.apelido, " diz: " + mensagem_enviada);
                    
                    armazenaMensagem(obj_mensagem);
            }else{
                    socket.emit("mensagem privada", '['+pegarDataAtual()+'] ', '' , ` Para <b>${usuario}</b>: ` + mensagem_enviada);
                    usuarios[usuario].emit("mensagem privada", '['+pegarDataAtual()+'] ','<b>'+socket.apelido+'</b>', ` diz para você: ` + mensagem_enviada);
            }
     
            callback();
    });

    socket.on("disconnect", function(){
        delete usuarios[socket.apelido];
        io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
        io.sockets.emit("sair", "["+pegarDataAtual()+"] " ,socket.apelido, " saiu da sala");
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
