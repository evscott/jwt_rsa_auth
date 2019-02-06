"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./controller/routes");
const Configs = require("./model/config");
const port = process.env.PORT || 8000;

app.use(
	bodyParser.urlencoded({
		// Middleware
		extended: true
	})
);
app.use(bodyParser.json());
app.use(Configs.AccessControl);
app.use("/", routes);
app.listen(port, () => console.log(`Listening on port: ${port}...`));
