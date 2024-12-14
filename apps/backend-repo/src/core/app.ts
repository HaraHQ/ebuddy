import express from 'express';

import UserRouter from "../routes/userRoutes";

import { PORT } from '../config/env';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.use("/users", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});