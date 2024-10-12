
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import Contact from './models/contacts.js';



const PORT = 8080;

const setupServer = () => {

  const app = express();
  
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact
        .find()
      res.json(contacts);
    } catch (error) {
console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
    
    app.use(express.json());


  app.use(cors());

  
  app.use(pino());

  
  app.use('*', (req, res, next) => {
      res.status(404).json({ message: 'Not found' });
      next();
  });

  
  app.use((error, req, res, next) => {
      res.status(500).json({
          message: 'Something went wrong',
          error: error.message,
      });
      next();
  });
  

  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


export default setupServer;
