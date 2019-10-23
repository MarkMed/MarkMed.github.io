var globalVar;
$(document).ready(()=>{
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
		$(elem).on("dragstart", ()=>{
			console.log("gxDrag will be fired");
			console.log(event)
			// drag(event);
			elem.get(0).dispatchEvent(gxDragStart);
			if (verifTouchDevice()){
				console.log("Touch device detected! Will add touchmove");
				$("body").css({
					"overflow": "hidden"
				});
				$(elem).on("touchmove", moveElement);
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

	let startStorage = $("#startStorage");
	let targetStorage = $("#targetStorage");
	let items = startStorage.children();

	//////////////////////////////////////////////////////////////////////////////////

	/* Adding events listeners to DD in SD section elements */
	targetStorage.on("dragenter", ()=>{console.log("dragenter!")});
	// targetStorage.on("", ()=>{});
	// targetStorage.on("", ()=>{});
	targetStorage.on("drop", ()=>{console.log("dropped!!!!!")});

	for(let i=0; i<items.length; i++){
		
		makeLongTapable($(items[i]));

		makeDragable($(items[i]));

		$(items[i]).on("gxDrag", (ev)=>{
			elementDragging = ev.target;
			console.log("gx-drag fired");
			$(items[i]).addClass("dragging");

			$(items[i]).css(
				{
					"position": "fixed",
					"top": ev.target.y+"px",
					"left": ev.target.x+"px",
					"transition": "0s"
				}
			);
		});

		$(items[i]).on("gxDragEnd", (ev)=>{
			console.log("elementDragging", elementDragging);
			// $(items[i]).removeClass("dragging").addClass("dragged");
			console.log("Drag End!", ev);
		});

		/* Execute the dragstart through the Long Tap*/
		$(items[i]).on("longTap", (ev)=>{
			emitEvent($(items[i]), "dragstart");
			let dragEndFunc = (ev)=>{
				emitEvent($(items[i]), "dragend");
				removeListener($(items[i]), "touchend", dragEndFunc)
			}
			$(items[i]).on("touchend", dragEndFunc);
		});
	}
	//////////////////////////////////////////////////////////////////////////////////

})