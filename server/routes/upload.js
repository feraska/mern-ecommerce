const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')
// we will upload image on cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

router.post('/uploadImg',auth,(req,res)=>{
    try {
        //console.log(req.files)
        if(!req.files||Object.keys(req.files).length==0){
            return res.status(400).json('no files were upload')
        }
        const file = req.files.file;
        //console.log(req.files.file)
        //console.log(file)
        if(file.size > 1024*1024){//1mb
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:"size too large"})
        }
       // console.log(file.mimetype)
        if(file.mimetype!=='image/jpeg'&&file.mimetype!=='image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:"File format is incorrect"})
        }
        cloudinary.v2.uploader.upload(file.tempFilePath,{folder:'test'},async(err,result)=>{
            if(err){
                throw err
            }
            removeTmp(file.tempFilePath)
            res.json({public_id:result.public_id,url:result.secure_url})
        })

      //  res.json('test upload')
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg:err.message})
        
    }
})

router.post('/destroyImg',auth,(req,res)=>{
    try {
        const {public_id} = req.body
        if(!public_id){
           return res.status(400).json({msg:"No images Selected"})
        }
        
        cloudinary.v2.uploader.destroy(public_id,async(err,result)=>{
            if(err){
                throw err
            }
            res.json({msg:"Deleted Image"})
        })
    } catch (err) {
       return res.status(500).json({msg:err.message})
    }
})


//upload file only admin can upload
router.post('/upload',auth,authAdmin,(req,res)=>{
    try {
        //console.log(req.files)
        if(!req.files||Object.keys(req.files).length==0){
            return res.status(400).json('no files were upload')
        }
        const file = req.files.file;
        //console.log(req.files.file)
        //console.log(file)
        if(file.size > 1024*1024){//1mb
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:"size too large"})
        }
       // console.log(file.mimetype)
        if(file.mimetype!=='image/jpeg'&&file.mimetype!=='image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:"File format is incorrect"})
        }
        cloudinary.v2.uploader.upload(file.tempFilePath,{folder:'test'},async(err,result)=>{
            if(err){
                throw err
            }
            removeTmp(file.tempFilePath)
            res.json({public_id:result.public_id,url:result.secure_url})
        })

      //  res.json('test upload')
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg:err.message})
        
    }
})
//delete file
router.post('/destroy',auth,authAdmin,(req,res)=>{
        try {
            const {public_id} = req.body
            if(!public_id){
               return res.status(400).json({msg:"No images Selected"})
            }
            cloudinary.v2.uploader.destroy(public_id,async(err,result)=>{
                if(err){
                    throw err
                }
                res.json({msg:"Deleted Image"})
            })
        } catch (err) {
           return res.status(500).json({msg:err.message})
        }
})
const removeTmp = (path)=>{
    fs.unlink(path,err=>{
        if(err){
            throw err
        }
    })
}
module.exports = router