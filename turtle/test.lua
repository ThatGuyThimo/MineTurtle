function DetectBlocks()
    
    print "Detecting Blocks"
    
    turtle.detect()
    if turtle.detect() == true then
        local success, data = turtle.inspect()
        if success then
            print("Block front: ", data.name)
            local block = data
            local message = string.format( '{ "client": "turtle", "type": "block", "facing": "front", "block": "[%s]", "cords": {"x":[],"y":[]}}', block.name  )
            
            ws.send(message)
        end
    end
    turtle.detectUp()
    if turtle.detectUp() == true then
        local success, data = turtle.inspectUp()
        if success then
            print("Block up: ", data.name)
            local block = data
            local message = string.format( '{ "client": "turtle", "type": "block", "facing": "up", "block": "[%s]", "cords": {"x":[],"y":[]}}', block.name  )
            
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
            
            local message = string.format( '{ "client": "turtle", "type": "block", "facing": "down", "block": "[%s]", "cords": {"x":[],"y":[]}}', block.name  )
            
            ws.send(message)
        end
    end
    turtle.turnLeft()
    turtle.detect()
    if turtle.detect() == true then
        local success, data = turtle.inspect()
        if success then
            print("Block left: ", data.name)
            local block = data
            local message = string.format( '{ "client": "turtle", "type": "block", "facing": "left", "block": "[%s]", "cords": {"x":[],"y":[]}}', block.name  )
            
            ws.send(message)
        end
    end
    turtle.turnRight()
    turtle.turnRight()
    turtle.detect()
    if turtle.detect() == true then
        local success, data = turtle.inspect()
        if success then
            print("Block right: ", data.name)
            local block = data
            local message = string.format( '{ "client": "turtle", "type": "block", "facing": "right", "block": "[%s]", "cords": {"x":[],"y":[]}}', block.name  )
            
            ws.send(message)
        end
    end
    turtle.turnLeft()
end