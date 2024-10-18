
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import Contact from './models/contacts.js';
import contactController from './controllers/contactController.js';


const PORT = 8080;

const setupServer = () => {

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(pino());

  app.get('/contacts', contactController.getContacts);
  
  // app.get('/contacts', async (req, res) => {
  //   res.send ('Hello World!');
//     try {
//       const contacts = await Contact
//         .find()
//       res.json(contacts);
//     } catch (error) {
// console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
  // });
    
    

  
  app.use('*', (req, res) => {
      res.status(404).json({ message: 'Not found' });
      
  });

  
  app.use((error, req, res) => {
      res.status(500).json({
          message: 'Something went wrong',
          error: error.message,
      });
      
  });
  

  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


export default setupServer;
