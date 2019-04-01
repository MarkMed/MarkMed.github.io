$(document).ready(()=>{
	// function isTop(){
	// 	var actualTop=$(document).scrollTop();
	// 	var boolvar;
	// 	(actualTop>($("#wlcmCover").height())/4)?(boolvar=true):(boolvar=false);
	// 	return boolvar;
	// }
	// (isTop())
	// 	?($("#MkM").addClass("topFixed"))
	// 	:(
	// 		$("#MkM").addClass("expanded")			
	// 		$("body").css("overflow", "hidden")
	// 	);
	// $(document).scroll(()=>{
	// 	(isTop())
	// 		?( ($("#MkM").hasClass("expanded"))
	// 			?($("#MkM").removeAttr("class").addClass("topFixed"))
	// 			:(false)
	// 		)
	// 		:(
	// 			$("#MkM").removeAttr("class").addClass("expanded")
	// 			$("body").css("overflow", "hidden")
	// 		);
	// });
	let chapters=$('[class="chapter"]');
	$('html, body').animate(
		{
			scrollTop: $(chapters[0]).offset().top
		},
		400
	);
	// let currentChapter=chapters[0];
	// function changeSection(){
	// 	if ($(this).scrollTop() > lastScrollTop){
				
	// 	}
	// 	else {
	// 				// upscroll code
	// 	}
	// 	lastScrollTop = $(this).scrollTop();
		// $('html, body').animate(
		// 	{
		// 		scrollTop: $(currentChapter).offset().top
		// 	},
		// 	500,
		// 	'linear'
		// );
	// }
	$(document).scroll(function(e){		
		$("header").css(
			{
				"opacity": 1-($(document).scrollTop()/800),
				"transform": "translateY(-"+$(document).scrollTop()/4+"px)"
			}
		);
	});
	$("#openMenu").change(()=>{
		($("#openMenu").prop('checked'))?($("body").css("overflow", "hidden")):($("body").css("overflow", ""));
	});

	$("#burger").click((ev)=>{
		(ev.target.parentElement.children[2].checked)?(ev.target.parentElement.children[2].checked=false):(ev.target.parentElement.children[2].checked=true);
	});

	$("#svgScrollDown").click(()=>{
		$('html, body').animate(
			{
				scrollTop: $(chapters[1]).offset().top
			},
			{
				duration: 400, 
				easing: "linear"
			}
		);
	});
});