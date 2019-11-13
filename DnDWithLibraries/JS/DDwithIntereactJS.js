var globalVar;
$(document).ready(()=>{
	//////////////////////////////////////////////////////////////////////////////////
	const header = $("header");
	const firstTitle = $("#DDinSD .sectionTitle");
	const secondTitle = $("#DDwithDT .sectionTitle");
	// const secondTitle = $("#swipeEvents .sectionTitle h2");
	let deviceHeight = $(window).height();
	let documentHeight = $(document).height();
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
			$("#DDinSD p").removeClass("hidden").addClass("show");
		}
		if($(document).scrollTop() > secondTitle.offset().top/1.1){
			secondTitle.removeClass("hidden").addClass("show");
			$("#DDwithDT p").removeClass("hidden").addClass("show");
		}
	});
	//////////////////////////////////////////////////////////////////////////////////

	const slider = interact('.slider')    // target elements with the "slider" class

	slider
	// Step 2
	.draggable({                        // make the element fire drag events
		origin: 'self',                   // (0, 0) will be the element's top-left
		inertia: true,                    // start inertial movement if thrown
		modifiers: [
		interact.modifiers.restrict({
			restriction: 'self'            // keep the drag coords within the element
		})
		]
	})
	// Step 3
	.on('dragmove', function (event) {  // call this listener on every dragmove
		const sliderWidth = interact.getElementRect(event.target.parentNode).width
		const value = event.pageX / sliderWidth

		event.target.style.paddingLeft = (value * 102) + '%'
		event.target.setAttribute('data-value', value.toFixed(2))
	})

})