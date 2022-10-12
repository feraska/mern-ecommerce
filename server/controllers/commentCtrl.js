const Comments = require('../models/commentModel')
const jwt = require('jsonwebtoken')
// const User = require('../models/userModlel')

const commnetCtrl = {
    getCommentv2:async(msg)=>{
        try { 
           
        const data = await Comments.aggregate([
               
                {
                    $match:
                        {
                            product_id : msg.product_id
                        }
                   },
                   {
                   $sort:{createdAt:-1}
                   },
                   {$limit:3},
                  
                   {
                $lookup:
                {
                    
                    from:"users",
                    localField:"writer",
                    
                    
                    foreignField:"_id",
                    as:"user",
                    pipeline:[
                       
                        {
                            $project:
                                { password : 0,role:0  }
                         }
                    ]
                    

                }
            },
            
                   
                 
            
           ]).exec()
            return data
    
        } catch (err) {
           // console.log(err)
            return ""
           //return res.status(500).json({msg:err.message})
        }
    },
    getComments:async(req,res)=>{
        try { 
        //const page =1
        //   const {limit} = req.query
        //  console.log("limit",limit)

        //   const skip = (page-1) *limit
         
            
          const data = await  Comments.aggregate([
               
                {
                    $match:
                        {
                            product_id : req.params.id
                        }
                   },
                   {
                    $sort:{createdAt:-1}
                   },
                //    {$skip:`${skip}`},
                   {$limit:parseInt(req.query.limit)},
                   
                  
                   {
                $lookup:
                {
                    
                    from:"users",
                    localField:"writer",
                    
                    
                    foreignField:"_id",
                    as:"user",
                    pipeline:[
                       
                        {
                            $project:
                                { password : 0,role:0  }
                         },
                         
                    ]
                    

                }
                   
                 },
                 
            
           ]).exec()
              // console.log(data)
                return res.json(data)
           
    
         
           
         
        } catch (err) {
    
           return res.status(500).json({msg:err.message})
        }
    },
    
    addComment:async (msg)=>{
       try{
         const{writer,content,product_id,createAt,rating} = msg
        
        let id
        jwt.verify(writer,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err){
            //    console.log(err)
                return 
            }
            id=user.id
            // console.log(user)

        }
        )
         const  newComment =  new Comments({
            writer:id,content,product_id,createAt,rating
        })
      
       
        await newComment.save()
  //  console.log(newComment)
    }
       
    catch (err){

       }
    }
}
module.exports = commnetCtrl