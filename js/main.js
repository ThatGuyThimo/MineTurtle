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

      if(message.message == "detect") {
        wss.broadcast(JSON.stringify({"client": "controller", "message": "detect"}))
      }
      if(message.message == "forwards") {
        wss.broadcast(JSON.stringify({"client": "controller", "message": "forwards"}))
      }
      if(message.message == "backwards") {
        wss.broadcast(JSON.stringify({"client": "controller", "message": "backwards"}))
      }
      if(message.message == "turnleft") {
        wss.broadcast(JSON.stringify({"client": "controller", "message": "turnleft"}))
      }
      if(message.message == "turnright") {
        wss.broadcast(JSON.stringify({"client": "controller", "message": "turnright"}))
      }
      if(message.message == "turn180") {
        wss.broadcast(JSON.stringify({"client": "controller", "message": "turn180"}))
      }
      if(message.message == "refuel") {
        wss.broadcast(JSON.stringify({"client": "controller", "message": "refuel"}))
      }
      if(message.message == "moveup") {
        wss.broadcast(JSON.stringify({"client": "controller", "message": "moveup"}))
      }
      if(message.message == "movedown") {
        wss.broadcast(JSON.stringify({"client": "controller", "message": "movedown"}))
      }
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
        console.log(`turtle: block: ${message.block}`)
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