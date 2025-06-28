import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import 'reflect-metadata';
import {
  useContainer as rcUseContainer,
  useExpressServer,
} from 'routing-controllers';
import { Container } from 'typedi';
import { ENV } from './config/env';
import { HttpErrorHandler } from './middlewares/httpError';
import { responseInterceptor } from './middlewares/responseInterceptor';

rcUseContainer(Container);

const app = express();
app.use(helmet());

/**
 * Setup cors
 */
const whitelist = [ENV.WEBAPP_DOMAIN];

const corsOptions: cors.CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

/**
 * Setup rate limit
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(responseInterceptor);

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [__dirname + '/api/v1/**/controllers/*.{js,ts}'],
  defaultErrorHandler: false,
  middlewares: [HttpErrorHandler],
});

export default app;
