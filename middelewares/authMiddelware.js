import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access 
export const isAdmin = async ( req,res,next) =>{
try {

  const user = await userModel.findById(req.user._id)
  if(user.role!==1)
  {
    return res.status(401).send({
      success:false,
      message:"UnAthorized Access"

    })
    
  }
  else{
    next()
  }

  
} catch (error) {
  console.log(error);
  res.send({
    message:"something is wrong admin middelware "
  })
  
}
}

