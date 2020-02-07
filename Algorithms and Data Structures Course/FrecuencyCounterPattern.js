// Code Example of Frecuency Counter Pattern
function same(arr1, arr2){
	// console.log(`Arr1 Length: ${arr1.length}, Arr2 length: ${arr2.length}`)
	if(arr1.length !== arr2.length){
		// Check for same length of both arrays. False if has not the same length.
		return false
	}
	let freqCount1 = {};
	let freqCount2 = {};
	for(let i=0; i<arr1.length; i++){
		// At this point we understand that both arrays has the same length. So, we can make just ONE for loop to record each item of the array as a key of its obj.
		freqCount1[arr1[i]] = (freqCount1[arr1[i]] || 0) + 1;
		freqCount2[arr2[i]] = (freqCount2[arr2[i]] || 0) + 1;
	}
	// console.log(freqCount1);
	// console.log(freqCount2);
	for(let key in freqCount1){
		// Check for every key in the 1st obj are in the 2nd one but squared.
		if((!(key**2 in freqCount2))||(freqCount2[key**2] !== freqCount1[key])){
			// If the squared key of 1st obj is not in the 2nd obj as a key, the arrays has the same items amount but not the same values (and squared)
			// OR if the squared key of 1st obj is in the 2nd obj as a key but the amount does not match, the arrays has the same items amount but not the same values (and squared) 
			return false
		}
	}
	return true
}