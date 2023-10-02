print "starting websocket"

require("test")
require("movement")
require("general")
ComName = setName()
require("cords")

local URL = "ws://localhost:8080"

ComID = os.getComputerID()

ws, err = http.websocket(URL)

function SendPos()

    local cords = GetCurrentCords()
    ws.send(string.format( '{ "client": "turtle", "id": %d, "name": "%s", "type": "position", "facing": %d, "cords": {"x": %d,"y": %d, "z": %d}}', ComID, ComName, cords.facing, cords.x, cords.y, cords.z ))
end

local event, url, message
print("requesting connection from: " .. URL)
ws.send( string.format('{"client": "turtle", "type": "connecting", "message": "requesting connection"}'))
repeat
    event, url, message = os.pullEvent("websocket_message")

    message = textutils.unserialiseJSON(message)

    if (message.message == "connection accepted") then
        print("connection established")
        ws.send(string.format( '{"client": "turtle", "type": "connecting", "message": "connection established with turtle ID: %d"}', ComID))
        SendPos()
    end

    if (message.target == "all") then
        if (message.message == "request connection") then
           SendPos()
        end
    end

    if (tonumber(message.target) == ComID) then        
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
    end


until  message == "close connection"