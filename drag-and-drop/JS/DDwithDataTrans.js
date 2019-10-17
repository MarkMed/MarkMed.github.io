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
        // More things here
	}

	function dragOverFunc(e){
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy"; // "Drop Effect" is the function that allows to display an icon next to the cursor pointer. link - copy - move
	}

    function dropFunc(e){
		e.preventDefault();
		let landingElement = e.target;

		console.log(e.dataTransfer.getData("Text"));

		landingElement.innerHTML += (e.dataTransfer.getData("Text"));
		
    }

    function dragStartFunc(e){
		console.log("DragStart");

		let draggingElement = e.target.outerHTML;
		console.log(e);
		e.dataTransfer.setData("Text", draggingElement);
    }

    function allowDrag(elem){
        elem.setAttribute("draggable", "true");
    }

	//////////////////////////////////////////////////////////////////////////////////
	addEvent("dragenter", elemeTarget, dragEnterFunc, false);

	addEvent("dragover", elemeTarget, dragOverFunc, false);

	addEvent("drop", elemeTarget, dropFunc, false);

    for(let i=0; i<items.length; i++){
		allowDrag(items[i]);
		addEvent("dragstart", $(items[i]), dragStartFunc, false);
    }

})