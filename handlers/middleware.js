const jwt = require("jsonwebtoken");
const Configs = require("../model/config.js");

let checkToken = (req, res, next) => {
	let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

	if (token) {
		// Remove Bearer from string if detected
		if (token.startsWith("Bearer ")) token = token.slice(7, token.length);
		// Determine if jwt token is legit
		let legit = jwt.verify(
			token,
			Configs.publickey,
			Configs.verifyOptions,
			(err, decoded) => {
				if (err) {
					return res.json({
						success: false,
						message: "Token is not valid"
					});
				} else {
					req.decoded = decoded;
					next();
				}
			}
		);
	} else {
		return res.json({
			success: false,
			message: "Auth token is not supplied"
		});
	}
};

module.exports = {
	checkToken: checkToken
};
