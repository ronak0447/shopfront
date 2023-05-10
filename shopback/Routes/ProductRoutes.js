import express from 'express';
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '../Controllers/ProductController.js';
import { isAuthenticated } from '../MiddleWare/Auth.js';

const router = express.Router();

router.route('/addproduct').post(isAuthenticated,addProduct);
router.route('/products').get(isAuthenticated,getAllProducts);
router.route('/updateproduct/:id').put(isAuthenticated,updateProduct);
router.route('/deleteproduct/:id').delete(isAuthenticated,deleteProduct);
export default router;