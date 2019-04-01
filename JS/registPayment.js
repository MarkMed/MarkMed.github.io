$(document).ready(()=>{
	let xhr= new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        console.log("xhr.onreadystatechange");
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.readystate);
            console.log(this.status);
            console.log(this.responsetext);
        }
    }
    xhr.open('get', 'Resources/regis.txt', true);
    xhr.send();
});