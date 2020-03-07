function minSubArrayLen(arr: Array<number>, numb:number) :number{
	let 
		minLength:number = Infinity,
		totalSum:number = 0,
		winStart:number = 0,
		winEnd:number = 0;
	
	while(winStart < arr.length){
		if(arr[winEnd] === numb || arr[winEnd] > numb){
			return 1
		}
		console.log("totalSum < sum?")
		if(totalSum < numb && winEnd < arr.length){
			totalSum += arr[winEnd];
			winEnd++;
		}
		else if (totalSum >= numb){
			
			minLength = Math.min(minLength, ((winEnd) - (winStart)));
			if(minLength !== Infinity){
			}
			totalSum -= arr[winStart];
			winStart++;
		}
		else {
			break;
		}
	}

	return (minLength === Infinity)?(0):(minLength);
}