const mongoose= require('mongoose');
const connectdb= async()=>{
    // mongoose.connect('mongodb://localhost:27017/gSignup',{
      mongoose.connect('mongodb+srv://vishalvarghesejans:Uh8QyTVOUyppJSSG@cluster0.au1ygre.mongodb.net/kurageTest?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        },(err,data)=>{    
         if(err){
           console.log("Db Error");
         }else{
           console.log('Db kurage Connected...');
         }
        });
}
    

module.exports ={connectdb}