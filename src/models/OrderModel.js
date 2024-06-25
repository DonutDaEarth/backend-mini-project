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

exports.placeOrder = async (productId, userId, orderTime) => {
        const query = 'INSERT INTO order_history (product_id, user_id, order_time) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
                connection.query(query, [productId, userId, orderTime], (err, result) => {
                        if (err) {
                                reject(err);
                        } else {
                                resolve(result);
                        }
                });
        });
};

exports.getOrderHistory = async (userId) => {
        const query = 'SELECT order_id, order_history.user_id, product.product_id, product.product_name, order_time FROM order_history INNER JOIN product ON product.product_id = order_history.product_id WHERE user_id = ? ORDER BY order_time DESC';
        return new Promise((resolve, reject) => {
                connection.query(query, [userId], (err, result) => {
                        if (err) {
                                reject(err);
                        } else {
                                resolve(result);
                        }
                });
        });
};

exports.getOrderProducts = async (orderId) => {
        const query = 'SELECT order_id, order_history.user_id, product.product_id, product.product_name FROM order_history INNER JOIN product ON product.product_id = order_history.product_id WHERE order_id = ?';
        return new Promise((resolve, reject) => {
                connection.query(query, [orderId], (err, result) => {
                        if (err) {
                                reject(err);
                        } else {
                                resolve(result);
                        }
                });
        });
};
