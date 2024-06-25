const model = require('../models/ProductModel');


exports.create = async (req, res) => {
    console.log(req.body);
    const {product_name} = req.body;
    if(!product_name){
        res.status(400).json({
            status: 'error',
            message: 'Please provide all required fields'
        });
    } else{
        try {
            const result = await model.create(product_name);
            res.status(201).json({ message: `User created successfully with NAME ${result}` });
        } catch (error) {
            res.status(400).json({ message: 'Error creating user' });
  }
    };
}
exports.createMulti = async (req, res) => {
    const products = req.body;
    if (!Array.isArray(products) || products.length === 0) {
        res.status(400).json({
            status: 'error',
            message: 'Please provide an array of products'
        });
    } else {
        try {
            const results = await Promise.all(products.map(async (product) => {
                const { product_name } = product;
                if (!product_name) {
                    throw new Error('Please provide all required fields');
                }
                return await model.create(product_name);
            }));
            res.status(201).json({ message: `User created successfully with NAME ${results}` });

        } catch (err) {
            res.status(400).json({ message: 'Error creating user' });
        }
    }
}

exports.read = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await model.read(id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching users' });
    }
}

exports.readAll = async (req, res) => {
    try {
        const results = await model.readAll();
        res.json(results);
      } catch (error) {
        res.status(404).json({ message: 'Error fetching users' });
      }
}
exports.readMulti = async (req, res) => {
    const ids = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        res.status(400).json({
            status: 'error',
            message: 'Please provide an array of product IDs'
        });
    } else {
        try {
            const results = await Promise.all(ids.map(async (id) => {
                const result = await model.read(id);
                if (!result) {
                    throw new Error(`Product with ID ${id} not found`);
                }
                return result;
            }));
            res.json(results);

        } catch (err) {
            res.status(404).json({ message: 'Error fetching users' });
        }
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const { product_name } = req.body;
    if (!product_name || !id) {
        res.status(400).json({
            status: 'error',
            message: 'Please provide all required fields'
        });
    } else {
        try {
            const result = await model.update(id, product_name);
            if (!result) {
                res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'Product updated successfully',
                    data: result
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await model.delete(id);
        res.status(201).json({ message: `User created successfully with NAME ${result}` });
        
    } catch (error) {
        res.status(400).json({ message: 'Error creating user' });
    }
}

exports.deleteMulti = async (req, res) => {
    const products = req.body;
    if (!Array.isArray(products) || products.length === 0) {
        res.status(400).json({
            status: 'error',
            message: 'Please provide an array of products'
        });
    } else {
        try {
            const results = await Promise.all(products.map(async (product) => {
                const { id } = product;
                if (!id) {
                    throw new Error('Please provide all required fields');
                }
                return await model.delete(id);
            }));
            res.status(201).json({ message: `User created successfully with NAME ${results}` });
        } catch (err) {
            res.status(400).json({ message: 'Error creating user' });
        }
    }
}
