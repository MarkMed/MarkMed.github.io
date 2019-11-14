var globalVar;
$(document).ready(()=>{
	//////////////////////////////////////////////////////////////////////////////////
	const header = $("header");
	const firstTitle = $("#DDinSD .sectionTitle");
	const secondTitle = $("#DDwithDT .sectionTitle");
	const imgArray = $("#startStorage").children();
	let deviceHeight = $(window).height();
	let documentHeight = $(document).height();
	//////////////////////////////////////////////////////////////////////////////////

	function makeDraggable(elem){
		const position = { x: 0, y: 0 }
		elem.css({
			"touch-action": "none",
			"user-select": "none"
		});

		interact(elem.get(0)).draggable({
			listeners: {
			  start (event) {
				console.log(event.type, event.target);
				console.log("dragStart");
			  },
			  move (event) {
				console.log("dragging")
				position.x += event.dx
				position.y += event.dy
		  
				event.target.style.transform =
				  `translate(${position.x}px, ${position.y}px)`
			  },
			  end (event) {
				console.log("drag end")
			  }
			}
		  })

	}

	//////////////////////////////////////////////////////////////////////////////////
	$("#svgScrollDown").click(()=>{
		$('html, body').animate(
			{
				scrollTop: $("#DDinSD").offset().top
			},
			{
				duration: 400, 
				easing: "linear"
			}
		);
	});
	///////////////////////////////////////
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
			$("#DDinSD p").removeClass("hidden").addClass("show");
		}
		if($(document).scrollTop() > secondTitle.offset().top/1.1){
			secondTitle.removeClass("hidden").addClass("show");
			$("#DDwithDT p").removeClass("hidden").addClass("show");
		}
	});

	for(let i=0; i<imgArray.length; i++){
		makeDraggable($(imgArray[i]));
	}

})