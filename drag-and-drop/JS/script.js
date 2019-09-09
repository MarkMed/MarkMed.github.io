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
	let elementDragging;
	function allowDrop(ev) {
		ev.preventDefault();
	}
	
	function drag(ev) {
		console.log(ev.target);
		elementDragging = ev.target;
		ev.dataTransfer.setData('text/plain',null);
	}
	
	function drop(ev) {
		ev.preventDefault();
		console.log("Drop!", ev);
		var data = ev.dataTransfer.getData("DOMString");
		$(ev.target).append(document.getElementById(data));
	}
	let cloudDiv = $("#cloudDiv");
	let storageDiv = $("#storageDiv");
	let items = storageDiv.children();
	for(let i=0; i<items.length; i++){
		$(items[i]).on("dragstart", ()=>{
			drag(event);
			$(items[i]).addClass("dragging");
		});
		$(items[i]).on("dragend", ()=>{
			drag(event);
			$(items[i]).addClass("dragged");
			setTimeout(()=>{
				$(items[i]).css({display: "none"});
			}, 600);
		});
	}
	cloudDiv.on("dragover", ()=>{
		allowDrop(event);
	})
	cloudDiv.on("drop", ()=>{
		console.log("Drop!", event);
		drop(event);
	})


});