import express from 'express';
import { 
    createInventory, 
    getInventory, 
    updateInventory, 
    deleteInventory 
} from '../controllers/inventory.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createInventory)
    .get(protect, getInventory);
router.route('/:id')
    .put(protect, updateInventory)
    .delete(protect, deleteInventory);

export default router;