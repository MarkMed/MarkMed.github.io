$(document).ready(()=>{
	function isTop(){
		var actualTop=$(document).scrollTop();
		var boolvar;
		(actualTop>($("#wlcmCover").height())/4)?(boolvar=true):(boolvar=false);
		return boolvar;
	}
	(isTop())?($("#banner").addClass("topFixed")):($("#banner").addClass("topExpanded"));
	$(document).scroll(()=>{
		(isTop())?( ($("#banner").hasClass("topExpanded"))?($("#banner").removeAttr("class").addClass("topFixed")):(false) ):($("#banner").removeAttr("class").addClass("topExpanded"));
	});
 
 });