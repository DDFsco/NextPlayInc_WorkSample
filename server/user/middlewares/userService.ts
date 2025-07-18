import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { checkEmail, hashPassword, comparePassword, createUser as createUserModel, editUser as editUserModel, deleteUser as deleteUserModel, resetPassword as resetPasswordModel, userExists, UserModel, User } from '../models/user';
import axios from "axios";
const nodemailer = require("nodemailer");


export const validateUser = [
    body('name', 'username should be between 3 and 32 characters').optional().isLength({ min: 3, max: 32 }),
    body('email', 'email should be valid').optional().isEmail(),
    body('date_of_birth').optional().isDate().withMessage('Invalid date of birth.'),
    body('verification_status_id', 'Verification status should be pending.').optional().custom((value) => { return value == 1 || value == null; }),
    (req: Request, res: Response, next: NextFunction) => {
        // check from request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }

        next();
    }
];

export async function createUser(userData: UserModel): Promise<User> {
    try {
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error("Name, email, and password are required");
        }
        
        const emailExists = await checkEmail(userData.email as string);
        if (emailExists) {
            throw new Error("Email is already in use");
        }
        userData.password = await hashPassword(userData.password as string);
        return await createUserModel(userData);
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function editUser(id: number, userData: UserModel): Promise<User> {
    try {
        const exists = await userExists(id);
        if (!exists) {
            throw new Error("User not found");
        }
        if (userData.email) {
            const emailExists = await checkEmail(userData.email as string);
            if (emailExists) {
                throw new Error("Email is already in use");
            }
        }
        if (userData.password) {
            userData.password = await hashPassword(userData.password as string);
        }
        return await editUserModel(id, userData);
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function deleteUser(id: number): Promise<void> {
    try {
        const exists = await userExists(id);
        if (!exists) {
            throw new Error("User not found");
        }
        await deleteUserModel(id);
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function resetPassword(email: string, password: string) {
    try {
        const emailExists = await checkEmail(email);
        if (!emailExists) {
            throw new Error("Email not found");
        }
        // check if new password is different from old password
        const samePassword = await comparePassword(email, password as string);
        if (samePassword) {
            throw new Error("New password is the same as the old password");
        }
        const hashedPassword = await hashPassword(password);
        await resetPasswordModel(email, hashedPassword);
    } catch (error) {
        throw new Error(error as string);
    }
}



const createSendEmailCommand = (toAddress: string, fromAddress: string, code: number) => {
    const companyLink = "http://nextplayfantasy.com/";
    const termsAndConditionsLink = "http://nextplayfantasy.com/terms-and-conditions";
    const privacyPolicyLink = "http://nextplayfantasy.com/privacy-policy";
    const emailBody = `
    <!DOCTYPE html>
    <html>
    <body>
        <p>Dear,</p>
    
        <p>Please confirm your email address by entering the verification code in Next Play website.
        <p>Verification Code: ${code}</p>

        <p>If you did not request this verification, you can ignore this email. No action will be taken.</p>
        
        <p>Thanks,<br>
        Next Play Team</p>
    
        <p>Learn More About Next Play:<br>
        <a href="${companyLink}">nextplayfantasy.com</a></p>
    
        <p>&copy; 2024 Next Play Games. All Rights Reserved. <a href="${privacyPolicyLink}">Privacy Policy</a> | <a href="${termsAndConditionsLink}">Terms of Use</a></p>
   </body>
    </html>
    `;
    // return new SendEmailCommand({
    //     Destination: {
    //         ToAddresses: [toAddress]
    //     },
    //     Message: {
    //         Body: {
    //             Text: {
    //                 Data: `Your verification code is ${code}`
    //             }
    //         },
    //         Subject: {
    //             Data: "Verification Code"
    //         }
    //     },
    //     Source: fromAddress
    // });
    return {
        from: fromAddress,
        to: [toAddress],
        subject: "Verification Code",
        html: emailBody
    }
}

export async function sendEmail(email: string, code: number) {
    // const ses = new SESClient({
    //     region: process.env.AWS_REGION as string,
    //     credentials: {
    //         accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    //     }
    // });
    // const SendEmailCommand = createSendEmailCommand(email, process.env.EMAIL as string, code);
    // try {
    //     return await ses.send(SendEmailCommand);
    // } catch (error) {
    //     throw new Error(error as string);
    // }
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: process.env.AUTO_EMAIL_USER as string,
          pass:process.env.AUTO_EMAIL_APP_PASS as string
        },
      });
    const emailOptions = createSendEmailCommand(email, "Next Play Games", code);
    try {
        return await transporter.sendMail(emailOptions);
    } catch (error) {
        throw new Error(error as string);
    }
}


export const verifyRecaptcha = async (recaptchaToken: string) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: secretKey,
                response: recaptchaToken
            }
        });
        /*
        response sample:
        Recaptcha response: {
            success: true,
            challenge_ts: '2024-07-18T22:24:34Z',
            hostname: 'localhost'
        }
        */
        if (response.data.success) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error verifying recaptcha:', error);
        return false;
    }
}
