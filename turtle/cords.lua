print "Cords Loaded"
local cords = {}
local path = "data.json"
local directions = {"north", "east", "south", "west"}

if fs.exists(path) then
    local file = fs.open(path, "r")
    local data = file.readAll()
    data = textutils.unserialiseJSON(data)

    cords["facing"] = data.facing
    cords["x"] = data.x
    cords["y"] = data.y
    cords["z"] = data.z
    file.close()
else
    ws.send(string.format('"client": "turtle", "type": "error", "message": "file: data.json not found!"'))
end

function UpdateCords(direction)
    if direction == "forwards" then
    
        --north
        if "north" == directions[cords["facing"]] then
            cords["z"] = cords["z"] -1 
        end
        --east
        if "east" == directions[cords["facing"]] then
            cords["x"] = cords["x"] +1 
        end
        --south
        if "south" == directions[cords["facing"]] then
            cords["z"] = cords["z"] +1 
        end
        --west
        if "west" == directions[cords["facing"]] then
            cords["x"] = cords["x"] -1 
        end

    elseif direction == "backwards" then

        --north
        if "north" == directions[cords["facing"]] then
            cords["z"] = cords["z"] +1 
        end
        --east
        if "east" == directions[cords["facing"]] then
            cords["x"] = cords["x"] -1 
        end
        --south
        if "south" == directions[cords["facing"]] then
            cords["z"] = cords["z"] -1 
        end
        --west
        if "west" == directions[cords["facing"]] then
            cords["x"] = cords["x"] +1 
        end
    end

    if direction == "up" then
        cords["y"] = cords["y"] +1
    elseif direction == "down" then
        cords["y"] = cords["y"] -1
    end

    GetCurrentCords()
    UpdateFile()

end

function UpdateFacing(turnDirection)
    if turnDirection == "left" then

        if cords["facing"] <= 1 then
            cords["facing"] = 4
        else
            cords["facing"] = cords["facing"] -1
        end

    elseif turnDirection == "right" then

        if cords["facing"] >= 4 then
            cords["facing"] = 1
        else
            cords["facing"] = cords["facing"] +1
        end
    end

    UpdateFile()
    print(directions[cords["facing"]])
end

function UpdateFile()
    if fs.exists(path) then
        local file = fs.open(path, "w")
        file.write(textutils.serialiseJSON(cords))
        file.close()
    end
end

function GetCurrentCords()
    print("facing", cords["facing"])
    print("x", cords["x"])
    print("y", cords["y"])
    print("z", cords["z"])
end