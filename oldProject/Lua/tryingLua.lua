--Trying Lua and learning
--[[
	New language learning to apply ni mod development for Starbound Game
]]

print("Your User:")
name= io.read()

function looping()
	spacing()

	print("looping function running...")
	spacing()
	print("please enter a number")
	n = io.read("*n")
	
	spacing()
	for i=1,n do
		print(i)
	end
	spacing()
	print("going back")
	spacing()
	for i=n,1,-2 do
		print(i)
	end
end

function printingOptions()
	spacing()
	print("Wht do u want to do?")
	spacing()
	print("1 loop")
	print("2 just say hello")
	print("3 Shut down")
	spacing()
	option = io.read("*n")
	if option ~= 1 and option ~= 2 and option ~= 3 then
		spacing()
		print("option", option)
		spacing()
		print("option ~= 1", option ~= 1)
		print("option ~= 2", option ~= 2)
		print("option ~= 3", option ~= 3)
		printingOptions()
	elseif option == 1 then
		looping()
	elseif option == 2 then
		sayHello(name)
	elseif option == 3 then
		shutingDown()
	end
end

function sayHello(nameToUse)
	spacing()
	print("Hello " .. nameToUse)
	shutingDown()
end

function shutingDown()
	spacing()
	print("Good bye " .. name)
	spacing()
end

function spacing()
	print(" ")
end

spacing()
print("Welcome " .. name)
printingOptions()