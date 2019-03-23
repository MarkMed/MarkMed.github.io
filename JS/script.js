$(document).ready(()=>{
	// let lastScrollTop = 0;
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
		// e.preventDefault()
		// changeSection();
		// chapters.map((elemIndex)=>{
		// 	console.log(chapters[elemIndex]);
		// })
		
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
	$("#svgScrollDown").click(()=>{
		$('html, body').animate(
			{
				scrollTop: $(chapters[1]).offset().top
			},
			400
		);
	});
});