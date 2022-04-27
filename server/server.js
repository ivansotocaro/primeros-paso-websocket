const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = Esta es la comunicacion con el backend
let io = socketIO(server)

io.on('connection', (client) => {
  console.log('usuario conectado');

  client.on('disconnect', () => {
    console.log('Usuario desconectado')
  });

  //Escuchar el cliente 
  client.on('enviarMensaje', (mensaje) => {
    console.log(mensaje);
  })

})

server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});

