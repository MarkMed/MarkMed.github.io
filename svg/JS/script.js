
window.addEventListener("load", ()=>{
	var rotation=0;
	var xValue=30;
	var yValue=30;
	window.addEventListener("keydown", (ev)=>{
		switch (ev.key) {
			case "ArrowUp":
				rotation-=1;
				break;
			case "ArrowDown":
				rotation+=1;
				break;
			case "a":
				xValue-=1;
				break;
			case "d":
				xValue+=1;
				break;
			case "w":
				yValue-=1;
				break;
			case "s":
				yValue+=1;
				break;
		}
		document.getElementById("theMotionPath").setAttribute("d", "M50,110 A"+xValue+","+yValue+" "+rotation+" 0,1 110,10 A100,190 0 0,1 50,110");
		/*document.getElementById("circleLimiter").setAttribute("cx", xValue);
		document.getElementById("circleLimiter").setAttribute("cy", yValue);*/
	});
	document.getElementById("svg_test").addEventListener("click", ()=>{
		document.getElementById("svg_test").children[1].innerHTML='<animateTransform attributeName="transform"	attributeType="XML"	type="translate" values="0 0; 0 10; 0 0; 0 -10; 0 0;" dur="1s" repeatCount="3"/>'
		document.getElementById("svg_test").children[2].innerHTML='Mark Med<animateTransform attributeName="transform"	attributeType="XML"	type="translate" values="0 0; 0 10 ; 0 0; 0 -10; 0 0;" dur="1s" repeatCount="3"/>'
	});
	function refreshData(){
		x = 5;  // 5 Seconds
			// Do your thing here
			setTimeout(refreshData, x*1000);
	}
	var animationRepeat0;
	var animationRepeat1;
	var rot=0;
	var heightTrans=0;
	var stateBool=true;
	function toogleJSSpinner(){
		console.log((!animationRepeat0)&&(!animationRepeat1));
		console.log(animationRepeat0);
		console.log(animationRepeat1);
		if((!animationRepeat0)&&(!animationRepeat1)){
			animationRepeat0=setInterval(()=>{
				if(rot>360){
					rot=0;
				}
				document.getElementById("spinner_outerCir").setAttribute("transform", "rotate("+rot+" 50 50)");
				document.getElementById("spinner_innerCir").setAttribute("transform", "rotate("+(rot*-1)+" 50 50)");
				rot+=0.5
			},5);
			animationRepeat1=setInterval(()=>{
				if(heightTrans===15){
					stateBool=false
				}
				else if(heightTrans===(10*-1)){
					stateBool=true
				}
				(stateBool)?(heightTrans+=0.5):(heightTrans-=0.5);
				document.getElementById("lines").children[0].setAttribute("transform", "translate(0, "+((heightTrans/2.5)+(heightTrans/1.6))+")");
				document.getElementById("lines").children[1].setAttribute("transform", "translate(0, "+((heightTrans/2.5)+(heightTrans/2.2))+")");
				document.getElementById("lines").children[2].setAttribute("transform", "translate(0, "+((heightTrans/1.5)+(heightTrans/1.8))+")");
			},25);			
		}
		else{
			clearInterval(animationRepeat0);
			clearInterval(animationRepeat1);			
			animationRepeat0=null;
			animationRepeat1=null;
		}
	}
	toogleJSSpinner();
	var svgs=document.querySelectorAll("svg");
	for(var i=0; i<svgs.length; i++){
		if(i===0){
			svgs[i].addEventListener("click", ev => {
			toogleJSSpinner();
			});
		}
		else{
			svgs[i].addEventListener("click", ev => {
				console.log(ev.target);
			});
		}
    }

    /*document.getElementById("testSVG").addEventListener("change", function() {
        console.log(parseInt(9.43*parseInt(document.getElementById('testSVG').value)));
        gaugeRanges[1].setAttribute("stroke-dasharray", (9.43*parseInt(document.getElementById('testSVG').value))+", 943");
    });*/
    function calcPercent(preValue, value){
        acumul+=preValue;
        return value+acumul;
    }
    var svgContainer=document.querySelector(".svgContainerCircle");
    var svgGauge=svgContainer.querySelector("svg");
    var gaugeRanges=svgGauge.querySelectorAll("circle");
    var acumul=0;
    console.log(gaugeRanges);
    for(var i=gaugeRanges.length-1; i>=0; i--){
        gaugeRanges[i].setAttribute("stroke-dasharray", (9.43*calcPercent((!!gaugeRanges[i+1])?(parseInt(gaugeRanges[i+1].getAttribute("amount"))):(0), parseInt(gaugeRanges[i].getAttribute("amount")))+", 943"));
	}
	

    var svgContainer=document.querySelector(".svgContainerCircle23");
    var svgGauge=svgContainer.querySelector("svg");
    var gaugeRanges=svgGauge.querySelectorAll("circle");
    var acumul=0;
    console.log(gaugeRanges);
    for(var i=gaugeRanges.length-1; i>=0; i--){
        gaugeRanges[i].setAttribute("stroke-dasharray", (2.488*calcPercent((!!gaugeRanges[i+1])?(parseInt(gaugeRanges[i+1].getAttribute("amount"))):(0), parseInt(gaugeRanges[i].getAttribute("amount")))+", 248.16"));
	}

	document.getElementById("MkMmenu").addEventListener("click", (ev)=>{
		console.log(ev.target);
	});
});