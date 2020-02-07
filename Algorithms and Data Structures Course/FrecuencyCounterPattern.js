// Code Example of Frecuency Counter Pattern
function same(arr1, arr2){
    console.log(`Arr1 Length: ${arr1.length}, Arr2 length: ${arr2.length}`)
    if(arr1.length !== arr2.length){
      return false
    }
    let frecuencyCounter1 = {};
    let frecuencyCounter2 = {};
    for(let i=0; i<arr1.length; i++){
      frecuencyCounter1[arr1[i]] = (frecuencyCounter1[arr1[i]] || 0) + 1;
      frecuencyCounter2[arr2[i]] = (frecuencyCounter2[arr2[i]] || 0) + 1;
    }
    console.log(frecuencyCounter1);
    console.log(frecuencyCounter2);
    for(let key in frecuencyCounter1){
        if((!(key**2 in frecuencyCounter2))||(frecuencyCounter2[key**2] !== frecuencyCounter1[key])){
            return false
        }
    }
    return true
}