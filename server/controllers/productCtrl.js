const Products = require('../models/productModel')
//Filter, Sorting and paginating
class APIfeatures{
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString
    }
    filtering(){
        const queryObj = {...this.queryString}
      //  console.log({before:queryObj})
        const excludedFields = ['page','sort','limit']
        excludedFields.forEach(e1=>delete(queryObj[e1]))
      //  console.log({after:queryObj})
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)
      //  console.log({queryObj,queryStr})
        this.query.find(JSON.parse(queryStr))
        return this
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query.sort(sortBy)
        }
        else{
            this.query = this.query.sort('-createdAt')
        }
        return this
    }
    paginating(){
        const page = this.queryString.page *1 || 1
       // console.log("page",page)
        const limit = this.queryString.limit *1 || 9
      //  console.log("limit",limit)
        const skip = (page - 1) * limit
      //  console.log("skip",skip)
        this.query = this.query.skip(skip).limit(limit)
        //console.log("query",this.query)
        return this
    }
}
const productsCtrl = {
    getProducts:async(req,res)=>{
        try {
            const features = new APIfeatures(Products.find(),req.query)
            .filtering()
            .sorting()
           // console.log("data",Products.find())
            const products = await features.query
           // console.log("product",products)
            const copy = new APIfeatures(Products.find(),req.query)
            .filtering()
            .sorting()
            .paginating()
            const copyProducts = await copy.query
            if(copyProducts.length===0||products.length===0){
               return res.json({msg:"empty data"})
            }
         //   const copy2 = await copy.query
          //  console.log("copy",copy)
          //  console.log("copy",copy)
            //const copyData =await copyProducts.query
            //console.log(copyProducts)
            res.json({
                status:'success',
                result:products.length,
                products:copyProducts,
                allProducts:products
            })
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    createProducts:async(req,res)=>{
        try {
            const {product_id,title,price,description,content,images,category} = req.body
            if(!images){
                res.status(400).json({msg:"No image upload"})
            }
            const product = await Products.findOne({product_id})
            if(product){
                res.status(400).json({msg:"This product already exist."})

            }
            const newProduct = new Products({
                product_id,title:title.toLowerCase(),price,description,content,images,category
            })
            await newProduct.save()
            res.json({msg:"Created a product"})

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    deleteProducts:async(req,res)=>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted a product"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    updateProducts:async(req,res)=>{
        try {
            const {title,price,description,content,images,category} = req.body
            if(!images){
                res.status(400).json({msg:"No image upload"})
            }
            await Products.findOneAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),price,description,content,images,category
            })
            res.json({msg:"Updated a product"})

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}
module.exports = productsCtrl