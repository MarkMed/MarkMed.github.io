(()=>{

	// Clean version
	const domBranch = "body main";
	const outputParag = document.querySelector(`${domBranch} p b#output`);
	const input1 = document.querySelector(`${domBranch} input#input1`);
	const mainBtn = document.querySelector(`${domBranch} button#btn`);
	
	const setOutput = () => {
		const input1Value = Number(input1.value);
		let outputText = "";

		if(input1Value > 10){
			outputText = "Mayor que diez!";
			outputParag.innerHTML = outputText;
		}
		input1.value = "";
	}

	mainBtn.addEventListener("click", setOutput);

})()