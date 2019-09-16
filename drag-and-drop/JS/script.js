var globalVar;
$(document).ready(()=>{
	//////////////////////////////////////////////////////////////////////////////////
	const header = $("header");
	const firstTitle = $("#simpleDD .sectionTitle");
	// const secondTitle = $("#swipeEvents .sectionTitle h2");
	let deviceHeight = $(window).height();
	let documentHeight = $(document).height();
	//////////////////////////////////////////////////////////////////////////////////
	$("#svgScrollDown").click(()=>{
		$('html, body').animate(
			{
				scrollTop: $("#simpleDD").offset().top
			},
			{
				duration: 400, 
				easing: "linear"
			}
		);
	});
	//////////////////////////////////////////////////////////////////////////////////
	$(document).scroll(function(e){
		if($(document).scrollTop() < deviceHeight){
			header.css(
				{
					"opacity": 1-($(document).scrollTop()/700),
					"transform": "translateY("+$(document).scrollTop()/2+"px)"
				}
			);
		}
		if($(document).scrollTop() > firstTitle.offset().top/1.1){
			firstTitle.removeClass("hidden").addClass("show");
		}
	});
	//////////////////////////////////////////////////////////////////////////////////
	
	//////////////////////////////////////////////////////////////////////////////////


	function makeDragable(elem){
		///// drag start Event /////
		let dragStart = new CustomEvent("dragStart", { bubbles: true });

		///// drag end Event /////
		let dragEnd = new CustomEvent("dragEnd", { bubbles: true });
	}

	//////////////////////////////////////////////////////////////////////////////////

	let elementDragging;
	function allowDrop(ev) {
		ev.preventDefault();
	}
	
	function drag(ev) {
		elementDragging = ev.target;
		console.log("elementDragging", elementDragging);
		ev.dataTransfer.setData('text/plain', elementDragging);
	}
	
	let cloudDiv = $("#cloudDiv");
	let storageDiv = $("#storageDiv");
	let items = storageDiv.children();
	for(let i=0; i<items.length; i++){
		$(items[i]).on("dragstart", ()=>{
			$(items[i]).addClass("dragging");
			drag(event);
		});
		$(items[i]).on("dragend", ()=>{
			drag(event);
			$(items[i]).removeClass("dragging").addClass("dragged");
		});
	}
	cloudDiv.on("dragover", (ev)=>{
		// console.log("You are now draging over cloudDiv and the event traget is: ", ev.target);
		event.dataTransfer.dropEffect = 'move';
		allowDrop(event);
	})
	cloudDiv.on("drop", (ev)=>{
		console.log("Drop!", event);
		console.log("Drop!", ev.target);
		
		setTimeout(()=>{
			elementDragging.parentNode.removeChild( elementDragging );
			ev.target.appendChild( elementDragging );
			setTimeout(()=>{
				$(elementDragging).removeClass("dragged").removeClass("dragging");
			}, 200);
			
		}, 200);
	})
	storageDiv.on("dragover", (ev)=>{
		// console.log("You are now draging over cloudDiv and the event traget is: ", ev.target);
		event.dataTransfer.dropEffect = 'move';
		allowDrop(event);
	})
	storageDiv.on("drop", (ev)=>{
		console.log("Drop!", event);
		console.log("Drop!", ev.target);
		
		setTimeout(()=>{
			elementDragging.parentNode.removeChild( elementDragging );
			ev.target.appendChild( elementDragging );
			setTimeout(()=>{
				$(elementDragging).removeClass("dragged").removeClass("dragging");
			}, 200);
			
		}, 200);
	})

});