function averagePair(sortedArray, targetAverage){
	if(sortedArray.length < 2){
		return false
	}
	let i = 0;
	let j = sortedArray.length - 1;
	let target = targetAverage*2;
	while(i < j){
		let sum = sortedArray[i]+sortedArray[j];
		let diff = sum - target;
		if( !diff ){
			return true
		}
		else{
			if(diff > 0){
				j-=1
			}
			else{
				i+=1
			}
		}
	}
	return false
}