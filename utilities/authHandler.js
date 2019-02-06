require("dotenv").config();
const jwt = require("jsonwebtoken");
const Configs = require("../model/config");

let login = (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	if (username && password) {
		// TODO Check auth credentials here
		if (true) {
			let token = jwt.sign(
				{ username: username },
				Configs.privatekey,
				Configs.signOptions
			);
			// return the JWT token for the future API calls
			res.json({
				success: true,
				message: "Authentication successful!",
				token: token
			});
		} else {
			res.send(403).json({
				success: false,
				message: "Incorrect username or password."
			});
		}
	} else {
		res.send(400).json({
			success: false,
			message: "Authentication failed! Please check the request."
		});
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
