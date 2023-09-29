function MoveForward(ammount)
    if turtle.detect() == false then        
        if turtle.getFuelLevel() > ammount then 
            for i=1, ammount , 1 do
                if turtle.detect() == false then 
                    UpdateCords("forwards")
                    turtle.forward()
                else
                    print("block in the way")
                end
            end
        else
            print("not enough fuel!!")
        end
    else 
        print("block in the way")
    end
end
function TurnLeft()
    UpdateFacing("left")
    turtle.turnLeft()
end
function TurnRight()
    UpdateFacing("right")
    turtle.turnRight()
end
function MoveBackwards(ammount)
    if turtle.getFuelLevel() > ammount then 
        for i=1, ammount , 1 do
            if turtle.back() then 
                UpdateCords("backwards")
            else 
                print("block in the way")
            end
        end
    else
        print("not enough fuel!!")
    end
end
function Turn180()
    UpdateFacing("left")
    turtle.turnLeft()
    UpdateFacing("left")
    turtle.turnLeft()
end
function Refuel()
    turtle.refuel()
    print("refueld, fuel: ".. turtle.getFuelLevel())
end
function MoveUp()
    if turtle.detectUp() == false then
        UpdateCords("up")
        turtle.up()
    else 
        print("block in the way")
    end
end
function MoveDown()
    if turtle.detectDown() == false then
        UpdateCords("down")
        turtle.down()
    else 
        print("block in the way")
    end
end