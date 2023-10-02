function DetectBlocks()
    
    print "Detecting Blocks"

    local cords = GetCurrentCords()
    
    turtle.detect()
    if turtle.detect() == true then
        local success, data = turtle.inspect()
        if success then
            print("Block front: ", data.name)
            local block = data
            local message = string.format( '{ "client": "turtle", "id": %d, "type": "block", "facing": %d, "block": "%s", "cords": {"x": %d,"y": %d, "z": %d}}', ComID, cords.facing, block.name, cords.x, cords.y, cords.z )
            
            ws.send(message)
        end
    end
    turtle.detectUp()
    if turtle.detectUp() == true then
        local success, data = turtle.inspectUp()
        if success then
            print("Block up: ", data.name)
            local block = data
            local message = string.format( '{ "client": "turtle", "id": %d, "type": "block", "facing": "up", "block": "%s", "cords": {"x": %d,"y": %d, "z": %d}}', ComID, block.name, cords.x, cords.y, cords.z )
            
            ws.send(message)
        end
    end
    turtle.detectDown()
    if turtle.detectDown() == true then
        local success, data = turtle.inspectDown()
        if success then
            print("Block down: ", data.name)
            local block = data
            -- for i = 0, block.length do 
            --     print(block[i]) 
            --     i = i + 1
            -- end
            
            local message = string.format( '{ "client": "turtle", "id": %d, "type": "block", "facing": "down", "block": "%s", "cords": {"x": %d,"y": %d, "z": %d}}', ComID, block.name, cords.x, cords.y, cords.z )
            
            ws.send(message)
        end
    end
    turtle.turnLeft()
    UpdateFacing("left")
    if turtle.detect() == true then
        local success, data = turtle.inspect()
        if success then
            print("Block left: ", data.name)
            local block = data
            local message = string.format( '{ "client": "turtle", "id": %d, "type": "block", "facing": %d, "block": "%s", "cords": {"x": %d,"y": %d, "z": %d}}', ComID, cords.facing, block.name, cords.x, cords.y, cords.z )
            
            ws.send(message)
        end
    end
    turtle.turnRight()
    UpdateFacing("right")
    turtle.turnRight()
    UpdateFacing("right")
    if turtle.detect() == true then
        print(turtle.detect())
        local success, data = turtle.inspect()
        if success then
            print("Block right: ", data.name)
            local block = data
            local message = string.format( '{ "client": "turtle", "id": %d, "type": "block", "facing": %d, "block": "%s", "cords": {"x": %d,"y": %d, "z": %d}}', ComID, cords.facing, block.name, cords.x, cords.y, cords.z )
            
            ws.send(message)
        end
    end
    turtle.turnLeft()
    UpdateFacing("left")
end