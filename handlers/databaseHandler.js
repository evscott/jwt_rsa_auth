const db = require("../model/database");
const pool = db.getPool();

async function signup(username, password) {
	let query = `INSERT IGNORE INTO person (username, password) VALUES ("${username}", "${password}")`;
	return new Promise((resolve, reject) => {
		pool.query(query, (err, res) => {
			if (err) {
				reject(err);
			} else if (res.affectedRows > 0) {
				console.log("Successful signup.");
				resolve(true);
			} else if (res.affectedRows == 0) {
				console.log("Unsuccessful signup.");
				resolve(false);
			}
		});
	});
}

async function login(username, password) {
	console.log("signup begin");
	signup(username, password);
	console.log("signup end");
	let query = `SELECT * FROM person WHERE username="${username}" AND password="${password}"`;
	return new Promise((resolve, reject) => {
		pool.query(query, (err, res) => {
			if (err) {
				reject(err);
			} else if (res.length > 0) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
}

module.exports = {
	signup: signup,
	login: login
};
