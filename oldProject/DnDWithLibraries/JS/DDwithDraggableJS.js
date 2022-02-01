var globalVar;
window.onload=(()=>{
	//////////////////////////////////////////////////////////////////////////////////
	const imgTarget = document.querySelector("#targetStorage");
	const cardTarget = document.querySelector("#elementTarget");
	const imgArray = document.querySelectorAll("#startStorage img.element2Drag");
    const cardsArray = document.querySelector("#elementStart div.card");

    
    const droppable = new Draggable.Droppable(document.querySelectorAll('.elementsContainer'), {
        draggable: '#startStorage .element2Drag',
        dropzone: '#targetStorage'
    });
      

    const draggable = new Draggable.Draggable(document.getElementById("startStorage"), {
        draggable: '#startStorage .element2Drag'
    });
      
    draggable.on('drag:start', () => console.log('drag:start'));
    draggable.on('drag:move', () => console.log('drag:move'));
    draggable.on('drag:stop', () => console.log('drag:stop'));

    droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
    droppable.on('droppable:returned', () => console.log('droppable:returned'));
})