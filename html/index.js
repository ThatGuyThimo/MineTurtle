(async function() {

    const ws = await connectToServer();
    // let connected = ws.

    const detectB = document.getElementById("detect")
    const forwardsB = document.getElementById("forwards")
    const backwardsB = document.getElementById("backwards")
    const turnleftB = document.getElementById("turnleft")
    const turnrightB = document.getElementById("turnright")
    const turn180B = document.getElementById("turn180")
    const refuel = document.getElementById("refuel")
    const moveup = document.getElementById("moveup")
    const movedown = document.getElementById("movedown")

    ws.onmessage = (message) => {
        console.log(message.data)
        message = JSON.parse(message.data);
        console.log(message)
    };        

    detectB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "message": "detect"}))
    });
    forwardsB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "message": "forwards"}))
    });
    backwardsB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "message": "backwards"}))
    });
    turnleftB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "message": "turnleft"}))
    });
    turnrightB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "message": "turnright"}))
    });
    turn180B.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "message": "turn180"}))
    });
    refuel.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "message": "refuel"}))
    });
    moveup.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "message": "moveup"}))
    });
    movedown.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "message": "movedown"}))
    });
        
    async function connectToServer() {    
        const ws = new WebSocket('ws://localhost:8080/ws');
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if(ws.readyState === 1) {
                    clearInterval(timer);
                    resolve(ws);
                }
            }, 10);
        });   
    }

})();