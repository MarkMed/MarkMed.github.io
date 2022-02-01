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

})