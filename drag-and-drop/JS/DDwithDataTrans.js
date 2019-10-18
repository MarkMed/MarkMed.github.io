$(document).ready(()=>{

    //////////////////////////////////////////////////////////////////////////////////

    const elemeTarget = $("#elementTarget");
    const elemStart = $("#elementStart");
    let items = elemStart.children();

	//////////////////////////////////////////////////////////////////////////////////
	
	function addEvent(listenEvent, elem, func, useCapture){
		elem.get(0).addEventListener(listenEvent, func, useCapture);
	}
	
	function dragEnterFunc(e){
        e.preventDefault();
		console.log("Dragging element has entered into the drop target");
		$(e.target).addClass("allowDrop");
		e.dataTransfer.dropEffect = "copy"; // "Drop Effect" is the function that allows to display an icon next to the cursor pointer. link - copy - move
	}

	function dragOverFunc(e){
		e.preventDefault();
	}

	function dragLeaveFunc(e){
		
		$(e.target).removeClass("allowDrop");

	}

    function dropFunc(e){
		e.preventDefault();
		let landingElement = e.target;

		console.log(e.dataTransfer.getData("Text"));
		
		$(e.target).removeClass("allowDrop");

		landingElement.innerHTML += (e.dataTransfer.getData("Text"));
		
    }

    function allowDrag(elem, allow){
        elem.setAttribute("draggable", allow);
    }

    function dragStartFunc(e){
		console.log("DragStart");

		let draggingElement = e.target;

		$(draggingElement).addClass("dragging");;
		e.dataTransfer.setData("Text", draggingElement.outerHTML);
	}
	
	function dragEndFunc(e){
		console.log("DragEnd");

		let draggingElement = e.target;
		
		setTimeout(()=>{
			$(draggingElement).addClass("dragged");
			setTimeout(()=>{
				draggingElement.parentNode.removeChild( draggingElement);
			}, 200);
		}, 200);

	}

	//////////////////////////////////////////////////////////////////////////////////
	addEvent("dragenter", elemeTarget, dragEnterFunc, false);

	addEvent("dragover", elemeTarget, dragOverFunc, false);

	addEvent("dragleave", elemeTarget, dragLeaveFunc, false);

	addEvent("drop", elemeTarget, dropFunc, false);

    for(let i=0; i<items.length; i++){
		allowDrag(items[i], false);
		addEvent("dragstart", $(items[i]), dragStartFunc, false);
		addEvent("dragend", $(items[i]), dragEndFunc, false);
    }

})