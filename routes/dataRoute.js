import express from 'express';
import { createDataController, deleteProductController, getProductsController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, realtedProductController, searchProductController, singleCategoryWaysProductController, updateProductController } from '../controllers/dataController.js';
import { isAdmin, requireSignIn } from '../middelewares/authMiddelware.js';
// import formidable from 'express-formidable'
import { updateCategoryController } from '../controllers/categoryController.js';
import { uploader } from '../middelewares/imageUploadMiddelware.js';

//import express formidable from 


const router = express.Router();

/// create a new produt route
router.post('/create-data',  createDataController);

//routes
router.put("/update-product/:pid", uploader.single('photo'),updateProductController);

// //get all the produt
router.get('/get-products', getProductsController,)

// //get-single category
// router.get("/single-category-product/:id", singleCategoryWaysProductController);


// //single product
// router.get("/get-product/:slug", getSingleProductController);

// //get photo
// router.get("/product-photo/:id", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

// //filter product
// router.post("/product-filters", productFiltersController);

// //product count
// router.get("/product-count", productCountController);

// //product per page
// router.get("/product-list/:page", productListController);

// //search product
// router.get("/search/:keyword", searchProductController);

// //similar product
// router.get("/related-product/:pid/:cid", realtedProductController);

// //category wise product
// router.get("/product-category/:slug", productCategoryController);

export default router