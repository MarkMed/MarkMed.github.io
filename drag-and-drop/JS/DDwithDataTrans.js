$(document).ready(()=>{

    //////////////////////////////////////////////////////////////////////////////////

    const elemeTarget = $("#elementTarget");
    const elemStart = $("#elementStart");
    let items = elemStart.children();

    //////////////////////////////////////////////////////////////////////////////////

	function allowDrop(ev) {
		ev.preventDefault();
    }
    
    function dropFunction(ev){
        allowDrop();
        // More things here
    }

    function dragStartFunction(ev){
        console.log("DragStart");
    }

    function allowDrag(elem){
        elem.setAttribute("draggable", "true");
    }

    //////////////////////////////////////////////////////////////////////////////////

    elemeTarget.on("drop", dropFunction);

    for(let i=0; i<items.length; i++){
        allowDrag(items[i])
        $(items[i]).on("dragstart", dragStartFunction);
    }

})