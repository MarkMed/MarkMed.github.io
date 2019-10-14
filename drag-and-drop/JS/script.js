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
					"opacity": 1-($(document).scrollTop()/500),
					"transform": "translateY("+$(document).scrollTop()/2+"px)"
				}
			);
		}
		if($(document).scrollTop() > firstTitle.offset().top/1.1){
			firstTitle.removeClass("hidden").addClass("show");
		}
		if($(document).scrollTop() > secondTitle.offset().top/1.1){
			secondTitle.removeClass("hidden").addClass("show");
			$("#DDinSD p").removeClass("hidden").addClass("show");
		}
	});
	//////////////////////////////////////////////////////////////////////////////////
	let longTapTime = 1000;
	///// Long Tap Event /////
	let longTap = new CustomEvent("longTap", { bubbles: true });
	function makeLongTapable(elem){
		let timer;

		function absorbEvent_(event) {
		  var e = event || window.event;
		  e.preventDefault && e.preventDefault();
		  e.stopPropagation && e.stopPropagation();
		  e.cancelBubble = true;
		  e.returnValue = false;
		  return false;
		}
	
		function preventLongPressMenu(node) {
		  node.ontouchstart = absorbEvent_;
		  node.ontouchmove = absorbEvent_;
		  node.ontouchend = absorbEvent_;
		  node.ontouchcancel = absorbEvent_;
		}

		preventLongPressMenu(elem);

		elem.on("touchstart", (ev)=>{
			timer = setTimeout( function() { 
				elem.get(0).dispatchEvent(longTap);
			}, longTapTime);
		});

		elem.on("touchend", (ev)=>{
			clearTimeout(timer);
		});
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	let elementDragging;

	function makeDragable(elem){
		
		function verifTouchDevice() {
			var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
			var matchQ = function(query) {
			  return window.matchMedia(query).matches;
			}
		  
			if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
			  return true;
			}
			var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
			return matchQ(query);
		}
	
		function drag(ev) {
			elementDragging = ev.target;
			console.log("elementDragging", elementDragging);
			ev.dataTransfer.setData('text/plain', elementDragging);
		}

		function moveElement(ev){
			$(this).css(
				{
					"top": ev.touches[0].clientY - (ev.target.width / 2)+"px",
					"left": ev.touches[0].clientX - (ev.target.height / 2)+"px"
				}
			);
		}

		///// drag start Event /////
		let gxDragStart = new CustomEvent("gxDrag", { bubbles: true });
		$(elem).on("mousedown", ()=>{
			console.log("gxDrag will be fired");
			console.log(event)
			// drag(event);
			elem.get(0).dispatchEvent(gxDragStart);
			if (verifTouchDevice()){
				console.log("Touch device detected! Will add touchmove");
				$("body").css({
					"overflow": "hidden"
				});
				//$(elem).on("touchmove", moveElement);
			}
		});

		///// drag end Event /////
		let gxDragEnd = new CustomEvent("gxDragEnd", { bubbles: true });
		$(elem).on("dragend", ()=>{
			console.log("gxDragEnd will be fired");
			console.log(event)
			elem.get(0).dispatchEvent(gxDragEnd);

			if (verifTouchDevice()){
				console.log("Touch end, will remove the move fx");
				$("body").css({
					"overflow": ""
				});
				$(elem).off("touchmove", moveElement);
			}
		});

	}

	function makeDropable(elem){
		///// drop Event /////
		let drop = new CustomEvent("gxDrop", { bubbles: true });
		$(elem).on("drop", ()=>{
			console.log("gxDrop will be fired");
			console.log(event)
			// drag(event);
			elem.get(0).dispatchEvent();
			$("body").css({
				"overflow": "hidden"
			})
		});
	}

	//////////////////////////////////////////////////////////////////////////////////
	function emitEvent(elem, eventToEmit){
			
		let eventIntance = document.createEvent("HTMLEvents");
		eventIntance.initEvent(eventToEmit, true, false);
		elem.get(0).dispatchEvent(eventIntance);

	}
	//////////////////////////////////////////////////////////////////////////////////

	function removeListener(elem, eventToRemove, callbackFunc){		
		elem.off(eventToRemove, callbackFunc);
	}

	function allowDrop(ev) {
		ev.preventDefault();
	}
	//////////////////////////////////////////////////////////////////////////////////

	let cloudDiv = $("#cloudDiv");
	let storageDiv = $("#storageDiv");
	let items = storageDiv.children();

	//////////////////////////////////////////////////////////////////////////////////

	/* Adding events listeners to Simple DD section elements */

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
	});

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
	});

	for(let i=0; i<items.length; i++){
		makeDragable($(items[i]));

		$(items[i]).on("gxDrag", (ev)=>{
			elementDragging = ev.target;
			console.log("gx-drag fired");
			console.log(" ");
			$(items[i]).addClass("dragging");
		});

		$(items[i]).on("dragend", (ev)=>{
			console.log("elementDragging", elementDragging);
			$(items[i]).removeClass("dragging").addClass("dragged");
			console.log("Drag End!", ev);
			console.log("The element has been dropped in: ", ev.toElement.parentNode)
		});

	}

	//////////////////////////////////////////////////////////////////////////////////

	let startStorage = $("#startStorage");
	let targetStorage = $("#targetStorage");
	let items2 = startStorage.children();

	//////////////////////////////////////////////////////////////////////////////////

	/* Adding events listeners to DD in SD section elements */
	targetStorage.on("dragenter", ()=>{console.log("dragenter!")});
	// targetStorage.on("", ()=>{});
	// targetStorage.on("", ()=>{});
	targetStorage.on("drop", ()=>{console.log("dropped!!!!!")});

	for(let i=0; i<items2.length; i++){
		
		makeLongTapable($(items2[i]));

		makeDragable($(items2[i]));

		$(items2[i]).on("gxDrag", (ev)=>{
			elementDragging = ev.target;
			console.log("gx-drag fired");
			$(items2[i]).addClass("dragging");

			$(items2[i]).css(
				{
					"position": "fixed",
					"top": ev.target.y+"px",
					"left": ev.target.x+"px",
					"transition": "0s"
				}
			);
		});

		$(items2[i]).on("gxDragEnd", (ev)=>{
			console.log("elementDragging", elementDragging);
			// $(items2[i]).removeClass("dragging").addClass("dragged");
			console.log("Drag End!", ev);
		});

		/* Execute the dragstart through the Long Tap*/
		$(items2[i]).on("longTap", (ev)=>{
			emitEvent($(items2[i]), "mousedown");
			let dragEndFunc = (ev)=>{
				emitEvent($(items2[i]), "dragend");
				removeListener($(items2[i]), "touchend", dragEndFunc)
			}
			$(items2[i]).on("touchend", dragEndFunc);
		});
	}
	//////////////////////////////////////////////////////////////////////////////////

})