import User from "../model/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const signup = async(req,res) =>{
    try {
        const { name,  email, mobile, password } = req.body;
        
         const user = await User.findOne({email:email})
        if(user){
           res.send({error : "Email Already Exists"})
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user =  new User ({
                    name,email,mobile,password:hashedPassword
            })
            const newUser = await user.save()
            res.send({user:newUser})
        }
    } catch (error) {
            console.log("error",error);
            res.status(500).send({ message: 'Server Error' });
          }
}


export const login = async(req,res) =>{
    try {
        const {email , password} = req.body;
        const existingUser = await User.findOne({email:email})
        if(!existingUser){
            res.send({error : "Invalid Email"})
        }else{
            const passwordMatch = await bcrypt.compare( password, existingUser.password);
            if(!passwordMatch){
                res.send({error : "Invalid Password"})
            }else{
                const token = jwt.sign({ _id: existingUser._id  }, process.env.TOKEN_SECRET);
                res.send({user:existingUser,token:token})
            }
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: 'Server Error' });
    }
}