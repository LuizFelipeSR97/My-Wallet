import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import authRouter from './routers/authRouter.js';
import transactionRouter from './routers/transactionRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(transactionRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`); // eslint-disable-line no-console
});
