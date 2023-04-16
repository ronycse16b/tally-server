import dataModal from "../models/dataModal.js";





// creade product  and imge upload help formidable() npm package
export const createDataController = async (req, res) => {

  try {
    const { name, gurdient, holding, male, female,house,houseLand,incomeSourse,mullaon,cor} =
      req.body;

      


    //alidation
    switch (true) {
     
      case !name:
        return res.status(500).send({ message: "Name is Required" });
      case !gurdient:
        return res.status(500).send({ message: "gurdient is Required" });
      case !holding:
        return res.status(500).send({ message: "Description is Required" });
      case !male:
        return res.status(500).send({ message: "Price is Required" });
      case !female:
        return res.status(500).send({ message: "Category is Required" });
      case !female:
        return res.status(500).send({ message: "Quantity is Required" });
      case !house:
        return res.status(500).send({ message: "Quantity is Required" });
    
      case !houseLand:
        return res.status(500).send({ message: "Quantity is Required" });
      case !incomeSourse:
        return res.status(500).send({ message: "Quantity is Required" });
      
      case !mullaon:
        return res.status(500).send({ message: "Quantity is Required" });
      
      case !cor:
        return res.status(500).send({ message: "Quantity is Required" });
      

    }

    const data = new dataModal({...req.body });

    await data.save();
    res.status(201).send({
      success: true,
      message: "Data Created Successfully",
      data,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

// get all products 
export const getProductsController = async (req, res) => {

  try {

    const query = {}

    const products = await dataModal.find(query)
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All products here are available",
      products,
    })



  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
    });
  }

}

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await dataModal
      .findOne({ slug: req.params.slug })
      
  
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};


// single category-ways-product
export const singleCategoryWaysProductController = async (req, res) => {
  try {
    const product = await dataModal.find({ category: req.params.id });
    res.status(200).send({
      success: true,
      message: "categoryWays product SUccessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "categoryWays product Single Category",
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await dataModal.findById(req.params.id).select("-photo");;
    console.log(product);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.send(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity,shipping } =
    req.body;

  
   
 const image = req.file.path;
 
  const slug = slugify(name);
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      
    }

    const products = await dataModal.findByIdAndUpdate(
      req.params.pid,
      {photo:image, ...req.body, slug,  },
      { new: true }
    );

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await dataModal.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await dataModal.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await dataModal
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await dataModal
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await dataModal
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await dataModal.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};