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
	let touchStartDiv = $("#touchStart");
	let touchEndDiv = $("#touchEnd");
	let touchEventsDiv = $("#touchEvents");
	let touchMoveDiv = $("#touchMove")
	//////////////////////////////////////////////////////////////////////////////////
	///// Double Tap Event /////
	let cEvent= new CustomEvent("dblTap", { bubbles: true });
	function doubleTap(elem){
		const bool= (elem.attr("db-tap")==="true")?(true):(false);
		elem.attr("db-tap", true);
		setTimeout( function() { elem.attr("db-tap", false) }, 500 );
		if(bool) {
			elem.get(0).dispatchEvent(cEvent);
			return false;
		}
		event.preventDefault();
	}
	//////////////////////////////////////////////////////////////////////////////////
	///// Swipe Event /////
	let swipe = new CustomEvent("swipe", { bubbles: true });
	///// Swipe Up Event /////
	let swipeUp = new CustomEvent("swipeUp", { bubbles: true });
	///// Swipe Down Event /////
	let swipeDown = new CustomEvent("swipeDown", { bubbles: true });
	///// Swipe Rigth Event /////
	let swipeRight = new CustomEvent("swipeRight", { bubbles: true });
	///// Swipe Left Event /////
	let swipeLeft = new CustomEvent("swipeLeft", { bubbles: true });

	$("#swipeEvent").on("touchstart", startTouch);
	$("#swipeEvent").on("touchmove", moveTouch);
	$("#swipeEvent").css(
		{
			"transition": "0.3s"
		}
	);
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
		
		e.target.dispatchEvent(swipe);

		if (Math.abs(diffX) > Math.abs(diffY)) {
			// sliding horizontally
			if (diffX > 0) {
		 		// swiped left
				e.target.dispatchEvent(swipeLeft);
				$("#swipeEvent").html("Swiped left");
			} else {
		 		// swiped right
				e.target.dispatchEvent(swipeRight);
		 		$("#swipeEvent").html("Swiped right");
			}  
		} else {
			// sliding vertically
			if (diffY > 0) {
				// swiped up
				e.target.dispatchEvent(swipeUp);
				$("#swipeEvent").html("Swiped up");
			} else {
				// swiped down
				e.target.dispatchEvent(swipeDown);
				$("#swipeEvent").html("Swiped down");
			}  
		}
		$("#swipeEvent").css(
			{
				"transform": "translate("+-diffX+"px, "+-diffY+"px)"
			}
		);
		initialX = null;
		initialY = null;
	};

	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////
	touchStartDiv.on("touchstart", (ev)=>{
		ev.preventDefault();
		touchStartDiv.html(`Touch Start!`)
	});
	/////////////////////////////////////////
	touchEndDiv.on("touchend", (ev)=>{
		ev.preventDefault();
		touchEndDiv.html(`Touch End!`)
	});
	/////////////////////////////////////////
	touchMoveDiv.on("touchmove", (ev)=>{
		ev.preventDefault();
		touchMoveDiv.html(`Moving in: <br/> x: ${ev.touches[0].clientX} y:  ${ev.touches[0].clientY}`)
	});
	/////////////////////////////////////////
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
	/*Listening new event and doing something*/
	$("#doubleTap").on('dblTap', () => {
		$("#doubleTap").html(`Double Tap!`)
	});
	/////////////////////////////////////////
});