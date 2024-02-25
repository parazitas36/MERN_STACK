import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { UsersController } from './controllers/UsersController';
import { EntitiesEndpoints } from './controllers/routeEnums/EntitiesEndpoints';
import { ItemsController } from './controllers/ItemsController';
import { CartsController } from './controllers/CartsController';
import { OAuthController } from './controllers/OAuthController';
import { StatusCodes } from './enums/StatusCodes';
import passport from 'passport';
import session from 'express-session';
import { IUserGetDto } from './DTOs/user/IUserGetDto';
require('./utils/passport');
const MongoDBStore = require('connect-mongodb-session')(session);

dotenv.config();

declare global {
  namespace Express {
    interface User extends IUserGetDto {}
  }
}

const app: Express = express();

const sessionsStore = new MongoDBStore({
  uri: process.env.MONGO_CONNECTION_STRING as string,
  collection: 'sessions',
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => {
    console.log('Connected to the database...');
    startServer();
  })
  .catch((err) => console.log(err));

const whiteList = [
  'https://parazitas36.github.io',
  'https://parazitas36.github.io/',
  'https://parazitas36.github.io/MERN_STACK',
  'https://parazitas36.github.io/MERN_STACK/',
]

const options: cors.CorsOptions = {
  origin: whiteList,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
  credentials: true,
};

app.set('trust proxy', process.env.PROXY as string === 'true' ? 1 : 0);

app.use(passport.initialize());

app.use(
 session({
  proxy: process.env.PROXY as string === 'true',
  secret: process.env.SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.SECURE_COOKIE as string === 'true',
    httpOnly: process.env.HTTP_ONLY as string === 'true',
    sameSite: process.env.SAME_SITE as boolean | "lax" | "strict" | "none" | undefined,
  },
  store: sessionsStore,
 })
)

app.use(passport.session());

app.use(cors(options));
app.use(express.json());

app.use(EntitiesEndpoints.Users, UsersController);
app.use(EntitiesEndpoints.Items, ItemsController);
app.use(EntitiesEndpoints.Carts, CartsController);
app.use(EntitiesEndpoints.Auth, OAuthController);

app.use('/*', (req: Request, res: Response) => res.status(StatusCodes.NOT_FOUND).send());

const startServer = () => app.listen(process.env.PORT, () => 
    console.log(`Server is started on port: ${process.env.PORT}`));