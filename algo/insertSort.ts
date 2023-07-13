const runInsertSortTest = ()=>{
	let myArray = [54, 24, 83, 10, 2, 6, 9, 50];
	const insertSort = (arrayToSort: number[]):void => {
		const arrayLength = arrayToSort.length;
		for (let i = 1; i < arrayLength; i++) {
			const key = arrayToSort[i];
			
			let j = i-1; // j to go down in the sorted array and move the new free space;
			while(j>=0 && arrayToSort[j] > key){
				// move the new free space to a specific place in the sorted part
				arrayToSort[j+1] = arrayToSort[j] // arrayToSort[j+1] = new free space | arrayToSort[j] = current elem in the sorted array
				j--;
			}
			// once the new free space is located, assign the key into the space
			arrayToSort[j+1] = key
	
			
		}
	}
	insertSort(myArray);
	console.log(myArray);
}
