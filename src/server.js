import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import authRoutes from './routers/auth.js';
import router from './routers/contacts.js';
import {notFoundHandler} from './middlewares/notFoundHandler.js';
import {errorHandler} from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import {authenticate} from './middlewares/authenticate.js';
import path from 'node:path';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
const PORT = process.env.PORT || 8080;

const setupServer = () => {

  const app = express();


  app.use("/avatars", express.static(path.resolve("src", "public", "avatars")));

  app.use(cookieParser());

  app.use(express.json());

  app.use('/auth', authRoutes);

  app.use('/', authenticate, router);

  app.use(cors());
  app.use(pino());

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.use ('/', express.static(path.resolve("src", "public")));
  app.use('/docs', swaggerDocs);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


export default setupServer;
