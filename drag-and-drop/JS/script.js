var globalVar;
$(document).ready(()=>{
	//////////////////////////////////////////////////////////////////////////////////
	const header = $("header");
	const firstTitle = $("#simpleDD .sectionTitle h2");
	// const secondTitle = $("#swipeEvents .sectionTitle h2");
	let deviceHeight = $(window).height();
	let documentHeight = $(document).height();
	//////////////////////////////////////////////////////////////////////////////////
	$("#svgScrollDown").click(()=>{
		$('html, body').animate(
			{
				scrollTop: $("#simpleDD").offset().top
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
		// if($(document).scrollTop() > secondTitle.offset().top/1.1){
		// 	secondTitle.attr("class", "show");
		// }
	});
	//////////////////////////////////////////////////////////////////////////////////
	
	function allowDrop(ev) {
		ev.preventDefault();
	}
	
	function drag(ev) {
		console.log(ev.target);
		ev.dataTransfer.addElement(ev.target);
	}
	
	function drop(ev) {
		ev.preventDefault();
		console.log(ev);
		var data = ev.dataTransfer.getData("DOMString");
		$(ev.target).append(document.getElementById(data));
	}
	let cloudDiv = $("#cloudDiv");
	let storageDiv = $("#storageDiv");
	let items = storageDiv.children();
	for(let i=0; i<items.length; i++){
		$(items[i]).on("dragstart", ()=>{
			drag(event);
			$(items[i]).css({backgroundColor: "#ffe", borderLeft: "5px solid #ccc" })
		});
	}
	cloudDiv.on("dragover", ()=>{
		allowDrop(event);
	})
	cloudDiv.on("drop", ()=>{
		drop(event);
	})


});