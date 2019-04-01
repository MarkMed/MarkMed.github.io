$(document).ready(()=>{
	let xhr= new XMLHttpRequest();

    xhr.open('get', 'Resources/regis.txt', true);
    xhr.send();

    console.log(xhr.readystate);
    console.log(xhr.status);

    xhr.onreadystatechange = function() {
        console.log("xhr.onreadystatechange");
        if(this.readyState == 4 && this.status == 200) {
            console.log(xhr.readystate);
            console.log(xhr.status);
            console.log(xhr.responsetext);
        }
    }
});