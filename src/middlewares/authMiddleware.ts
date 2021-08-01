import { AppError } from './../errors/AppError';
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
        return response.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, config.secretKey);

        const { id } = data as Token;

        request.userId = id;

        return next();
    } catch {
        return response.sendStatus(401);
    }
}
