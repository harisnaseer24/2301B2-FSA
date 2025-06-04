
import User from "../models/userModel.mjs"
import nodemailer from "nodemailer"
// import dotenv from "dotenv"

// Signup 
 let registerUser=async(req,res)=>{
try {  
let user = await User.find({email: req.body.email});
if (user.length == 1) {
       res.status(404).json({message:"User already exists"});
} else {
let newUser= new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.body.profilePicture,
    token: "98347293hhf43@*htwey834"
})
let addUser = await User.insertOne(newUser);
if(!addUser){
  res.status(404).json({message:"User registeration failed"});
}else{
  res.status(200).json({
    message:"User registered successfully",
    newUser:addUser,
})
}
} 
} catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}
// login 
 let loginUser=async(req,res)=>{
try {  
    let checkUser = await User.find({email:req.body.email, password:req.body.password});
    if(checkUser.length == 0){
          res.status(404).json({message:"User not found. Please register first."});
    }else {
        res.status(200).json({
            message:"User Logged in successfully",
            user :checkUser,
        })
    }
} 
 catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}
// deactivate/activate account
 let changeActivationStatus=async(req,res)=>{
try {  
    const userId= req.params.userId;
    const currentStatus= req.params.status;
    const newStatus = currentStatus == "true"? false :true; 
    const toggleStatus= await User.updateOne({_id:userId},{$set:{isActive: newStatus}});
    if (toggleStatus) {
    
        res.status(200).json({message:"user status update successfully"})
    }else{
        res.status(404).json({message:"Failed to update user status"})
    }

} 
 catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}

//edit profile
// change password
// forgot password & reset
//email verification
const sendEmail = async (req,res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let sendMailStatus= await transporter.sendMail({
    from: `"Verify Email" <${process.env.EMAIL_USER}>`,
  to:req.body.email,
 subject: req.body.subject,
    html:req.body.html,
  });
  if(sendMailStatus){
    res.status(200).json({message:"Email sent successfully"})
}else{
      res.status(400).json({message:"Email sending failed"})

  }
};

const userController = { registerUser,loginUser,changeActivationStatus,sendEmail};
    // getProduct,addProduct,deleteProduct ,editProduct
    
export default userController;