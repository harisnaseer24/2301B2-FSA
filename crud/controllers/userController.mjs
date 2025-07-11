
import User from "../models/userModel.mjs"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// import dotenv from "dotenv"

// Signup 
 let registerUser=async(req,res)=>{
try {  
let user = await User.find({email: req.body.email});
if (user.length == 1) {
       res.status(404).json({message:"User already exists"});
} else {

bcrypt.hash(req.body.password, 15).then(async function(hash) {
    // Store hash in your password DB.
    let newUser= new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    profilePicture: req.body.profilePicture,
  
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
});
} 
} catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}
// login 
 let loginUser=async(req,res)=>{
try {  
    let checkUser = await User.findOne({email:req.body.email});

    if(!checkUser){
          res.status(404).json({message:"User not found. Please register first."});
    }else {

        const match =bcrypt.compareSync(req.body.password, checkUser.password);

    if(match) {
      const token = await jwt.sign({email: checkUser.email, _id: checkUser._id,role:checkUser.role},process.env.JWT_SECRET,{ expiresIn: '12h'} )


      
  res.cookie("token",token, { maxAge: 43200, httpOnly: true})
        res.status(200).json({
            message:"User Logged in successfully",
            user :checkUser,
            token:token,
        })
    }else{
       res.status(404).json({
            message:"Invalid Credentials",
           
        })
    }
       
    }
} 
 catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}
//Auth Middleware
    // const auth=async (req, res, next)=>{
      
    // try {  
    //   const token = await req.cookies.token;
    //   const decode = await jwt.verify(token, process.env.JWT_SECRET);
    //   if (decode) {
    //     next();
        
    //   } else {
    //     res.status(400).json({msg:"Invalid token"})
        
    //   }
    
    // } 
    // catch (error) {
    //   console.log(error) ;
    //   res.status(500).json({message:"Internal server errror"});
    // }


    // }

    //through Authorization headers bearer
    const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally attach decoded data to request for downstream use
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};





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

//OTP Generation 
// SendOTP
// VerifyOTP
// Expiry should be one minute

const userController = { registerUser,loginUser,changeActivationStatus,sendEmail,auth};
   
    
export default userController;