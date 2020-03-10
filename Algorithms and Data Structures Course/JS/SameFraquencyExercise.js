function sameFrequency(numb, numb2){
    numb = numb.toString();
    numb2 = numb2.toString();
    console.log(numb, numb2)
	if(numb.length !== numb2.length){
		return false
	}
	let freqCount1 = {};
	let freqCount2 = {};
	for(let i=0; i<numb.length; i++){
		freqCount1[numb[i]] = (freqCount1[numb[i]] || 0) + 1;
		freqCount2[numb2[i]] = (freqCount2[numb2[i]] || 0) + 1;
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