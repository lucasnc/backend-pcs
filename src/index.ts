import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';
import { AppError } from './models/AppError';
import config from './config';
import 'reflect-metadata';
import "express-async-errors";
import { createConnection } from 'typeorm';
import cors from 'cors';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.codigo).json(err)
    }

    return response.status(500).json(new AppError(`Erro interno do servidor - ${err.message}`, 500))
})

app.listen(config.port || 3000, () => console.log(`Servidor rodando na porta ${config.port || 3000}`));


export { app };
