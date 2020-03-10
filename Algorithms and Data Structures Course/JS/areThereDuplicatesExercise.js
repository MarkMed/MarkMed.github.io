function areThereDuplicates() {
	let i = 0;
	let obj = {};
	while(i<arguments.length){
		if(obj[arguments[i]] === arguments[i]){
			return true
		}
		obj[arguments[i]] = arguments[i];
		i++;
	}
	return false
}