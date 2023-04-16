import express from 'express';

import { categoryController, deleteCategoryCOntroller, getCategoryController,  updateCategoryController, uploadController } from '../controllers/categoryController.js';
import { isAdmin, requireSignIn } from '../middelewares/authMiddelware.js';
import { uploader } from '../middelewares/imageUploadMiddelware.js';




const router = express.Router();

/// create a new category route
router.post('/create-category',requireSignIn,isAdmin, uploader.single('photo'),categoryController,)

// update the categoryisAdmin
router.put('/update-category/:id', requireSignIn,isAdmin, updateCategoryController,)

//get all the categories
router.get('/categories', getCategoryController,)


//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router