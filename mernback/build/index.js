"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const UsersRouter_1 = require("./routes/UsersRouter");
const EntitiesEndpoints_1 = require("./routes/routeEnums/EntitiesEndpoints");
const ItemsRouter_1 = require("./routes/ItemsRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const startServer = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is started on port: ${process.env.PORT}`);
    });
};
mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING)
    .then((x) => {
    console.log('Connected to the database...');
    startServer();
})
    .catch((err) => console.log(err));
app.use(express_1.default.json());
app.use(EntitiesEndpoints_1.EntitiesEndpoints.Users, UsersRouter_1.UsersRouter);
app.use(EntitiesEndpoints_1.EntitiesEndpoints.Items, ItemsRouter_1.ItemsRouter);
app.use('/*', (req, res) => {
    res.status(404).send();
});
