// const http = require('http');
const Xpress = require("express");
const bodyParser = require("body-parser");
const path = require("path")

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// const {reqHandler} = require("./routes");

const app = Xpress();
const portNumber = 2121
// const server = http.createServer(app);


app.use(bodyParser.urlencoded({extended: false}));

// Middlewares for /admin/product, admin//add_product paths
app.use("/admin", adminRoutes);

// Middlewares for /product /add_product paths
app.use(shopRoutes);

// if the path isn't correct
// app.use("/", (req, res, next)=>{
// 	res.status(404);	
// 	res.send(`
// 		<!DOCTYPE html>
// 		<html lang="en">
// 			<head>
// 				<meta charset="UTF-8">
// 				<meta http-equiv="X-UA-Compatible" content="IE=edge">
// 				<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 				<title>Add product</title>
// 			</head>
// 			<body>
// 				<h1>404 - Page not found! :(</h1>
// 				<a href="/">Go back Home</a>
// 			</body>
// 		</html>
// 	`);
// });
app.use("/", (req, res, next)=>{
	res.sendFile(path.join(__dirname, "views", "task2.html"));
});

app.listen(portNumber);