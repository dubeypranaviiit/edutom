import mongoose from "mongoose";
 const dbConnect =()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log(`Database connected successfully`);
    })
    .catch((error)=>{
        console.log(`Error while connecting db`);
        console.log(error);
        process.exit(1)
    })
 }

 export default dbConnect