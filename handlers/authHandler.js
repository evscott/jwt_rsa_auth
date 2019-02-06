require("dotenv").config();
const jwt = require("jsonwebtoken");
const Configs = require("../model/config");
const databaseHandler = require("./databaseHandler");

let signup = async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	// Check if username & password already exist, else sign user up
	try {
		databaseHandler.signup(username, password).then(success => {
			if (success) {
				// User successfuly signed up
				res.json({
					success: true,
					message: "Sign up successful!"
				});
			} else {
				// User sign up unsuccessful
				res.json({
					success: false,
					message: "Sign up unsuccessful."
				});
			}
		});
	} catch (err) {
		// Respond with unknown failure
		console.err(err);
		res.json({
			success: false,
			message: "Sign up unsuccessful. This may be network related."
		});
	}
};

let login = async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	// Check if username and password exist, else reject login
	try {
		databaseHandler.login(username, password).then(success => {
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
		// Respond with unknown failure
		console.err(err);
		res.json({
			success: false,
			message: "Authentication unsuccessful. This may be network related."
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
