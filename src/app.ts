import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;

// 先加载通用配置
dotenv.config();

// 再加载环境特定配置（覆盖通用）
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}

import * as middlewares from './middlewares';
import api from './api';
import parse from './parse';
import MessageResponse from './interfaces/MessageResponse';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);
app.use('/parse', parse);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
