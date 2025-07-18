import { NextFunction, Request, Response } from "express"
import { pool } from "../../db";
import { ResponseModel } from "../models/user";

export async function getSuccessfulReferrals(req: Request, res: Response) {
    try {
        const id = Number(req.headers.id);
        if (typeof id == "string") {
            return res.status(401).json({ message: 'Access denied. No ID provided.'});
        }

        if (!id) {
            return res.status(401).json({ message: 'Access denied. ID not provided.'});
        }
        const result = await pool.query("SELECT * FROM successful_referral_codes WHERE sender_id = $1", [id]);
        const response: ResponseModel = { data: result.rows };
        res.json(response);

    } catch {
        const err: ResponseModel = { error: "Error fetching referral data" };
        res.status(500).json(err);
    }
}

export async function addReferralCode(req: Request, res: Response) {
    try {
        
        const id = Number(req.headers.id);
        const code = req.headers.code;
        if (typeof id == "string") {
            return res.status(401).json({ message: 'Access denied. No ID provided.'});
        }

        if (!id) {
            return res.status(401).json({ message: 'Access denied. ID not provided.'});
        }

        if (!(typeof code == "string")) {
            return res.status(401).json({ message: 'Access denied. No code provided.'});
        }

        if (!code) {
            return res.status(401).json({ message: 'Access denied. Code not provided.'});
        }

        // monthly referral limit check
        const currentMonth = new Date().getMonth() + 1;
        const referralCountResult = await pool.query(
            'SELECT COUNT(*) FROM successful_referral_codes WHERE sender_id = $1 AND EXTRACT(MONTH FROM date_used) = $2',
            [id, currentMonth]
        );
        if (parseInt(referralCountResult.rows[0].count) >= 5) {
            return res.status(401).json({ message: 'Monthly referral limit exceeded.'});
        }
        
        await pool.query("INSERT INTO pending_referral_codes (sender_id, referral_code) VALUES ('"+id+"', '"+code+"')");
        //const response: ResponseModel = { data: result.rows };
        res.json({});

    } catch {
        const err: ResponseModel = { error: "Error fetching referral data" };
        res.status(500).json(err);
    }
}
