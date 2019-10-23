$(document).ready(()=>{

    //////////////////////////////////////////////////////////////////////////////////

    const elemeTarget = $("#elementTarget");
    const elemStart = $("#elementStart");
    let items = elemStart.children();

	//////////////////////////////////////////////////////////////////////////////////
	
	function addEvent(listenEvent, elem, func, useCapture){
		elem.get(0).addEventListener(listenEvent, func, useCapture);
	}

	function emitEvent(elem, eventToEmit){
			
		let eventIntance = document.createEvent("HTMLEvents");
		eventIntance.initEvent(eventToEmit, true, false);
		elem.dispatchEvent(eventIntance);

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
		emitEvent(e.target, "dragstart");
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

    function dragStartFunc(e){
		console.log("DragStart");

		console.log(e);
		let draggingElement = e.target;
		e.dataTransfer.setData("Text", draggingElement.outerHTML);

		$(draggingElement).addClass("dragging");

		if(verifTouchDevice()){	
			$("body").css({
				"overflow": "hidden"
			});

			$(draggingElement).css(
				{
					"position": "fixed",
					"top": e.target.y+"px",
					"left": e.target.x+"px",
					"transition": "0s"
				}
			);
		}		
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
	
	function cancelContextMenuTest(elem){
		elem.addEventListener("contextmenu", (e)=>{
			e.preventDefault();
			alert("contextmenu canceled!");
		});
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
		cancelContextMenuTest(items[i]);
		allowDrag(items[i], true);

		if(verifTouchDevice()){
			makeLongTapable($(items[i]))
			addEvent("longTap", $(items[i]), longTapFunc, false);
		}

		console.log(items[i]);
		addEvent("dragstart", $(items[i]), dragStartFunc, false);
		addEvent("dragend", $(items[i]), dragEndFunc, false);
    }

})