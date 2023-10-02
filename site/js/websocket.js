import {addBlock, addTurtle, slectedTurtleHighlighter, turnTurtle} from "./treejs";
(async function() {
    
    const turtles = [] 
    const ws = await connectToServer();
    let defaultTurtle = false
    let selectedTurtle
    // let connected = ws.

    ws.onmessage = (message) => {
        message = JSON.parse(message.data);
    
        if(message.client == "turtle") {
            console.log(message)
            if (message.id != turtles[message.id]) {
                turtles[message.id] = message.id
                let option = document.createElement('option');
                option.value = message.id
                option.text = message.id
                if(!defaultTurtle) {
                    defaultTurtle = true
                    selectedTurtle = message.id
                }

                selectorS.appendChild(option)
            }

            if(message.type == "position") {
                addTurtle(message.cords.x, message.cords.y, message.cords.z, message.facing, message.id)
                turnTurtle(message.facing, message.id)
            }

            if (message.type == "block") {
                switch(message.facing) {
                    case 1:
                        console.log(message.cords.z -1)
                        addBlock(message.cords.x, message.cords.y, message.cords.z -1)
                        break;
                    case 2:
                        console.log(message.cords.x +1)
                        addBlock(message.cords.x +1, message.cords.y, message.cords.z)
                        break;
                    case 3:
                        console.log(message.cords)
                        addBlock(message.cords.x, message.cords.y, message.cords.z +1)
                        break;
                    case 4:
                        console.log(message.cords)
                        addBlock(message.cords.x -1, message.cords.y, message.cords.z)
                        break;
                    case "up":
                        console.log(message.cords)
                        addBlock(message.cords.x, message.cords.y +1, message.cords.z)
                        break;
                    case "down":
                        console.log(message.cords)
                        addBlock(message.cords.x, message.cords.y -1, message.cords.z)
                        break;
                }
            }
        }
    };   

    const detectB = document.getElementById("detect")
    const forwardsB = document.getElementById("forwards")
    const backwardsB = document.getElementById("backwards")
    const turnleftB = document.getElementById("turnleft")
    const turnrightB = document.getElementById("turnright")
    const turn180B = document.getElementById("turn180")
    const refuelB = document.getElementById("refuel")
    const moveupB = document.getElementById("moveup")
    const movedownB = document.getElementById("movedown")
    const detectTurtlesB = document.getElementById("detectTurtles")
    const selectorS = document.getElementById("turtleSelector")


    detectB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": parseInt(selectedTurtle), "message": "detect"}));
    });
    forwardsB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": parseInt(selectedTurtle), "message": "forwards"}));
    });
    backwardsB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": parseInt(selectedTurtle), "message": "backwards"}));
    });
    turnleftB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": parseInt(selectedTurtle), "message": "turnleft"}));
    });
    turnrightB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": parseInt(selectedTurtle), "message": "turnright"}));
    });
    turn180B.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": parseInt(selectedTurtle), "message": "turn180"}));
    });
    refuelB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": parseInt(selectedTurtle), "message": "refuel"}));
    });
    moveupB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": parseInt(selectedTurtle), "message": "moveup"}));
    });
    movedownB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": parseInt(selectedTurtle), "message": "movedown"}));
    });
    detectTurtlesB.addEventListener("click", function() {
        ws.send(JSON.stringify({"client": "controller", "target": "all", "message": "request connection"}));
    });

    selectorS.addEventListener("change", function() {
        selectedTurtle = this.value
        slectedTurtleHighlighter(this.value)
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