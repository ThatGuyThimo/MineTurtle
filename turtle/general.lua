function setName()
    if fs.exists('./data.json') then
        local fileData = fs.open('./data.json', "r")
        local data = fileData.readAll()
        data = textutils.unserialiseJSON(data)
        fileData.close()

        if data.name ~= nil then
            os.setComputerLabel(data.name)
            return data.name

        elseif fs.exists('./names.json') then
            local fileNames = fs.open('./names.json', "r")
            local names = fileNames.readAll()
            names = textutils.unserialiseJSON(names)
            local name = names.names[math.random(0,#(names.names))]
            
            fileNames.close()
            print(name)

            os.setComputerLabel(name)

            fileData = fs.open('./data.json', "w")
            data.name = name
            -- print(dataF)
            fileData.write(textutils.serialiseJSON(data))
            fileData.close()
            
            return name
        end
    end
end