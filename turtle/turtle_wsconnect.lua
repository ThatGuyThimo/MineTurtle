print "starting websocket"

require("test")
require("movement")
require("cords")

local URL = "ws://localhost:8080"
ws, err = http.websocket(URL)

local event, url, message
print("requesting connection from: " .. URL)
ws.send( string.format('{"client": "turtle", "type": "connecting", "message": "requesting connection"}'))
repeat
    event, url, message = os.pullEvent("websocket_message")

    message = textutils.unserialiseJSON(message)

    if (message.message == "connection accepted") then
        print("connection established")
        ws.send(string.format( '{"client": "turtle", "type": "connecting", "message": "connection established with turtle ID: [%s]"}',os.computerID()))
    end

    if (message.message == "detect") then
        DetectBlocks()
    end
    if (message.message == "forwards") then
        MoveForward(1)
    end
    if (message.message == "backwards") then
        MoveBackwards(1)
    end
    if (message.message == "turnleft") then
        TurnLeft()
    end
    if (message.message == "turnright") then
        TurnRight()
    end
    if (message.message == "turn180") then
        Turn180()
    end
    if (message.message == "refuel") then
        Refuel()
    end
    if (message.message == "moveup") then
        MoveUp()
    end
    if (message.message == "movedown") then
        MoveDown()
    end


until  message == "close connection"
