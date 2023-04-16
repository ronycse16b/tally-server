import { camparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";





export const registerController = async (req, res) => {

  try {

    const { name, email, password, answer } = req.body;
    // validation

    if (!name) {
      return res.send({ message: 'Name is Required' });
    }

    if (!email) {
      return res.send({ message: 'Email is Required' });
    }

    if (!password) {
      return res.send({ message: 'Password is not Empty' });
    }

    // if (!phone) {
    //   return res.send({ message: 'phone is Required' });
    // }
    // if (!address) {
    //   return res.send({ message: 'address is Required' });
    // }
    if (!answer) {
      return res.send({ message: 'answer is Required' });
    }


    // check user
    const exsitingUser = await userModel.findOne({ email })
    // existing user checking
    if (exsitingUser) {
      return res.status(200).send({
        success: false,
        message: 'Already Registered Please Login',
      })

    }
    // register user 
    const hashedPassword = await hashPassword(password);

    // save
    const user = await new userModel({ name, email, password: hashedPassword, answer }).save();

    res.status(201).send({
      success: true,
      message: 'Registration Successfully',
      user,
    })




  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in  Register Please try again",
      error
    })
  }
};



// login controller 

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }
    const match = await camparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Oh! Password Not Matched",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotController

export const forgotController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
// test controler
export const testController = (req, res) => {

  res.send({
    message: "protected Route"
  })

}