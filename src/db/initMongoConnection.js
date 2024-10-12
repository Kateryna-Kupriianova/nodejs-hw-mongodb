import mongoose from 'mongoose';

const MONGODB_URL = `mongodb+srv://kupriyanovforever:kk2712@cluster1.b1onp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
async function initMongoConnection() { 
    try {
        await mongoose.connect(MONGODB_URL); 
        console.log('Mongo connection successfully established!');
    }catch(error) {
        console.log(error);
        throw error;
    }
}

export default initMongoConnection ;
    