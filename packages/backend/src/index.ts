import express, { Request, Response, NextFunction } from 'express';
import routes from './api';
import { errors } from 'celebrate';

import { APP_PORT } from './common/constants/app';

const app = express();

app.use(express.json());
app.use('/api', routes);


app.post('/api/farmers/signup', (req: Request, res: Response) =>
  res.json({
    status: 200,
    message: 'Welcome to Farmers App API',
  }),
);

app.use('*', (req: Request, res: Response) => {
  const status = 404;
  const message = `Route ${req.method} ${req.originalUrl} Not found.`;
  return res.status(status).json({
    status,
    message,
  });
});

app.use(errors());

// General error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ status: 'error', message: err.message });
});


// Start the server
async function startServer() {
  try {
    app.listen(APP_PORT, () => console.log(`Server listening on port ${APP_PORT}`));
  } catch (error) {
    console.error(error);
    // process.exit(1);
  }
}

startServer();
