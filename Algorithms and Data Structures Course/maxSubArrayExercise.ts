function maxSubarraySum(arr: Array<number>, k: number): number{
	if(arr.length < k){
		return null
	}
	let
		maxSum = 0,
		tempSum: number,
	for(let i = 0; i < arr.length; i++){

		if(i < k){
			maxSum += arr[i];
			tempSum = maxSum;
		} else {
			tempSum = tempSum - arr[i - k] + arr[i];
			maxSum = (maxSum < tempSum)?(tempSum):(maxSum);
		}
	}
	return maxSum
}