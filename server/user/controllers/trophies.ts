import { NextFunction, Request, Response } from "express"
import { pool } from "../../db";
import { ResponseModel } from "../models/user";

export async function getTotalTrophies(req: Request, res: Response) {
    try {
        const id = Number(req.headers.id);
        if (typeof id == "string") {
            return res.status(401).json({ message: 'Access denied. No ID provided.' });
        }

        if (!id) {
            return res.status(401).json({ message: 'Access denied. ID not provided.' });
        }
        const result = await pool.query("SELECT * FROM trophies WHERE user_id = $1", [id]);
        const response: ResponseModel = { data: new Number(result.rowCount) };
        res.json(response);

    } catch {
        const err: ResponseModel = { error: "Error fetching referral data" };
        res.status(500).json(err);
    }
}

export async function getFirstTrophies(req: Request, res: Response) {
    try {
        const id = Number(req.headers.id);
        if (typeof id == "string") {
            return res.status(401).json({ message: 'Access denied. No ID provided.' });
        }

        if (!id) {
            return res.status(401).json({ message: 'Access denied. ID not provided.' });
        }
        const result = await pool.query("SELECT * FROM trophies WHERE user_id = $1 AND trophy_type LIKE 'gold'", [id]);
        const response: ResponseModel = {  data: new Number(result.rowCount) };
        res.json(response);

    } catch {
        const err: ResponseModel = { error: "Error fetching referral data" };
        res.status(500).json(err);
    }
}
