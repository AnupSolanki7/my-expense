import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const  {connection} = await mongoose.connect(process.env.MONGODB_URI as string)
        if(connection.readyState == 1){
            console.log("Database Connected");
        }
        
    }catch(err:any){
        return Promise.reject(err)
    }
}

export default connectDb