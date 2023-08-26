import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { UsersRouter } from './routes/UsersRouter';
import { EntitiesEndpoints } from './routes/routeEnums/EntitiesEndpoints';
import { ItemsRouter } from './routes/ItemsRouter';
import { CartsRouter } from './routes/CartsRouter';
import { StatusCodes } from './enums/StatusCodes';

dotenv.config();

const app: Express = express();

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => {
    console.log('Connected to the database...');
    startServer();
  })
  .catch((err) => console.log(err));

const allowedOrigins = ['http://localhost:3000', 'localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());

app.use(EntitiesEndpoints.Users, UsersRouter);
app.use(EntitiesEndpoints.Items, ItemsRouter);
app.use(EntitiesEndpoints.Carts, CartsRouter);

app.use('/*', (req: Request, res: Response) => res.status(StatusCodes.NOT_FOUND).send());

const startServer = () => app.listen(process.env.PORT, () => 
    console.log(`Server is started on port: ${process.env.PORT}`));