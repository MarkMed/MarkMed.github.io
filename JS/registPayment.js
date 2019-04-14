$(document).ready(()=>{
	let ajaxRQS= new XMLHttpRequest();

	const nameInput = $("#userName");
	const passInput = $("#userPass");


	function checkRegisteredUser(userList){
		for (var i = userList.length - 1; i >= 0; i--) {
			console.log(userList[i]);
		}

	}
	$("#log").click(()=>{
		let Rresponse;
		ajaxRQS.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200){
				console.log(this.response);
				Rresponse=JSON.parse(ajaxRQS.response);
				console.log(Rresponse.users);
			}
		}
		ajaxRQS.open('get', 'https://markmed.github.io/Resources/regis.json', true);
		ajaxRQS.send();
	});
});