import express = require('express');
import routes from "./routes";
import cors = require('cors');

const app = express();

app.use(
    cors({
      origin: process.env.FRONTEND_URL
    })
);

app.use(express.json());
app.use(routes);

export default app