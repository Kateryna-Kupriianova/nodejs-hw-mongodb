import dotenv from 'dotenv';

dotenv.config();
import setupServer from "./server.js";
import initMongoConnection from "./db/initMongoConnection.js";




async function bootstrap() {
    await initMongoConnection();
    setupServer();
}

bootstrap();






