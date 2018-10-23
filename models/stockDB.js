const mongoose=require('mongoose');
mongoose.Promise = global.Promise;

const ProjectSchema=new mongoose.Schema({
  stock: {type: String, required:true},
  price: String,
  likes: [String]
})
const Project=mongoose.model('stock', ProjectSchema)

exports.Project = Project;