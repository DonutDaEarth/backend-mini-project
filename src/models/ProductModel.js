const mysql = require('mysql');

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

exports.create = async (productName) => {
  const query = `INSERT INTO product (product_name) VALUES (?)`;
  return new Promise((resolve, reject) => {
    connection.query(query, [productName], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.read = async (productId) => {
  const query = `SELECT * FROM product WHERE product_id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [productId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.readAll = async () => {
  const query = `SELECT * FROM product`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  }

exports.update = async (productId, productName) => {
  const query = `UPDATE product SET product_name = ? WHERE product_id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [productName, productId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.delete = async (productId) => {
  const query = `DELETE FROM product WHERE product_id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [productId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
