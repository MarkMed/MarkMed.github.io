// $(document).ready(()=>{
// 	function isTop(){
// 		var actualTop=$(document).scrollTop();
// 		var boolvar;
// 		(actualTop>($("#wlcmCover").height())/4)?(boolvar=true):(boolvar=false);
// 		return boolvar;
// 	}
// 	(isTop())?($("#banner").addClass("topFixed")):($("#banner").addClass("topExpanded"));
// 	$(document).scroll(()=>{
// 		(isTop())?( ($("#banner").hasClass("topExpanded"))?($("#banner").removeAttr("class").addClass("topFixed")):(false) ):($("#banner").removeAttr("class").addClass("topExpanded"));
// 	});
 
//  });
(()=>{

	function elementID(id){
		return document.getElementById(id);
	}
	function addEvent(element, event, callback){
		element.addEventListener(event, callback);
	}
	function removeEvent(element, event, callback){
		element.removeEventListener(event, callback);
	}

	const banner = elementID("banner");
	const screenSizes = {
		height: window.innerHeight,
		width: window.innerWidth
	}
	document.addEventListener("scroll", ()=>{
		let windowScroll=window.pageYOffset;
		if(windowScroll > (screenSizes.height/3)){
			banner.setAttribute("class", "topFixed");
		}
		else{
			banner.setAttribute("class", "topExpanded");
		}
		if(windowScroll < (screenSizes.height)){
			elementID("headerBckgrnd").style.backgroundPosition= `100% ${50-windowScroll/20}%`;
		}
	});
})();