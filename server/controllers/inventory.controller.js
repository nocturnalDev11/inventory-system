import asyncHandler from 'express-async-handler';
import { Inventory } from '../models/inventory.model.js';

// @desc    Create new inventory item
// @route   POST /api/inventory
// @access  Private
const createInventory = asyncHandler(async (req, res) => {
    const { name, quantity, price, category, description, lowStockThreshold } = req.body;
    
    const inventory = new Inventory({
        user: req.user._id,
        name,
        quantity,
        price,
        category,
        description,
        lowStockThreshold
    });

    const createdItem = await inventory.save();
    res.status(201).json(createdItem);
});

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private
const getInventory = asyncHandler(async (req, res) => {
    const items = await Inventory.find({ user: req.user._id });
    res.json(items);
});

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Private
const updateInventory = asyncHandler(async (req, res) => {
    const item = await Inventory.findById(req.params.id);
    
    if (item) {
        if (item.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }
        
        item.name = req.body.name || item.name;
        item.quantity = req.body.quantity || item.quantity;
        item.price = req.body.price || item.price;
        item.category = req.body.category || item.category;
        item.description = req.body.description || item.description;
        item.lowStockThreshold = req.body.lowStockThreshold || item.lowStockThreshold;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private
const deleteInventory = asyncHandler(async (req, res) => {
    const item = await Inventory.findById(req.params.id);
    
    if (item) {
        if (item.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }
        
        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

export { createInventory, getInventory, updateInventory, deleteInventory };