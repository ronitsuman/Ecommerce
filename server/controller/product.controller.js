import Product from "../models/Product.js";

// ✅ Create New Product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;
        console.log(name,description)
        const product = new Product({ name, description, price, category, stock, image });
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createProduct, getProducts };
