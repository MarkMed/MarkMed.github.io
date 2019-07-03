var globalVar;
$(document).ready(()=>{
	//////////////////////////////////////////////////////////////////////////////////
	const header = $("header");
	const firstTitle = $("#touchEventsTests .sectionTitle h2");
	const secondTitle = $("#swipeEvents .sectionTitle h2");
	let deviceHeight = $(window).height();
	let documentHeight = $(document).height();
	//////////////////////////////////////////////////////////////////////////////////
	$("#svgScrollDown").click(()=>{
		$('html, body').animate(
			{
				scrollTop: $("#touchEventsTests").offset().top
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
			firstTitle.attr("class", "show");
		}
		if($(document).scrollTop() > secondTitle.offset().top/1.1){
			secondTitle.attr("class", "show");
		}
	});
	//////////////////////////////////////////////////////////////////////////////////
	///// Double Tap Event /////
	let dblTap= new CustomEvent("dblTap", { bubbles: true });
	function doubleTap(elem){
		const bool= (elem.attr("db-tap")==="true")?(true):(false);
		elem.attr("db-tap", true);
		setTimeout( function() { elem.attr("db-tap", false) }, 500 );
		if(bool) {
			elem.get(0).dispatchEvent(dblTap);
			return false;
		}
		event.preventDefault();
	}
	//////////////////////////////////////////////////////////////////////////////////


	function makeSwipable(elem){
		///// Swipe Event /////
		let swipe;
		///// Swipe Up Event /////
		let swipeUp = new CustomEvent("swipeUp", { bubbles: true });
		///// Swipe Down Event /////
		let swipeDown = new CustomEvent("swipeDown", { bubbles: true });
		///// Swipe Rigth Event /////
		let swipeRight = new CustomEvent("swipeRight", { bubbles: true });
		///// Swipe Left Event /////
		let swipeLeft = new CustomEvent("swipeLeft", { bubbles: true });
		
		elem.on("touchstart", startTouch);
		elem.on("touchmove", moveTouch);

		var initialX = null;
		var initialY = null;
		
		function startTouch(e) {
			initialX = e.touches[0].clientX;
			initialY = e.touches[0].clientY;
		};
		
		function moveTouch(e) {
			
			e.preventDefault();


			if (initialX === null) {
				return;
			}
			
			if (initialY === null) {
				return;
			}
			
			var currentX = e.touches[0].clientX;
			var currentY = e.touches[0].clientY;
			
			var diffX = initialX - currentX;
			var diffY = initialY - currentY;

			swipe = new CustomEvent("swipe", { 
				bubbles: true, 
				detail:{
					"swipeAmountX": -diffX,
					"swipeAmountY": -diffY
				}
			});
			
			e.target.dispatchEvent(swipe);

			if (Math.abs(diffX) > Math.abs(diffY)) {
				// sliding horizontally
				if (diffX > 0) {
					// swiped left
					e.target.dispatchEvent(swipeLeft);
				} else {
					// swiped right
					e.target.dispatchEvent(swipeRight);
				}  
			} else {
				// sliding vertically
				if (diffY > 0) {
					// swiped up
					e.target.dispatchEvent(swipeUp);
				} else {
					// swiped down
					e.target.dispatchEvent(swipeDown);
				}  
			}
			initialX = null;
			initialY = null;
		};
	}

	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////
	let touchStartDiv = $("#touchStart");
	touchStartDiv.on("touchstart", (ev)=>{
		ev.preventDefault();
		touchStartDiv.html(`Touch Start!`)
	});
	/////////////////////////////////////////
	let touchEndDiv = $("#touchEnd");
	touchEndDiv.on("touchend", (ev)=>{
		ev.preventDefault();
		touchEndDiv.html(`Touch End!`)
	});
	/////////////////////////////////////////
	let touchMoveDiv = $("#touchMove");
	touchMoveDiv.on("touchmove", (ev)=>{
		ev.preventDefault();
		touchMoveDiv.html(`Moving in: <br/> x: ${ev.touches[0].clientX} y:  ${ev.touches[0].clientY}`)
	});
	/////////////////////////////////////////
	let touchEventsDiv = $("#touchEvents");
	touchEventsDiv.on("touchstart", (ev)=>{
		ev.preventDefault();
		touchEventsDiv.html(`Touch Start!`)
	});
	touchEventsDiv.on("touchmove", (ev)=>{
		ev.preventDefault();
		touchEventsDiv.html(`Moving in: <br/> x: ${ev.touches[0].clientX} y:  ${ev.touches[0].clientY}`)
	});
	touchEventsDiv.on("touchend", (ev)=>{
		ev.preventDefault();
		touchEventsDiv.html(`Touch End!`)
	});
	/////////////////////////////////////////
	$("#doubleTap").on("touchstart", (ev)=>{
		ev.preventDefault();
		let elem = $(ev.target)
		elem.attr("db-tap", (!!elem.attr("db-tap"))?((elem.attr("db-tap")==="true")?(true):(false)):(false));
		doubleTap(elem);
	});
	/////////////////////////////////////////
	/*Listening new events and doing something*/
	$("#doubleTap").on("dblTap", () => {
		$("#doubleTap").html(`Double Tap!`)
	});
	/////////////////////////////////////////
	const swipeUp = $("#swipeUp");
	makeSwipable(swipeUp);
	swipeUp.on("swipeUp", () => {
		swipeUp.html("Swiped Up!");
	});
	/////////////////////////////////////////
	const swipeDown = $("#swipeDown");
	makeSwipable(swipeDown);
	swipeDown.on("swipeDown", () => {
		swipeDown.html("Swiped Down!");
	});
	/////////////////////////////////////////
	const swipeRight = $("#swipeRight");
	makeSwipable(swipeRight);
	swipeRight.on("swipeRight", () => {
		swipeRight.html("Swiped Right!");
	});
	/////////////////////////////////////////
	const swipeLeft = $("#swipeLeft");
	makeSwipable(swipeLeft);
	swipeLeft.on("swipeLeft", () => {
		swipeLeft.html("Swiped Left!");
	});
	/////////////////////////////////////////
	const swipeEvent = $("#swipeEvent");
	swipeEvent.css(
		{
			"transition": "0.4s cubic-bezier(0.17, 0.99, 0.88, 1.32)"
		}
	);
	makeSwipable(swipeEvent);
	swipeEvent.on("swipe", (ev) => {
		
		swipeEvent.css(
			{
				"transform": "translate("+ev.detail.swipeAmountX+"px, "+ev.detail.swipeAmountY+"px)"
			}
		);
	});
	swipeEvent.on("swipeUp", () => {
		swipeEvent.html("Swiped Up!");
	});
	swipeEvent.on("swipeDown", () => {
		swipeEvent.html("Swiped Down!");
	});
	swipeEvent.on("swipeRight", () => {
		swipeEvent.html("Swiped Right!");
	});
	swipeEvent.on("swipeLeft", () => {
		swipeEvent.html("Swiped Left!");
	});
	/////////////////////////////////////////
});