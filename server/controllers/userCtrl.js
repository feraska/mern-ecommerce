const Users = require('../models/userModlel')
const Payments = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userCtrl = {
    register:async(req,res)=>{
        try{
            const {name,email,password} = req.body
            const user = await Users.findOne({email})
            if(user){
                return res.status(400).json({msg:"The email already exists."})
            }
            if(password.length<6){
                return res.status(400).json({msg:"Password is at least 6 characters logn."})
            }
            //password Encryption
            const passwordHash = await bcrypt.hash(password,10)
           // res.json({password,passwordHash})
           const newUser = new Users({
            name,email,password:passwordHash
           })
           // res.json(newUser)
           //Save mongodb
           await newUser.save()
           //Then Create jsonwebtoken authentication
        //    const accesstoken = createAccessToken({id:newUser._id})
        //    const refreshtoken = createRefreshToken({id:newUser._id})
        //    res.cookie('refreshtoken',refreshtoken,{
        //     httpOnly:true,
        //     path:'/user/refresh_token'
        //    })
           res.json({msg:"Register Success!"})
           //res.json({accesstoken})

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
        },
    login:async(req,res)=>{
        try{
            const {email,password} = req.body
           // console.log(email)
            const user = await Users.findOne({email})
            if(!user){
                return res.status(400).json({msg:"User does not exist"})
            }
            const isMatch = await bcrypt.compare(password,user.password)
          //  console.log(user.password)
            if(!isMatch){
                return res.status(400).json({msg:"Incorrect password"})
            }
            //if log scuccess create access token and refresh token 
           // res.json({msg:"Login Success!"})
           const accesstoken = createAccessToken({id:user._id})
           const refreshtoken = createRefreshToken({id:user._id})
           res.cookie('refreshtoken',refreshtoken,{
            httpOnly:true,
            path:'/user/refresh_token'
           })
           //res.json({msg:"Register Success!"})
           res.json({accesstoken})
        }
        catch(err){
            //console.log(err.message)
            return res.status(500).json({msg:err.message})
        }
    },
    logout:async(req,res)=>{
        try {
            res.clearCookie('refreshtoken',{path:'/user/refresh_token'})
            return res.json({msg:"Logged out"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },  

    refreshToken:(req,res)=>{
        try{
            const rf_token = req.cookies.refreshtoken
            if(!rf_token){
                return res.status(400).json({msg:"please Login or Register"})
            }
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err){
                    return res.status(400).json({msg:"please Login or Register"})
                }
                const accesstoken = createAccessToken({id:user.id})
                res.json({accesstoken})
            })
          //  res.json({rf_token})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    getUser:async(req,res)=>{
        try {
            const user = await Users.findById(req.user.id).select("-password")
            if(!user){
                return res.status(400).json({msg:"User does not exist."})
            }
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    addCart:async(req,res)=>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user){
                return res.status(400).json({msg:"User does not exist."})
            }
            await Users.findOneAndUpdate({_id:req.user.id},{
                cart:req.body.cart
            })
            return res.json({msg:"Added to cart"})
        } catch (err) {
            res.status(500).json({msg:err.message})
            
        }
    },
    history:async(req,res)=>{
        try {
            const history = await Payments.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            res.status(500).json({msg:err.message}) 
        }
    },
    updateName:async(req,res)=>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user){
                return res.status(400).json({msg:"User does not exist."})
            }
            await Users.findOneAndUpdate({_id:req.user.id},{
                name:req.body.name
            })
            return res.json({msg:"updated "})
        } catch (err) {
            res.status(500).json({msg:err.message})
            
        }
    },
    updateEmail:async(req,res)=>{
        try {
            
            const user = await Users.findById(req.user.id)
            
            const email = await Users.findOne({email:req.body.email})
            if(email){
                return res.status(400).json({msg:"User exist."})
            }
           
            if(!user){
                return res.status(400).json({msg:"User does not exist."})
            }
            // if(email){
            //     return res.status(400).json({msg:"Email exist."})
            // }
            
            await Users.findOneAndUpdate({_id:req.user.id},{
                email:req.body.email
            })
           
            return res.json({msg:"updated "})
        } catch (err) {
            res.status(500).json({msg:err.message})
            
        }
    }
        
}
const createAccessToken = (user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}
const createRefreshToken = (user)=>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
}
module.exports = userCtrl