function maxSubarraySum(arr, k) {
    if (arr.length < k) {
        return null;
    }
    var maxSum = 0, tempSum;
    for (var i = 0; i < arr.length; i++) {
        if (i < k) {
            maxSum += arr[i];
            tempSum = maxSum;
        }
        else {
            tempSum = tempSum - arr[i - k] + arr[i];
            maxSum = (maxSum < tempSum) ? (tempSum) : (maxSum);
        }
    }
    return maxSum;
}
