const Users = require('../models/userModlel')
const Payments = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

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
    },
    getCode:async(req,res,next)=>{
        try{
          const random = Math.floor(100000 + Math.random() * 900000).toString()
          
          const code = createAccessToken({code:random})
          req.random = random
          req.code = code
          
         next()
        
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    validCode:async(req,res,next)=>{
        try{

            const {codeEnc,codeDec} = req.query

            let c 
            jwt.verify(codeEnc,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                if(err){
                    return res.status(400).json({msg:"invalid code"})
                }
                c = user.code
                // if(user.code!==codeEnc){
                //     return res.status(404).json({msg:"invalid code"})
                // }

            //     c = user.code
                
                
                
             })
            if(c!==codeDec){
                return res.status(400).json({msg:"invalid code"})
              }
         
         
          next()
        //  res.end()
          
          
        }
        
          catch(err){
           // console.log(err.message)
              return res.status(500).json({msg:err.message})
          }
        },
    getID:async(req,res,next)=>{
        try{
            const {email} = req.query
            
            const id =await Users.findOne({email:email}).select("_id")
            if(!id){
                return res.status(404).json({msg:"the user not found"})
            }
            req.id=id._id
            req.email
           next()

        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    sendEmail:async(req,res)=>{
        const {email} = req.query
        console.log(email)
        // let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            service:'gmail',
            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
              user: 'feras.94.kasabri@gmail.com', // generated ethereal user
              pass: process.env.PASSWORD, // generated ethereal password
            },
          });
       
        const random = req.random
        console.log(random)
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: "change password", // Subject line
            text:"code", // plain text body
            html: `<h1>${random}`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
           res.json({_id:req.id,code:req.code})
        },
    updatePassword:async(req,res)=>{
        try {
            const {_id,password} = req.body
            console.log(_id)
            const passwordHash = await bcrypt.hash(password,10)
            await Users.findOneAndUpdate({_id:_id},{
                password:passwordHash
            })
          
            return res.json({msg:" password updated "})
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