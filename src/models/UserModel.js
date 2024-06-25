const mysql = require('mysql');
const bcrypt = require('bcrypt');


// Include the JWT token in the user authentication process

// Verify the password against the hashed password in the database 
const verifyPassword = (password, hashedPassword) => { 
    return bcrypt.compareSync(password, hashedPassword); 
};

// Hash the password before storing it in the database
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

exports.authenticate = async (username, password) => {
    const query = `SELECT * FROM user WHERE username = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length === 0) {
                    reject(new Error('Invalid username'));
                } else {
                    const user = result[0];
                    const passwordMatch = verifyPassword(password, user.password);
                    if (passwordMatch) {
                        resolve(user);
                    } else {
                        reject(new Error('Invalid password'));
                    }
                }
            }
        });
    });

};

exports.create = async (username, password) => {
    const query = `INSERT INTO user (username, password) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
        connection.query(query, [username, hashPassword(password)], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.read = async (userId) => {
    const query = `SELECT * FROM user WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.update = async (userId, username, password) => {
    const query = `UPDATE user SET username = ?, password = ? WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [username, hashPassword(password), userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.delete = async (userId) => {
    const query = `DELETE FROM user WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
