$(document).ready(()=>{
	let xhr= new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        console.log("xhr.onreadystatechange");
        if(this.readyState == 4 && this.status == 200) {
            console.log(this);
            console.log(this.readyState);
            console.log(this.status);
            console.log(this.responseText);
            $("section#target").html(this.responseText)
        }
    }
    xhr.open('get', 'Resources/regis.txt', true);
    xhr.send();
});