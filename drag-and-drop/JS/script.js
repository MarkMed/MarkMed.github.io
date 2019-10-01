var globalVar;
$(document).ready(()=>{
	//////////////////////////////////////////////////////////////////////////////////
	const header = $("header");
	const firstTitle = $("#simpleDD .sectionTitle");
	const secondTitle = $("#DDinSD .sectionTitle");
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
		if($(document).scrollTop() > secondTitle.offset().top/1.1){
			secondTitle.removeClass("hidden").addClass("show");
		}
	});
	//////////////////////////////////////////////////////////////////////////////////
	let longTapTime = 1;
	///// Long Tap Event /////
	let longTap = new CustomEvent("longTap", { bubbles: true });
	function makeLongTapable(elem){

		let timer;

		// function longTap(elem){
		// }

		elem.on("touchstart", (ev)=>{
			ev.preventDefault();
			timer = setTimeout( function() { 
				elem.get(0).dispatchEvent(longTap);
			}, longTapTime);
		});

		elem.on("touchend", (ev)=>{
			ev.preventDefault();
			clearTimeout(timer);
		});
	}
	
	//////////////////////////////////////////////////////////////////////////////////

	let elementDragging;

	function makeDragable(elem){
	
		function drag(ev) {
			elementDragging = ev.target;
			console.log("elementDragging", elementDragging);
			ev.dataTransfer.setData('text/plain', elementDragging);
		}

		///// drag start Event /////
		let dragStart = new CustomEvent("gxDrag", { bubbles: true });
		$(elem).on("dragstart", ()=>{
			console.log("gx-drag will be fired");
			drag(event);
			elem.get(0).dispatchEvent(dragStart);
		});


		///// drag end Event /////
		let dragEnd = new CustomEvent("gxDragAccepted", { bubbles: true });

	}

	function makeDropable(elem){
		//////////// PREGUNTAR SOBRE DropAccepted https://wiki.genexus.com/commwiki/servlet/wiki?22542,DropAccepted+event+in+Smart+Devices ///////////
		///// drop Event /////
		let drop = new CustomEvent("gxDrop", { bubbles: true });
	}

	//////////////////////////////////////////////////////////////////////////////////

	function allowDrop(ev) {
		ev.preventDefault();
	}
	
	let cloudDiv = $("#cloudDiv");
	let storageDiv = $("#storageDiv");
	let items = storageDiv.children();
	for(let i=0; i<items.length; i++){
		makeDragable($(items[i]));
		$(items[i]).on("gxDrag", (ev)=>{
			elementDragging = ev.target;
			console.log("gx-drag fired");
			$(items[i]).addClass("dragging");
		});
		$(items[i]).on("dragend", (ev)=>{
			console.log("elementDragging", elementDragging);
			$(items[i]).removeClass("dragging").addClass("dragged");
			console.log("Drag End!", ev);
			console.log("The element has been dropped in: ", ev.toElement.parentNode)
		});
	}
	cloudDiv.on("dragover", (ev)=>{
		// console.log("You are now draging over cloudDiv and the event traget is: ", ev.target);
		event.dataTransfer.dropEffect = 'move';
		allowDrop(event);
	})
	cloudDiv.on("drop", (ev)=>{
		console.log("Drop!", event);
		event.dataTransfer.dropEffect = 'move';
		
		setTimeout(()=>{
			elementDragging.parentNode.removeChild( elementDragging );
			ev.target.appendChild( elementDragging );
			setTimeout(()=>{
				$(elementDragging).removeClass("dragged").removeClass("dragging");
			}, 200);
			
		}, 200);
	})
	
	cloudDiv.on("dragenter", (ev)=>{
		let dropTarget = $(ev.target);
		ev.target.acceptDrop = true;
		console.log("dropTarget", ev.target.acceptDrop);
		console.log("drag enter!");
	});
	cloudDiv.on("dragleave", ()=>{
		console.log("drag canceled");
	});
	storageDiv.on("dragover", (ev)=>{
		allowDrop(event);
	})
	storageDiv.on("drop", (ev)=>{
		event.dataTransfer.dropEffect = 'move';
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