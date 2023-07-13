const runSelectionSortTest = () => {
	let myArray = [54, 24, 83, 10, 2, 6, 9, 50];
	const selectionSort = (arrayParam: number[]):void => {
		const arrayLength = arrayParam.length;

		for (let i= 0; i < arrayLength-1; i++) {
			let minValueIndex = i;
			let auxNumb:number;

			for(let j = i+1; j< arrayLength; j++){
				
				// search for the min value, and place it in the i position

				if(arrayParam[minValueIndex] > arrayParam[j]){
					minValueIndex = j;
				}
			}

			auxNumb = arrayParam[i];
			arrayParam[i] = arrayParam[minValueIndex];
			arrayParam[minValueIndex] = auxNumb;
			// once replaced, it start again from i+1 position
			
		}
	}
	selectionSort(myArray);
	console.log(myArray);

}