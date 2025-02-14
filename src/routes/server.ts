import express from "express";
import userRoutes from './users';
import groceryRoutes from './groceries';
import orderRoutes from './orders';


const router = express.Router();

router.use('/users', userRoutes);
router.use('/groceries', groceryRoutes);
router.use('/orders', orderRoutes);


export default router;