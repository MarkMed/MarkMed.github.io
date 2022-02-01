const Xpress = require("express");
const router = Xpress.Router();


router.get("/shop", (req, res, next)=>{
	console.log("Returning HTML");
	res.send(`
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
				<a href="/admin">Admin Page</a>
			</body>
		</html>
	`);	
});

module.exports = router;