import mongoose from 'mongoose';
// import Contact from '../models/contacts.js';
import dotenv from 'dotenv';
dotenv.config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DB, MONGODB_URL } = process.env;
console.log('MongoDB User:', MONGODB_USER);
console.log('MongoDB Password:', MONGODB_PASSWORD);
console.log('MongoDB URL:', MONGODB_URL);
console.log('MongoDB DB:', MONGODB_DB);
const MONGODB_CONNECTION_STRING = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

async function initMongoConnection() { 
    try {
        console.log('Connecting to MongoDB with:', MONGODB_CONNECTION_STRING);
        await mongoose.connect(MONGODB_CONNECTION_STRING); 
        console.log('Mongo connection successfully established!');
    }catch(error) {
        console.log(error);
        throw error;
    }
}

// async function createDatabaseAndCollection() {
//     await initMongoConnection();

//     // Додаємо перший документ для ініціалізації колекції
//     const sampleContact = new Contact({
//         name: "John Doe",
//         phoneNumber: "1234567890",
//         email: "johndoe@example.com",
//         contactType: "personal",
//     });

//     await sampleContact.save();
//     console.log("Sample contact added to the database.");
    
   
//     // mongoose.connection.close();
// }

// createDatabaseAndCollection().catch(error => {
//     console.error('Error during database setup:', error);
// });

export default initMongoConnection ;
    