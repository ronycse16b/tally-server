import fs from "fs";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import { response } from "express";


// create category controller
export const categoryController = async (req, res) => {
  try {
    const { name} = req.body;
    const image = req.file.path;
   
    
    const slug = slugify(name);
    

    const Category = new categoryModel({photo:image,slug,...req.body });

    await Category.save();
    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      Category,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearting Category",
    });
  }
};


export const uploadController = async (req, res) => {

  try {
    res.status(200).send(req.file)

  } catch (error) {

  }
}

// update category controller

export const updateCategoryController = async (req, res) => {

  try {

    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(id,
      { name, slug: slugify(name) },
      { new: true, }

    );
    res.status(200).send({
      success:true,
      message:"Category updated successfully",
      category
    })




  } catch (error) {

    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro update in Category",
    });


  }



}

export const getCategoryController = async(req, res) => {

try {

  const category = await categoryModel.find({})
  res.status(200).send({
    success: true,

    message: "successfully found category",
    category,
  });

  
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    error,
    message: "Error get Category",
  });
  
}


}


//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};