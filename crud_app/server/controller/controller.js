var Userdb  = require('../model/model');

//create and save new user
exports.create =(req,res)=>{
   //validate request
   if(!req.body){
    res.status(400).send({message:"Content cannot be empty!"});
    return;
   }


//new user
const user=new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
}) //every request must have a response pair.(req,res) is a pair and doesnt work individually//

//save user in the database
user
.save(user)
.then(data=>{
    //res.send(data)
    res.redirect('/add-user')
})
.catch(err=>{
    res.status(500).send({
        message:err.message||"some error occured while creating a create operation"
    });
});
} //ensure proper open and close brackets for correct implementation of code//

//retrive and return all users/retrive and return a single user

exports.find=(req,res)=>{

  if(req.query.id){
   const id=req.query.id;

   Userdb.findById(id)
    .then(data=>{
       if(!data){
        res.status(404).send({message:"not found user with id"+id})
       }else{
        res.send(data)
       }
    })
    .catch(err=>{
      res.status(500).send({message:"Error retriving user with Id"+id})
    })
  }else{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Error Occured while retriving user information"})
    })
    }
  }


//update a new identified user by user id
exports.update=(req,res)=>{
  if(!req.body){
    return res
    .status(400)
    .send({message:"data to update cannot be empty"})
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
   .then(data=>{
    if(!data){
    res.status(404).send({message:`Cannot update user with ${id}.Maybe user not found!`})
   }else{
    res.send(data)
   }
   })
   .catch(err=>{
    res.status(500).send({message:"Error Update user information"})
   })
}

//delete a user with specified user id in the request
exports.delete=(req,res)=>{
  const id=req.params.id;

  Userdb.findByIdAndDelete(id)
  .then(data=>{
    if(!data){
    res.status(404).send({message:`cannot delete with id ${id}.Maybe id is wrong!`})
  }else{
    res.send({
        message:"User was deleted successfully!"
    })
}
  })
  .catch(err=>{
    res.status(500).send({
        message:"Could not delete User with id="+id
    });
  });
}