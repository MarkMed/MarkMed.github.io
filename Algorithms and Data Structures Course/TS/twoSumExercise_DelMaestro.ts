function twoSum(arr: Array<number>, k: number):boolean{
	let
		i = 0,
		j = arr.length
	;

	while(i<j){
		let
			sum=arr[i]+arr[j]
		;
		if(sum === k){
			return true
		}
		if(sum < k){
			i++;
		} else {
			j--;
		}
	}
	return false
}