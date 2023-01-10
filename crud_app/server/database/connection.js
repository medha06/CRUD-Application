const mongoose= require('mongoose');
const connectDB= async()=>{
try{
//mongodb connection string
const con= await mongoose.connect(process.env.MONGO_URI,{
    //useNewUrlParser:true,
    //useUnifiedTopology:true,
   //useFindAndModify:false,
    //useCreateIndex:true
}) // some codes are unecessary sometimes try commenting it and using//

console.log(`MongoDB connected:${con.connection.host}`);
}catch(err){
console.log(err);
process.exit(1);
}
}

module.exports= connectDB