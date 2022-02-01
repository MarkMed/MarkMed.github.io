function countUniqueValues(sortedArray){

    let counterSrtike = 0;

    if(sortedArray.length > 0){
        counterSrtike++;
        for(let i=1; i<sortedArray.length; i++){
            if(sortedArray[i-1] !== sortedArray[i]){
                counterSrtike++
            }
        }
    }

    return counterSrtike
}