const fs = require('fs')
const parseBodyData = (bodyData) => {
	return Buffer.concat(bodyData).toString()
}
const reqHandler = (req, res) => {
	const {url, method} = req;
	console.log("> EXECUTING HANDLER <")

	if(url === "/"){
		console.log("ENTER IN MAIN")
		res.setHeader("Content-Type", "text/html");
		res.write(`
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Main</title>
				</head>
				<body>
					<h1>Hello there! :D</h1>
					<h1>This is the main page</h1>
					<a href="/form">Form!</a>
				</body>
			</html>
		`);
		return res.end();
	}
	if(url === "/form"){
		console.log("ENTER IN FORM")
		res.setHeader("Content-Type", "text/html");
		res.write(`
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Form</title>
				</head>
				<body>
					<h1>Form to do things! xD</h1>
					<form action="/message" method="POST">
						<input type="text" name="msg" id="name"/>
						<button type="submit">Send!</button>
					</form>
				</body>
			</html>
		`);
		return res.end();
	}
	if((url === "/message") && (method === "POST")){
		console.log("ENTER MESSAGE")
		const body = [];

		req.on("data", (dataChunk)=>{
			body.push(dataChunk);
		})
		req.on("end", ()=>{
			const parsedBody = parseBodyData(body);
			const message = parsedBody.split("=")[1];
			console.log("NEW REGISTER > ", message)
			fs.writeFile("message.txt", message, (err)=>{
				console.log("Redirecting")
				res.statusCode = 302;
				res.setHeader("Location", "/");
				return res.end();
			});
		});
	}
	// res.setHeader("Content-Type", "text/html");
	// res.write(`
	// 	<!DOCTYPE html>
	// 	<html lang="en">
	// 		<head>
	// 			<meta charset="UTF-8">
	// 			<meta http-equiv="X-UA-Compatible" content="IE=edge">
	// 			<meta name="viewport" content="width=device-width, initial-scale=1.0">
	// 			<title>Other</title>
	// 		</head>
	// 		<body>
	// 			<h1>Mmm 7-7</h1>
	// 			<h1>You are from another page...</h1>
	// 		</body>
	// 	</html>
	// `);
	console.log(req.url)
	console.log(req.method)
	console.log(req.headers)
}

module.exports = {
	reqHandler
}