const express= require('express')
const router= express.Router()
const zod = require('zod')
const {authMiddleware}= require('../middleware')
const { userdata } = require('../db/db')
const {Account}= require('../db/db')
const {JWT_SECRET}= require('./config')
const jwt = require('jsonwebtoken')



const Schema_Signup= zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})
const Schema_SignIn = zod.object({
    username: zod.string().email(),
    password:zod.string()
})
const Schema_UpdatedBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})





router.post('/signup',async (req,res)=>{

const body = req.body
const {username}= req.body

const ParsedBody = Schema_Signup.safeParse(body)//parsedbody is an object and looks like {
                                            //     "success": true,
                                            //     "data": {...}  // The parsed and validated data
                                            //   }
 if(!ParsedBody.success){  
    return res.status(411).json({
        message: "Incorrect inputs"
    })
 }
  


  const ExistingUser = await userdata.findOne({username})

  if(ExistingUser) {
    return res.status(411).json({
        message: "Email Taken Exists"
    })
  }

const randBalance = Math.floor(Math.random()*(1000))+1

const NewUser = await userdata.create(body)
const userId = NewUser._id
const userAccount = await Account.create({
    userId,
    balance: randBalance 
})


jwtToken = jwt.sign({userId},JWT_SECRET)
if (NewUser&&userAccount){return res.json({
    message:"User Created Successfully",
    token :jwtToken
})
}

})






router.post('/signin',async (req,res,next)=>{
    const body = req.body
    const ParsedBody = Schema_SignIn.safeParse(body)

    if(!ParsedBody.success){  
        return res.status(411).json({
            message: "Incorrect inputs"
        })
     }

   const User  =  await userdata.findOne({username:body.username, password:body.password})
 


if(!User){    
    res.status(411).json({
        
    message: "Error while logging in"

})

}

const signInToken= jwt.sign ({userId:userdata._id},JWT_SECRET)
return res.json({
    token : signInToken,
    message: "Signed In Successfully"
})



})

router.put('/',authMiddleware, async (req,res)=>{
    const body = req.body 
const parsedUpdate = Schema_UpdatedBody.safeParse(body)

if(!parsedUpdate){  
    return res.status(411).json({
    message: "Incorrect inputs"
})}

const UpdatedUser  = await userdata.updateOne({userId:req.userId},)//from authmw

if(UpdatedUser){
    return res.json({
        message : "User Updated Successfully"
    })
}

})

router.get ('/bulk',async(req,res)=>{
    const filter = req.query.filter|| "";
   const users = await userdata.find({
    $or: [
        { firstName: { $regex: filter } }, 
        { lastName: { $regex: filter } }
      ]
    
      
    } )


    res.status(200).json({
         filteredUsers: users.map((user)=>{return {
            username:user.username,
            firstName:user.firstName,
            lastName: user.lastName,
            userId: user.userId}})
       
    })
   
})


module.exports= router

