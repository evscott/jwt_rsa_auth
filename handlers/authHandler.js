require("dotenv").config();
const jwt = require("jsonwebtoken");
const Configs = require("../model/config");
const databaseHandler = require("./databaseHandler");

let signup = async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	databaseHandler.signup("donky", "kong").then(success => {
		console.log(success);
	});
};

let login = async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	try {
		databaseHandler.login("donky", "kong").then(success => {
			// Check if username and password exists in DB
			if (username && password) {
				if (success) {
					// Respond with token and success
					let token = jwt.sign(
						{ username: username },
						Configs.privatekey,
						Configs.signOptions
					);
					res.json({
						success: true,
						message: "Authentication successful!",
						token: token
					});
				} else {
					// Respond with credential authentication failure
					res.json({
						success: false,
						message: "Incorrect username or password."
					});
				}
			} else {
				// Respond with ambigious authentication failure
				res.json({
					success: false,
					message: "Authentication failed! Please check the request."
				});
			}
		});
	} catch (err) {
		console.err(err);
	}
};

let index = (req, res) => {
	res.json({
		success: true,
		message: "Index page"
	});
};

module.exports = {
	login: login,
	index: index
};
