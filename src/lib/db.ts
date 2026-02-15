import { connect } from "mongoose";

const mongo_Url = process.env.MONGODB_URI

if(!mongo_Url){
    console.log("url not found");
}

// mongoose ke through connection ko cache me rkhna padega jisse
// .......bar bar server run hone pe db se connect na krna pade 

let cache = global.mongoose
if(!cache){
    cache = global.mongoose={conn:null, promise:null}
}


const connectDB = async ()=>{
    if(cache.conn){
        return cache.conn
    }

    if(!cache.promise){
        cache.promise = connect(mongo_Url!).then((c) => c.connection)
    }

    try {
        cache.conn = await cache.promise
    } catch (error) {
        console.log(error)
        
    }

    return cache.conn
}



export default connectDB
