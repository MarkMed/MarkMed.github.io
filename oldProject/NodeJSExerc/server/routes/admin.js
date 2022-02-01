const Xpress = require("express");
const router = Xpress.Router()

// Main page > GET
router.get("/", (req, res, next)=>{
	res.send(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Add product</title>
			</head>
			<body>
				<h1>Admin page!</h1>
				<a href="/admin/add_product">Add Product!</a>
			</body>
		</html>
	`);	
});


// Add Product > GET
router.get("/add_product", (req, res, next)=>{
	res.send(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Add product</title>
			</head>
			<body>
				<h1>Add a new product</h1>
				<form action="/admin/add_product" method="POST">
					<label for="productTitle">Title</label><input type="text" name="title" id="productTitle"/>
					<br/>
					<label for="productPrice">Price</label><input type="number" name="price" id="productPrice"/>
					<br/>
					<button type="submit">Add!</button>
				</form>
			</body>
		</html>
	`);	
});

// Add Product > POST
router.post("/add_product", (req, res, next)=>{
	console.log(req.body);
	res.redirect("/admin");
});


module.exports = router;