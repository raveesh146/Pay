const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://raveeshGulati:A94LbyWTEzOyZHPy@cluster0.mhvurda.mongodb.net/Paytm')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



const UserDataSchema = new mongoose.Schema({
    username : {
        type: String,
        required:true,
        minLength:6,
        unique : true
   
    },
    password: {
        type: String,
        required:true,
        minLength:6
    },


    firstName:String,
    lastName :String
})

const accountSchema = new mongoose.Schema({
  userId :{
    type: mongoose.Schema.Types.ObjectId,//ObjectId  is a type just like string 
    ref: 'User'
  },
  balance:{
    type: Number,
    required:true
  }

})






const Account = mongoose.model('Account',accountSchema)
const userdata = mongoose.model('User',UserDataSchema)//name, schema 
 module.exports = {userdata,Account}
