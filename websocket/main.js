import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const clients = new Map();

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  const id = uuidv4();
  const color = Math.floor(Math.random() * 360);
  const metadata = { id, color };

  clients.set(ws, metadata);

  // console.log(clients)

  ws.on('message', function message(message, isBinary) {

    const metadata = clients.get(ws);

    // console.log(message)
    message = JSON.parse(message)
    // console.log(message)

    if(message.client == "controller") {

      console.log(`${message.client}: ${message.message}`)
      console.log(message)

      wss.broadcast(JSON.stringify(message))
    }


    if(message.client == "turtle") {
      if(message.type == "connecting") {
        if(message.message == "requesting connection") {
          ws.send(JSON.stringify({"message": "connection accepted"})) 
        } else {
          console.log(message.message)
        }
      }
      if(message.type == "block") {
        console.log(`turtle:${message.id} block: ${message.block}`)
        wss.broadcast(JSON.stringify(message))
      }
      if(message.type == "position") {
        console.log(`turtle:${message.id} movedTo: x${message.cords.x} y${message.cords.y} z${message.cords.z} facing: ${message.facing}`)
        console.log(message)
        wss.broadcast(JSON.stringify(message))
      }

    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });

});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
      client.send(msg);
   });
};

console.log("wss running");