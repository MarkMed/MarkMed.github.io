var globalVar;
window.onload=(()=>{
	const imgTarget = document.querySelector("#targetStorage");
	const cardTarget = document.querySelector("#elementTarget");
	const imgArray = document.querySelectorAll("#startStorage img.element2Drag");
	const cardsArray = document.querySelectorAll("#elementStart div.card");

	let elemetDragging;
	let timer;
	
	const position = { x: 0, y: 0 }
	
	function revertBack(elem){
		timer = setTimeout(()=>{
			position.x = 0;
			position.y = 0;
			elem.style.transition = `0.6s ease`;
			elem.style.transform = ``;
		}, 200);
	}

	function deleteFromParent(elem){
		elem.parentElement.removeChild(elem);
	}

	function emitEvent(elem, eventToEmit){
		let eventIntance = document.createEvent("HTMLEvents");
		eventIntance.initEvent(eventToEmit, true, false);
		elem.dispatchEvent(eventIntance);

	}
	
	function addEvent(listenEvent, elem, func, useCapture){
		elem.addEventListener(listenEvent, func, useCapture);
	}
	
	function makeDraggable(elem, dropTarget){
		let dropTargets;
		elem.setAttribute("style",
			"touch-action: none; user-select: none"
		);

		elem.addEventListener("dragging", ()=>{
			console.log(">> Drag listened <<");	
			elemetDragging = elem;
			globalVar=elem;
			console.log("dragStart");
			elemetDragging.style.transition = ``;
		});

		elem.addEventListener("droppedOnDropZone", ()=>{
			console.log(">> dropEvent listened <<");
			deleteFromParent(elem);
		});
		elem.addEventListener("dragCanceled", ()=>{
			console.log(">> dragCanceled listened <<");
			console.log(elem);
			revertBack(elem);
		});
		interact(elem).draggable({
			inertia: true,
			listeners: {
				start (event) {
					dropTargets = document.querySelectorAll(
					  `[id = "targetStorage"]`
					);
					console.log(dropTargets);

					clearTimeout(timer);
					// GX Drag
					emitEvent(elem, "dragging");
				},
				move (event) {
					position.x += event.dx;
					position.y += event.dy;
					elemetDragging.style.transform = `translate(${position.x}px, ${position.y}px)`;
				},
				end (event) {
					let i = 0;
					console.log("event.relatedTarget", event.relatedTarget);

					elem.removeEventListener("droppedOnDropZone", ()=>{
						console.log(">> dropEvent listened <<");
						deleteFromParent(elem);
					});
					elem.removeEventListener("dragCanceled", ()=>{
						console.log(elem);
						console.log(">> dragCanceled listened <<");
						revertBack(elem);
					});
					// Mmmm 7-7
					
					while((i < dropTargets.length) && !(event.relatedTarget === dropTargets[i])){
						i++;
					}
					if(!(i < dropTargets.length)){
					  emitEvent(elem, "dragCanceled");
					}
				}
			}
		});
	}

	function makeDroppable(elem, elemnts2Accept){

		function dropZoneClass(dropArea, toDo, class2Remove){
			if(toDo === "remove"){
				dropArea.classList.remove(class2Remove);
			}
			if(toDo === "add"){				
				dropArea.classList.add(class2Remove);
			}

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
				// draggingElement.removeEventListener("dragCanceled", ()=>{
				// 	console.log(">> dragCanceled listened <<");
				// 	revertBack(elem);
				// });

				// GX Drop Accepted
				draggingElement.addEventListener("dropAccepted", ()=>{
					console.log(">> dropAccepted listened <<");			
					dropZoneClass(elem, "add" ,"allowDrop");
				});
				emitEvent(draggingElement, "dropAccepted");
			},
			ondragleave: (event)=>{
				let draggingElement = event.relatedTarget;
				let dropArea = event.target;
				dropZoneClass(dropArea, "remove", "allowDrop");
				// elem.addEventListener("dragCanceled", ()=>{
				// 	console.log(">> dragCanceled listened <<");
				// 	revertBack(elem);
				// });
			},
			ondrop: (event)=>{
				let draggingElement = event.relatedTarget;
				let dropArea = event.target;
				dropZoneClass(dropArea, "remove", "allowDrop");				
				// GX Drop
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
		makeDraggable(imgArray[i], imgTarget);
	}

	for(let i=0; i<cardsArray.length; i++){
		makeDraggable(cardsArray[i], cardTarget);
	}

	makeDroppable(imgTarget, "img.element2Drag");
	makeDroppable(cardTarget, "div.card");

})