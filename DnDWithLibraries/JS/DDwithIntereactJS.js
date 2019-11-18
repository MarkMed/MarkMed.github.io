var globalVar;
window.onload=(()=>{
	const imgTarget = document.querySelector("#targetStorage");
	const cardTarget = document.querySelector("#elementTarget");
	const imgArray = document.querySelectorAll("#startStorage img.element2Drag");
	const cardsArray = document.querySelectorAll("#elementStart div.card");

	let elemetDragging;

	function makeDraggable(elem){
		const position = { x: 0, y: 0 }
		elem.setAttribute("style",
			"touch-action: none; user-select: none"
		);
		interact(elem).draggable({
			inertia: true,
			// modifiers: [
			// 	interact.modifiers.restrictRect({
			// 		restriction: 'parent',
			// 		endOnly: true
			// 	})
			// ],
			listeners: {
				start (event) {
					console.log(event.type, event.target);
					elemetDragging = elem;
					globalVar=elem;
					console.log("dragStart");
				},
				move (event) {
					console.log("dragging");
					position.x += event.dx;
					position.y += event.dy;				
					event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
				},
				end (event) {
					position.x = 0;
					position.y = 0;
					console.log("drag end");
				}
			}
		})
	}

	function makeDroppable(elem, elemnts2Accept){
		interact(elem)
		.dropzone({
			accept: elemnts2Accept,
			ondrop: (event)=>{
				console.log(event.relatedTarget.getAttribute("class")
					+ ' was dropped into '
					+ event.target.getAttribute("class"));
				console.log(event);
				elemetDragging.setAttribute("style", "");
				event.target.innerHTML += elemetDragging.outerHTML;
			}
		})
        .on('dropactivate', function (event) {
          event.target.classList.add('drop-activated')
        })
	}

	//////////////////////////////////////////////////////////////////////////////////
	$("#svgScrollDown").click(()=>{
		$('html, body').animate(
			{
				scrollTop: $("#DDinSD").offset().top
			},
			{
				duration: 400, 
				easing: "linear"
			}
		);
	});
	///////////////////////////////////////

	for(let i=0; i<imgArray.length; i++){
		makeDraggable(imgArray[i]);
	}

	for(let i=0; i<cardsArray.length; i++){
		makeDraggable(cardsArray[i]);
	}

	makeDroppable(imgTarget, "img.element2Drag");
	makeDroppable(cardTarget, "div.card");

})