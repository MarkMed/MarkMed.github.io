var global;
$(document).ready(()=>{

    //////////////////////////////////////////////////////////////////////////////////

    const elemeTarget = $("#elementTarget");
    const elemStart = $("#elementStart");
    let items = elemStart.children();

	//////////////////////////////////////////////////////////////////////////////////
	
	function addEvent(listenEvent, elem, func, useCapture){
		elem.get(0).addEventListener(listenEvent, func, useCapture);
	}

	function triggerEvent(elem, eventToEmit, data){

		let event;
		data = data || {};
		if (document.createEvent) {
			event = document.createEvent("HTMLEvents");
			event.initEvent(eventToEmit, true, true);
		} else {
			event = document.createEventObject();
			event.eventType = eventToEmit;
		}

		event.eventName = eventToEmit;
		event = $.extend(event, data);

		if (document.createEvent) {
			elem.dispatchEvent(event);
		} else {
			elem.fireEvent("on" + event.eventType, event);
		}
	}

	function verifTouchDevice(){
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

	
	let longTapTime = 1000;
	///// Long Tap Event /////
	let longTap = new CustomEvent("longTap", { bubbles: true });
	function makeLongTapable(elem){
		let timer;
	
		function preventLongPressMenu(node) {
			function absorbEvent_(event) {
			var e = event || window.event;
			e.preventDefault && e.preventDefault();
			e.stopPropagation && e.stopPropagation();
			e.cancelBubble = true;
			e.returnValue = false;
			return false;
			}
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

	function longTapFunc(e){
		console.log("LongTap!");
		triggerEvent(e.target, "dragstart");
	}
	/////
	
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
		
	function moveElement(e){
		$(e.currentTarget).css(
			{
				"top": e.touches[0].clientY - 50+"px",
				"left": e.touches[0].clientX - 100+"px"
			}
		);
	}

    function dragStartFunc(e){
		// alert("dragStarted");

		console.log("DragStart");
		console.log(e);

		let draggingElement = e.target;
		// e.dataTransfer.setData("Text", draggingElement.outerHTML);

		$(draggingElement).addClass("dragging");

		if(verifTouchDevice()){
			
			$(draggingElement.parentNode).css({
				"overflow": "hidden"
			});
			$("body").css({
				"overflow": "hidden"
			});

			global = draggingElement;
			$(draggingElement).css(
				{
					"left": e.target.offsetLeft+"px",
					"top": e.target.offsetHeight+"px",
					"position": "fixed",
					"width": e.target.offsetWidth+"px"
				}
			);
			$(draggingElement).on("touchmove", moveElement);
		}		
	}
	
	function dragEndFunc(e){
		console.log("DragEnd");

		let draggingElement = e.target;
		
		if(verifTouchDevice()){	
			$("body").css({
				"overflow": ""
			});
			$(elem).off("touchmove", moveElement);
		}
		setTimeout(()=>{
			$(draggingElement).addClass("dragged");
			setTimeout(()=>{
				draggingElement.parentNode.removeChild( draggingElement);
			}, 200);
		}, 200);
	}
	
	function mouseDownFunc(ev){
		console.log("mousedown");
		
	}
	function mouseMoveFunc(ev){
		console.log("mouseMove");
	}

	function cancelContextMenuTest(elem){
		// elem.addEventListener("contextmenu", (e)=>{
		// 	e.preventDefault();
		// 	alert("contextmenu canceled!");
		// });
		function absorbEvent_(event) {
			var e = event || window.event;
			e.preventDefault && e.preventDefault();
			e.stopPropagation && e.stopPropagation();
			e.cancelBubble = true;
			e.returnValue = false;
			return false;
		}
		elem.ontouchstart = absorbEvent_;
		elem.ontouchmove = absorbEvent_;
		elem.ontouchend = absorbEvent_;
		elem.ontouchcancel = absorbEvent_;
	}

	//////////////////////////////////////////////////////////////////////////////////
	addEvent("dragenter", elemeTarget, dragEnterFunc, false);

	addEvent("dragover", elemeTarget, dragOverFunc, false);

	addEvent("dragleave", elemeTarget, dragLeaveFunc, false);

	addEvent("drop", elemeTarget, dropFunc, false);

	if(verifTouchDevice()){
		console.log("This device allows touchable events");
	}
    for(let i=0; i<items.length; i++){
		// cancelContextMenuTest(items[i]);
		allowDrag(items[i], true);

		if(verifTouchDevice()){
			makeLongTapable($(items[i]))
			addEvent("longTap", $(items[i]), longTapFunc, false);
		}

		console.log(items[i]);
		addEvent("dragstart", $(items[i]), dragStartFunc, false);
		addEvent("dragend", $(items[i]), dragEndFunc, false);
		addEvent("mousedown", $(items[i]), mouseDownFunc, false);
		addEvent("mousemove", $(items[i]), mouseMoveFunc, false);
    }

})