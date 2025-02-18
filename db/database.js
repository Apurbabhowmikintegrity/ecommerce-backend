const mongoose=require('mongoose');
const db=async()=>{
    try {
        const database=await mongoose.connect(process.env.MONGO_URI);
    if(database)
    {
        console.log("MongoDB Connected");
    }else{
        console.error('Error connecting to MongoDB:');
    }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
module.exports=db;