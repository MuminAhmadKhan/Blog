const mongoose = require('mongoose')
userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    minlength:3,
unique:true},
  email: String,
  password:{ type:String,
    required:true},
blogs : [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
]

});

module.exports = mongoose.model('User',userSchema)