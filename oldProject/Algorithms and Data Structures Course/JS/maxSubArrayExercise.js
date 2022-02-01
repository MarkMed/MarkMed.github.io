"use strict";
function maxSubarraySum(arr, k) {
    if (arr.length < k) {
        return -Infinity;
    }
    let maxSum = 0, tempSum = 0;
    for (let i = 0; i < arr.length; i++) {
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
