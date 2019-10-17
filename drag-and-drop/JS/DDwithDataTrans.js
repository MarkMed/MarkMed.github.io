$(document).ready(()=>{

    //////////////////////////////////////////////////////////////////////////////////

    const elemeTarget = $("#elementTarget");
    const elemStart = $("#elementStart");
    let items = elemStart.children();

    //////////////////////////////////////////////////////////////////////////////////
	
	function dragEnterFunc(e){
        e.preventDefault();
        console.log("Dragging element has entered into the drop target");
        // More things here
	}

	function dragOverFunc(e){
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
        // More things here
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
	
	elemeTarget.get(0).addEventListener("dragenter", dragEnterFunc, false);
	
	elemeTarget.get(0).addEventListener("dragover", dragOverFunc);

    elemeTarget.get(0).addEventListener("drop", dropFunc, false);

    for(let i=0; i<items.length; i++){
        allowDrag(items[i])
        $(items[i]).get(0).addEventListener("dragstart", dragStartFunc, false);
    }

})