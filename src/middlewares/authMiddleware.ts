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
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json(new AppError('Token não encontrado', 401))
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, config.secretKey);

        const { id } = data as Token;

        request.userId = id;

        return next();
    } catch {
        return response.status(401).json(new AppError('Sem autorização', 401))
    }
}
