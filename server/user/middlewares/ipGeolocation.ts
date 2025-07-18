import { NextFunction, Request, Response } from "express"
import { City, Country, WebServiceClient } from '@maxmind/geoip2-node';
import { ResponseModel } from "../models/user"
import dotenv from 'dotenv';

dotenv.config();


const GEOLOCATION_ID: string = process.env.GEOLOCATION_ID || "-1";
const GEOLOCATION_LICENCE: string = process.env.GEOLOCATION_LICENSE || "noLicense";

const client = new WebServiceClient(GEOLOCATION_ID, GEOLOCATION_LICENCE, { host: 'geolite.info' });

export async function testGetStateWithIP(req: Request, res: Response) {
    getStateWithIP(req, res, () => { });
}

export async function getStateWithIP(req: Request, res: Response, next: NextFunction) {
    try {
        let userIP = req.ip;
        if (!userIP) {
            const error: ResponseModel = { error: "IP not provided" };
            return res.status(400).json(error);

        }
        getStateWithIPv4(req, res, next, userIP);
    }
    catch {
        const error: ResponseModel = { error: "Something went wrong whilst trying to locate IP" };
        return res.status(500).json(error);
    }
}

async function getStateWithIPv4(req: Request, res: Response, next: NextFunction, ipAddress: string) {
    try {
        console.log(ipAddress)

        let country: Country = await client.country(ipAddress);
        if (!country.country) {
            const error: ResponseModel = { error: "IPs Country not found" };
            return res.status(409).json(error);
        }
        else if (country.country.isoCode != "US") {
            const error: ResponseModel = { error: "User not located in the United States of America" };
            return res.status(403).json(error);
        }
    }
    catch {
        const error: ResponseModel = { error: "Something went wrong whilst trying to locate Country"/*+": "+ipAddress*/ };
        return res.status(500).json(error);
    }

    try {
        let city: City = await client.city(ipAddress);
        if (city.subdivisions) {
            let state: string = city.subdivisions[0].isoCode; // UPDATE SUBDIVISION INDEX if it doesn't represent state
            req.headers["x-location-state"] = city.subdivisions[0].isoCode;
            return next();
        }
        else {
            const error: ResponseModel = { error: "City not currently in a state" };
            return res.status(409).json(error);
        }
    }
    catch {
        const error: ResponseModel = { error: "Something went wrong whilst trying to locate State" };
        return res.status(500).json(error);
    }

}

function IPv6toIPv4(userIP: string): string {
    try {
        if (userIP.substring(0, 7) === "::ffff:")
            return userIP.substring(7);
        else
            return userIP;
    }
    catch {
        return userIP;
    }
}
