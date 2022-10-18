import express from 'express';
import apiRouter from './routes/api.router';

const app = express();

app.use('/api', apiRouter);

export default app;





