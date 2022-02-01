arr =  {}
for i=1, 7 do
	print("Enter a number for " .. i .. " position")
	arr[i] = io.read("*n")
end
print("Enter a number for k")
k = io.read("*n")
function twoSum(arr, k)

	i = 1
	j = #arr

	while(i<j) do
		local sum=arr[i]+arr[j];
		if(sum == k) then
			return true
		end
		if(sum < k) then
			i = i+1;
		else
			j = j+1;
		end
	end
	return false
end

print("There is two number in the array that its sum equals " .. k .. " " .. twoSum(arr, k))
