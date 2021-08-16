import { AppError } from '../models/AppError';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config'

interface Token {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const { token } = request.headers;

    if (!token) {
        return response.status(401).json(new AppError('Token não encontrado', 401))
    }

    try {
        const data = jwt.verify(String(token), config.secretKey);

        const { id } = data as Token;

        request.userId = id;

        return next();
    } catch {
        return response.status(401).json(new AppError('Sem autorização', 401))
    }
}
