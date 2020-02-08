function validAnagram(str1, str2){
	if((str1.length === str2.length) ){
		if(!str1.length && !str2.length){
			return true
		}
		let freqCount1 = {};
		let freqCount2 = {};
		for(let i=0; i<str1.length; i++){
			freqCount1[str1[i]] = (freqCount1[str1[i]] || 0) + 1;
			freqCount2[str2[i]] = (freqCount2[str2[i]] || 0) + 1;
		}
		console.log(freqCount1);
		console.log(freqCount2);
		for(let key in freqCount1){
			if((!(key in freqCount2))||(freqCount2[key] !== freqCount1[key])){
				return false
			}
		}
		return true
	}
	return false
}