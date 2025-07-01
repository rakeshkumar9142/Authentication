const http = require('http');
const WebSocketServer = require('websocket').server
let connection = null;

const httpServer = http.createServer((req,res) => {
    console.log('We have received a request');
})

const webSocket = new WebSocketServer({
    'httpServer' : httpServer
})

webSocket.on('request',request => {
    
   connection = request.accept(null,request.origin);
   connection.on('onopen',() => console.log("opened!!!"));
   connection.on('onclose', () => console.log('CLOSED'));
   connection.on('onmessage',message => {
    console.log(`Received message ${message}`);
   })

})

httpServer.listen(8000,() => {
    console.log('server is listening on port : 8000');
})