"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./controller/routes");

const port = process.env.PORT || 8000;
app.use(
	bodyParser.urlencoded({
		// Middleware
		extended: true
	})
);

app.use(bodyParser.json());
app.use("/", routes);
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
