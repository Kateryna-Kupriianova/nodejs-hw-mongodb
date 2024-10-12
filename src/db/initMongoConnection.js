import mongoose from 'mongoose';
import Contact from '../models/contacts.js';
const dbName = "phonebook";
const MONGODB_URL = `mongodb+srv://kupriyanovforever:kk2712@cluster1.b1onp.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster1`;
async function initMongoConnection() { 
    try {
        
        await mongoose.connect(MONGODB_URL); 
        console.log('Mongo connection successfully established!');
    }catch(error) {
        console.log(error);
        throw error;
    }
}

async function createDatabaseAndCollection() {
    await initMongoConnection();

    // Додаємо перший документ для ініціалізації колекції
    const sampleContact = new Contact({
        name: "John Doe",
        phoneNumber: "1234567890",
        email: "johndoe@example.com",
        contactType: "personal",
    });

    await sampleContact.save();
    console.log("Sample contact added to the database.");
    
    // Закриваємо з'єднання
    mongoose.connection.close();
}

createDatabaseAndCollection().catch(error => {
    console.error('Error during database setup:', error);
});

export default initMongoConnection ;
    