function twoSum(arr, k) {
    var i = 0, j = arr.length;
    while (i < j) {
        var sum = arr[i] + arr[j];
        if (sum === k) {
            return true;
        }
        if (sum < k) {
            i++;
        } else {
            j--;
        }
    }
    return false;
}
