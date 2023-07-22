import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UsersRouter } from './routes/UsersRouter';
import { EntitiesEndpoints } from './routes/routeEnums/EntitiesEndpoints';
import { ItemsRouter } from './routes/ItemsRouter';

dotenv.config();

const app: Express = express();

const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is started on port: ${process.env.PORT}`);
  });
};

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
  .then((x) => {
    console.log('Connected to the database...');
    startServer();
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.use(EntitiesEndpoints.Users, UsersRouter);
app.use(EntitiesEndpoints.Items, ItemsRouter);

app.use('/*', (req: Request, res: Response) => {
    res.status(404).send();
});