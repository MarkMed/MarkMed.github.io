(()=>{

	const exerciseAmount = 30;
	const practiceNumbAndName = {numb: 2, name: "Operadores Relacionales, Logicos, y Estructuras de Control"}
	const menuList = document.querySelector(`body nav div.menuBtn ul.menu`);
	const mainTitle = document.querySelector(`body main h1#title`);
	const navTitle = document.querySelector(`body div.title h2 `);
	const secondTitle = document.querySelector(`body main h3#practiceNumbAndName`);
	const numberOfExercise = document.URL.split("task")[document.URL.split("task").length -1].split(".")[0];

	for(let i = 1; i <= exerciseAmount; i++){
		const listItem = document.createElement("li");
		const listItemAnchor = document.createElement("a");
		const listItemAnchorText = document.createTextNode(`Tarea ${i}`);

		listItemAnchor.setAttribute("href", `../task${i}/task${i}.html`);
		listItemAnchor.appendChild(listItemAnchorText);
		listItem.appendChild(listItemAnchor);
		menuList.appendChild(listItem);
		

	}
	secondTitle.innerHTML = `Práctico ${practiceNumbAndName.numb} - ${practiceNumbAndName.name}`;
	mainTitle.innerHTML = `Tarea ${numberOfExercise}`;
	document.title = `Tarea ${numberOfExercise}`;
	navTitle.innerHTML = `<b>Marcos Medina</b> - Práctico ${practiceNumbAndName.numb}`;


})()