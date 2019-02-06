require("dotenv").config();

module.exports = {
	publickey: process.env.PUBLIC_KEY,
	privatekey: process.env.PRIVATE_KEY,
	signOptions: {
		expiresIn: "12h",
		algorithm: "RS256" // RSASSA [ "RS256", "RS384", "RS512" ]
	},
	verifyOptions: {
		expiresIn: "12h",
		algorithm: ["RS256"]
	}
};
