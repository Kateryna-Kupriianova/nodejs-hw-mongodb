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

  app.use('/', express.static(path.resolve("src", "public")));
  app.use("/photos", express.static(path.resolve("src", "public", "photos")));

  app.use('/api-docs', (swaggerDocs()));

  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());
  app.use(pino());

  app.use('/auth', authRoutes);

  app.use('/', authenticate, router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


export default setupServer;
