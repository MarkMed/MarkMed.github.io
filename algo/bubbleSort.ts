const runBubbleSortTest = () => {
	let myArray = [54, 24, 83, 10, 2, 6, 9, 50];
	const bubbleSort = (arrayToSort: number[]):void => {
		const arrayLength = arrayToSort.length;
		for (let i = 0; i < arrayLength-1; i++) {
			for(let j=0; j<arrayLength-i-1; j++){ // i variable will be increase, so the loop limit will increse too. i = 2 means 2 places before end
				if(arrayToSort[j] > arrayToSort[j+1]){
					swapPlaces(arrayToSort, j, j+1);
				}
			}
			
		}
	}
	const swapPlaces = (arrayToSwap: number[],numb1: number, numb2: number):void => {
		let auxNumb: number;
		auxNumb = arrayToSwap[numb1];
		arrayToSwap[numb1] = arrayToSwap[numb2];
		arrayToSwap[numb2] = auxNumb
	}
	bubbleSort(myArray);
	console.log(myArray);
}
