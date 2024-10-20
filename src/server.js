import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactRouter from './routers/contacts.js';
import {notFoundHandler} from './middlewares/notFoundHandler.js';
import {errorHandler} from './middlewares/errorHandler.js';


const PORT = process.env.PORT || 8080;

const setupServer = () => {

  const app = express();
 
  app.use(contactRouter);
  
  app.use(cors());
  app.use(pino());
   
  app.use(notFoundHandler);
  app.use(errorHandler);
    
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


export default setupServer;
