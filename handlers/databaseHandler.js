const db = require("../model/database");
const pool = db.getPool();

// Sign up handler
let signup = async (username, password) => {
	let signupQuery = `INSERT IGNORE INTO person (username, password) VALUES ("${username}", "${password}")`;
	return new Promise((resolve, reject) => {
		pool.query(signupQuery, (err, res) => {
			if (err) reject(err);
			else if (res.affectedRows > 0) resolve(true);
			else resolve(false);
		});
	});
};

// Sign in handler
let login = async (username, password) => {
	let loginQuery = `SELECT * FROM person WHERE username="${username}" AND password="${password}"`;
	return new Promise((resolve, reject) => {
		pool.query(loginQuery, (err, res) => {
			if (err) reject(err);
			else if (res.length > 0) resolve(true);
			else resolve(false);
		});
	});
};

module.exports = {
	signup: signup,
	login: login
};
