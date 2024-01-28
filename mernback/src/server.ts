import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { UsersController } from './controllers/UsersController';
import { EntitiesEndpoints } from './controllers/routeEnums/EntitiesEndpoints';
import { ItemsController } from './controllers/ItemsController';
import { CartsController } from './controllers/CartsController';
import { StatusCodes } from './enums/StatusCodes';

dotenv.config();

const app: Express = express();

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => {
    console.log('Connected to the database...');
    startServer();
  })
  .catch((err) => console.log(err));

const options: cors.CorsOptions = {
  origin: '*',
  methods: ['GET']
};

app.use(cors(options));
app.use(express.json());

app.use(EntitiesEndpoints.Users, UsersController);
app.use(EntitiesEndpoints.Items, ItemsController);
app.use(EntitiesEndpoints.Carts, CartsController);

app.use('/*', (req: Request, res: Response) => res.status(StatusCodes.NOT_FOUND).send());

const startServer = () => app.listen(process.env.PORT, () => 
    console.log(`Server is started on port: ${process.env.PORT}`));