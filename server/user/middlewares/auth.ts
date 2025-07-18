// Define All auth middleware functions here
// No Public API should be defined here
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseModel } from '../models/user';
import { pool } from "../../db"

const secret  : string = process.env.SECRET_KEY || 'my-secret-key';
const TOKEN_EXPIRATION = '24h';
const EXTENDED_TOKEN_EXPIRATION = '48h';

export interface IDecode {
    id: number
 };
 
export interface RequestWithUserID extends Request {
     user?: IDecode,
 }

export const generateToken = (user_id: number, staySignedIn: boolean): string => { 
    return jwt.sign({id : user_id}, secret, { 
        algorithm: 'HS256',
        expiresIn: staySignedIn ? EXTENDED_TOKEN_EXPIRATION : TOKEN_EXPIRATION});
}

export async function testToken (req : Request, res : Response) { 
    return res.json(generateToken(1, false)); 
} 

export async function testAuth (req: RequestWithUserID, res: Response) { 
    res.json({message: req.user})
}

export async function isAuthenticated(req: RequestWithUserID, res: Response, next: NextFunction) { 
    const authorizationHeader = req.headers.authorization;

    /**
     * Use this to print messages about connections
     */
    const totalConnections = pool.totalCount; // Total number of clients in the pool
    const idleConnections = pool.idleCount;   // Number of clients currently idle
    const waitingConnections = pool.waitingCount; // Number of queued requests waiting for a client
  
    console.log(`Total connections: ${totalConnections}`);
    console.log(`Idle connections: ${idleConnections}`);
    console.log(`Waiting connections: ${waitingConnections}`);
    
    
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }

    try { 
        const decoded = <IDecode> jwt.verify(token, secret);

        req.user = decoded;
        next();
    }
    catch(error) { 
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Invalid token.' });
        } else {
            return res.status(500).json({ message: 'An error occurred while processing the token.' });
        }
    }
}
