import express from 'express';
import cors from 'cors';
import * as path from 'path';
import usersRouter from './routes/users.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (_req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.get('/health', (_req, res) => {
  res.status(200).send({ status: 'OK' });
});

// Routes
app.use('/api/users', usersRouter);

export default app;
