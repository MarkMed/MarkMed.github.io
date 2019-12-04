var globalVar;
window.onload=(()=>{
	const imgTarget = document.querySelector("#targetStorage");
	const cardTarget = document.querySelector("#elementTarget");
	const imgArray = document.querySelectorAll("#startStorage img.element2Drag");
	const cardsArray = document.querySelectorAll("#elementStart div.card");

	let elemetDragging;
	
	const position = { x: 0, y: 0 }

	function deleteFromParent(elem){
		elem.parentElement.removeChild(elem);
	}

	function emitEvent(elem, eventToEmit){
		console.log("DROPPED!")
		let eventIntance = document.createEvent("HTMLEvents");
		eventIntance.initEvent(eventToEmit, true, false);
		elem.dispatchEvent(eventIntance);

	}
	
	function addEvent(listenEvent, elem, func, useCapture){
		elem.addEventListener(listenEvent, func, useCapture);
	}
	
	function makeDraggable(elem){
		let timer;

		elem.addEventListener("droppedOnDropZone", ()=>{
			deleteFromParent(elem);
		});

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
					clearTimeout(timer);
					console.log(event.type, event.target);
					elemetDragging = elem;
					globalVar=elem;
					console.log("dragStart");
					elemetDragging.style.transition = ``;
				},
				move (event) {
					position.x += event.dx;
					position.y += event.dy;
					elemetDragging.style.transform = `translate(${position.x}px, ${position.y}px)`;
				},
				end (event) {
					console.log("drag end");
					emitEvent(elem, "dropped");
					timer = setTimeout(()=>{
						position.x = 0;
						position.y = 0;
						elem.style.transition = `0.6s ease`;
						elem.style.transform = ``;
					}, 200);
				}
			}
		});
	}

	function makeDroppable(elem, elemnts2Accept){
		
		
		let timer;

		function dropZoneClass(dropArea, toDo, class2Remove){
			
			console.log("Function running!", dropArea);
			if(toDo === "remove"){
				dropArea.classList.remove(class2Remove);
			}
			if(toDo === "add"){				
				dropArea.classList.add(class2Remove);
			}

		}
		function revertBack(elem){
			timer = setTimeout(()=>{
				position.x = 0;
				position.y = 0;
				elem.style.transition = `0.6s ease`;
				elem.style.transform = ``;
			}, 200);
		}

		interact(elem)
		.dropzone({
			accept: elemnts2Accept,
			ondropactivate: (event)=>{
				console.log("dropactive")
			},
			ondragenter: (event)=>{
				console.log("DRAGENTER!");
				let draggingElement = event.relatedTarget;
				let dropArea = event.target;
				dropZoneClass(dropArea, "add" ,"allowDrop");
			},
			ondragleave: (event)=>{
				console.log("DRAGLeave!");
				let draggingElement = event.relatedTarget;
				let dropArea = event.target;
				draggingElement.addEventListener("dropped", ()=>{
					revertBack(draggingElement)
				});
				dropZoneClass(dropArea, "remove", "allowDrop");
			},
			ondrop: (event)=>{
				let draggingElement = event.relatedTarget;
				let dropArea = event.target;
				dropZoneClass(dropArea, "remove", "allowDrop");
				console.log(draggingElement.getAttribute("class")
					+ ' was dropped into '
					+ dropArea.getAttribute("class"));
				console.log(event);
				emitEvent(draggingElement, "droppedOnDropZone");
				elemetDragging.style.transform = ``
				position.x = 0;
				position.y = 0;
				dropArea.innerHTML += elemetDragging.outerHTML;
			}
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