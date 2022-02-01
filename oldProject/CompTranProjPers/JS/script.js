/*Saving triggerers*/
var btn1=document.getElementById("Trgt_Intro_opt");
var btn2=document.getElementById("Trgt_study_opt");
var btn3=document.getElementById("Trgt_work_opt");
var btn4=document.getElementById("Trgt_pers_opt");
var btn5=document.getElementById("schedule_opt");
var btn6=document.getElementById("foda_opt");

/*Shower switcher*/
function duchar(id, num1, num2){
	var sectionz=document.getElementsByName("mainSections");
	for(var i=0; i<sectionz.length; i++){
		sectionz[i].setAttribute("class", "NoDuchando mainSection");
	}
	var divz=document.getElementsByName("innerDiv");
	for(var i=0; i<divz.length; i++){
		divz[i].setAttribute("class", "Nopacity section_title");
	}
	var divz2=document.getElementsByName("innerDivC");
	for(var i=0; i<divz2.length; i++){
		divz2[i].setAttribute("class", "Nopacity section_container");
	}
	document.getElementById(id).setAttribute("class", "Duchando mainSection");
	setTimeout(
		function(){
		divz[num1].setAttribute("class", "opacity section_title");
		divz2[num2].setAttribute("class", "opacity section_container");
		}
	, 2000);
}
/*Adding events*/
/*btn1.addEventListener("click", duchar("Trgt_Intro"));
btn2.addEventListener("click", duchar("Trgt_study"));
btn3.addEventListener("click", duchar("Trgt_work"));
btn4.addEventListener("click", duchar("Trgt_pers"));*/
//Autorun without click. Unkown Error (for me);
//Autorun because the bubbling fx was activated (fixed)

/*Adding events*/
btn1.addEventListener("click", function(){
	duchar("Trgt_Intro", 0, 0);
});
btn2.addEventListener("click", function(){
	duchar("Trgt_study", 1, 1);
});
btn3.addEventListener("click", function(){
	duchar("Trgt_work", 2, 2);
});
btn4.addEventListener("click", function(){
	duchar("Trgt_pers", 3, 3);
});
btn5.addEventListener("click", function(){
	duchar("schedule", 4, 4);
});
btn6.addEventListener("click", function(){
	duchar("foda", 5, 5);
});

setTimeout(
	function(){
		duchar("Trgt_Intro", 0, 0);
	}
, 2000);