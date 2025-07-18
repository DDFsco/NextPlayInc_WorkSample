// Define Route Handler functions here
import { Request, Response } from "express"
import { pool } from "../../db";
import { createTrendingNotif, ResponseModel, UserModel } from "../models/user"
import bcrypt from "bcryptjs";
import { createUser as createUserService, editUser as editUserService, deleteUser as deleteUserService, sendEmail as sendEmailService, resetPassword as resetPasswordService, verifyRecaptcha } from "../middlewares/userService";
import { generateToken } from "../middlewares/auth";
import crypto from "crypto";
const nodemailer = require("nodemailer");
 

export async function listUsers(req: Request, res: Response) {
    try {
        // const client = await pool.connect()
        // const totalConnections = pool.totalCount; // Total number of clients in the pool
        // const idleConnections = pool.idleCount;   // Number of clients currently idle
        // const waitingConnections = pool.waitingCount; // Number of queued requests waiting for a client
      
        // console.log(`Total connections: ${totalConnections}`);
        // console.log(`Idle connections: ${idleConnections}`);
        // console.log(`Waiting connections: ${waitingConnections}`);

        // client.query("BEGIN")

        // client.release()

        const result = await pool.query("SELECT * FROM user_");
        const response: ResponseModel = { data: result.rows };
        res.json(response);

    } catch {
        const err: ResponseModel = { error: "Error fetching user data" };
        res.status(500).json(err);
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        // TODO!: Remove this state hard coded value before deployment
        const state = req.headers['x-location-state'] || "CA";
        if (!state) {
            return res.status(400).json({ errors: 'State should be set' });
        }
        
        // identify the query field
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const queryValue = req.body.name;
        const isEmail = emailRegex.test(queryValue as string);
        const queryField = isEmail ? "email" : "name";
        const usr_data = await pool.query(`SELECT * FROM user_ WHERE ${queryField} = $1`, [queryValue]);
        if (usr_data.rowCount === 0) {
            const err: ResponseModel = { error: "User not found" };
            res.status(404).json(err);
            return;
        }
        const user: UserModel = { [queryField]: queryValue, password: req.body.password };
        
        const correct_pwrd = usr_data.rows[0].password_hash;
        const result = await bcrypt.compare(user.password as string, correct_pwrd);
        if (!result) {
            const err: ResponseModel = { error: "Incorrect password" };
            res.status(404).json(err);
            return;
        }

        const staySignedIn = req.body.staySignedIn;
        // login with jwt
        const userToken = generateToken(usr_data.rows[0].id, staySignedIn);
        
        // combine with data in user_info table
        const user_info = await pool.query("SELECT * FROM user_info WHERE id = $1", [usr_data.rows[0].id]);
        const user_data = { ...usr_data.rows[0], ...user_info.rows[0] };

        const response: ResponseModel = { data: user_data, token: userToken };
        await pool.query(`UPDATE user_ SET last_login = CURRENT_TIMESTAMP WHERE name = $1`, [user.name]);
        res.json(response);
    } catch {
        const err: ResponseModel = { error: "Error fetching user data for testing!!!" };
        res.status(500).json(err);
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const recaptchaToken = req.body.recaptcha;
        if (!recaptchaToken) {
            return res.status(400).json({ errors: 'Recaptcha token is missing' });
        }
        const recaptchaResult = await verifyRecaptcha(recaptchaToken);
        if (!recaptchaResult) {
            return res.status(400).json({ errors: 'Recaptcha verification failed' });
        }

        // TODO!: Remove this state hard coded value before deployment
        const state = req.headers['x-location-state'] || "CA";
        if (!state) {
            return res.status(400).json({ errors: 'State should be set' });
        }
        if (req.body.dob) {
            const dateString = `${req.body.dob.year}-${req.body.dob.month}-${req.body.dob.day}`
            req.body.dob = new Date(dateString);
        }
        const userData = { ...req.body, state };

        const user = await createUserService(userData);

        // add new user to pending referral table
        if (req.query.referral_code) {
            try {
                await pool.query('UPDATE pending_referral_codes SET receiver_id = $1 WHERE referral_code = $2', [user.id, req.query.referral_code]);
                console.log('Added referral code to pending referral table:', req.query.referral_code);
            } catch (error) {
                return res.status(400).json({ error: 'Invalid referral code or referral handling failed' });
            }
        }

        // Generate token
        const staySignedIn = false;
        const token = generateToken(user.id, staySignedIn);
        const response: ResponseModel = { data: user, token: token };
        
        
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            const err: ResponseModel = { error: error.message };
            res.status(400).json(err);
            return;
        }
        const err: ResponseModel = { error: "Fail to create the user" };
        res.status(500).json(err);
    }
}


export async function editUser(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const userData = req.body;
        const user = await editUserService(parseInt(id), userData);
        const response: ResponseModel = { data: user };
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof Error) {
            const err: ResponseModel = { error: error.message };
            res.status(400).json(err);
            return;
        }
        const err: ResponseModel = { error: "Fail to edit the user information" };
        res.status(500).json(err);
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (id != (req as any).user.id) {
            throw new Error("authenticated user and user to modify do not match")
        }

        await deleteUserService(parseInt(id));
        const response: ResponseModel = { message: `Delete the user with id: ${id} successfully` };
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            const err: ResponseModel = { error: error.message };
            res.status(400).json(err);
            return;
        }
        const err: ResponseModel = { error: "Fail to delete the user" };
        res.status(500).json(err);
    }
};


export const resetPassword = async (req: Request, res: Response) => {
    try {
        const email = req.body.email as string;
        const password = req.body.password as string;
        await resetPasswordService(email, password);
        const response: ResponseModel = { message: 'Password reset successfully' };
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            const err: ResponseModel = { error: error.message };
            res.status(400).json(err);
            return;
        }
        const err: ResponseModel = { error: "Fail to reset password" };
        res.status(500).json(err);
    }
};

export const verifyEmailWithToken= async (req: Request, res: Response) => {
    try{
        let used=true;
        let token:string = req.body.token;
        const time = await pool.query("SELECT * FROM email_connect WHERE token=$1", [token]);
        if (time && time.rowCount==1)
        {
            const verifyBy = new Date(time.rows[0].verify_by).getTime();
            const currentTime = Date.now();
            console.log("verifyBy: ", verifyBy);
            console.log("currentTime: ", currentTime);
            if (currentTime <= verifyBy) {
                await pool.query("UPDATE email_connect SET verified = $1 WHERE token = $2", [used, token]);
                return res.status(200).json({ message: 'Email sent verified: '});
            } else {
                // TODO: handle expired link
                return res.status(400).json({ message: 'Email verification link has expired.' });
            }
        }
        else
            return res.status(400).json({ message: 'Invalid token.'});
    }
    catch(error){
        return res.status(500).json({ errors:'Fail to verify code:'});
    }
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.AUTO_EMAIL_USER as string,
      pass:process.env.AUTO_EMAIL_APP_PASS as string
    },
  });


export const confirmEmail = async (req: Request, res: Response) => {
    const email : string = req.body.email as string;
    if (!email) {
        return res.status(400).json({ errors: 'Email is required' });
    }
    // get the first name
    const user = await pool.query("SELECT ui.first_name FROM user_ u JOIN user_info ui ON u.id = ui.id WHERE u.email=$1", [email]);
    if (user.rowCount === 0) {
        return res.status(404).json({ errors: 'First name not found' });
    }
    const companyLink = "http://nextplayfantasy.com/";

    const token : string = crypto.randomBytes(8).toString('hex');
    let testing="";
    let emailVerificationLink="";
    try{
        const result = await pool.query("SELECT * FROM email_connect WHERE email=$1", [email]);
        if(result.rowCount==0)
            await pool.query("INSERT INTO email_connect (email) VALUES ('"+email+"')");
        var time=new Date();
        time.setDate(time.getDate()+1);
        await pool.query("UPDATE email_connect SET token = $1 WHERE email = $2", [token, email]);
        await pool.query("UPDATE email_connect SET verify_by = $1 WHERE email = $2", [time, email]);
        
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
        emailVerificationLink = `${frontendUrl}/verify-email?token=${token}`;
    }
    catch(error)
    {
        return res.status(500).json({ errors:'Fail to send verification code:'});
    }
    try {
        const termsAndConditionsLink = "http://nextplayfantasy.com/terms-and-conditions";
        const privacyPolicyLink = "http://nextplayfantasy.com/privacy-policy";
        const emailBody = `
        <!DOCTYPE html>
        <html>
        <body>
            <p>Dear ${user.rows[0].first_name},</p>
        
            <p>Please confirm your email address by clicking the link below or copying & pasting it into your browser. This link will expire in 30 days.</p>
            <p><a href="${emailVerificationLink}">${emailVerificationLink}</a></p>
            <p>If you did not request this verification, you can ignore this email. No action will be taken.</p>
        
            <p>Thanks,<br>
            Next Play Team</p>
        
            <p>Learn More About Next Play:<br>
            <a href="${companyLink}">nextplayfantasy.com</a></p>
        
            <p>&copy; 2024 Next Play Games. All Rights Reserved. <a href="${privacyPolicyLink}">Privacy Policy</a> | <a href="${termsAndConditionsLink}">Terms of Use</a></p>
        </body>
        </html>
        `;
        
        // let body = `Go to this link: "+emailVerificationLink+" to confirm your account. Only works within 24 hours of receiveing this email.`;
        const mailOptions = {
            from: "Next Play Games",
            to: email,
            subject: "Confirm Your Email Message",
            html: emailBody
            };

            transporter.sendMail(mailOptions, (error:string, info:string)=>{
            if (error) {
                //console.log('Error:', error);
            } else {
                //console.log('Email sent: ', info);
            }
            });

        return res.status(200).json({ message: 'Email sent successfully: ' });
    } catch (error) {
        return res.status(500).json({ errors: 'Fail to send verification code: '+error });
    }
};


export const sendEmail = async (req: Request, res: Response) => {
    const email = req.body.email as string;
    if (!email) {
        return res.status(400).json({ errors: 'Email is required' });
    }
    // generate 6 digits code
    const code = Math.floor(100000 + Math.random() * 900000);

    try {
        const query = `INSERT INTO email_verification (email, code) VALUES ($1, $2) 
                       ON CONFLICT (email) 
                       DO UPDATE SET code = EXCLUDED.code 
                       RETURNING *`;
        const values = [email, code];
        await pool.query(query, values);

        // send email
        await sendEmailService(email, code);

        return res.status(200).json({ message: 'Email sent successfully', code });
    } catch (error) {
        console.error(error);
        const query = 'UPDATE email_verification SET is_used = ($1) WHERE email = $2 RETURNING *';
        const values = [true, email];
        await pool.query(query, values);

        return res.status(500).json({ errors: 'Fail to send verification code' });
    }
};


export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const email = req.body.email as string;
        const code = req.body.code as number;
        const result = await pool.query('SELECT code FROM email_verification WHERE email = $1', [email]);
        if (result.rows[0].code === code) {
            // mark is_used to true
            await pool.query('UPDATE email_verification SET is_used = ($1) WHERE email = $2 RETURNING *', [true, email]);
            const response: ResponseModel = { message: 'Email verified successfully'};
            res.status(200).json(response);
        }
        else {
            const err: ResponseModel = { error: 'Incorrect verification code' };
            res.status(400).json(err);
        }
    } catch {
        const err: ResponseModel = { error: 'Fail to verify email' };
        res.status(500).json(err);
    }
};


export const verifyPersona = async (req: Request, res: Response) => {
    const { id, verification_status_id } = req.params;
    if (isNaN(parseInt(id)) || isNaN(parseInt(verification_status_id))) {
        return res.status(400).json({ errors: 'Invalid id or verification_status_id' });
    }
    try {
        const query = `UPDATE user_ SET verification_status_id = $1 WHERE id = $2 RETURNING *`;
        const values = [parseInt(verification_status_id), parseInt(id)];
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ errors: 'User not found' });
        }
        return res.status(200).json({ message: 'User verification status updated successfully' });
    } catch {
        const err: ResponseModel = { error: 'Fail to update user verification status' };
        res.status(500).json(err);
    }
};


export const getVerificationStatus = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM verification_status');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Fail to get verification status' });
    }
};

export async function getUserDetail(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);

    try {
        const result = await pool.query("SELECT * FROM user_ WHERE id = $1", [userId]);
        
        if (result.rows.length === 0) {
            const err: ResponseModel = { error: "User not found" };
            return res.status(404).json(err);
        }

        const response: ResponseModel = { data: result.rows[0] };
        res.json(response);
    } catch (error) {
        console.error('Error fetching user details111:', error);
        const err: ResponseModel = { error: "Error fetching user details for this particular testing!!!" };
        res.status(500).json(err);
    }
};

// notifications - send a notification to user
//   **used only for testing purposes
export const sendNotification = async (req: Request, res: Response) => {
    let { receiver_id, title, content, contest_id } = req.body;

    if (!receiver_id || !title || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!contest_id) {
        contest_id = -1
    }

    try {
        const query = `INSERT INTO notifications (receiver_id, title, content, contest_id) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [parseInt(receiver_id), title, content, parseInt(contest_id)];
        const result = await pool.query(query, values);
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error)
        const err: ResponseModel = { error: 'Failed to send notification' };
        res.status(500).json(err);
    }
};

// notifications - get all notifications for a user (receiver_id)
export const getNotifications = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const parsedReceiverId = parseInt(user_id as string);
    
    try {
        const query = `SELECT * FROM notifications WHERE receiver_id = $1 ORDER BY created_at DESC`;
        const values = [parsedReceiverId];
        const result = await pool.query(query, values);
        return res.status(200).json(result.rows);
    } catch (error) {
        const err: ResponseModel = { error: 'Failed to retrieve notifications' };
        res.status(500).json(err);
    }
};

// notifications - delete all notifications for a user
export const deleteAllNotifs = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const parsedUserId = parseInt(user_id as string);

    try {
        const deleteQuery = `DELETE FROM notifications WHERE receiver_id = $1`;
        const deleteValues = [parsedUserId];
        const result = await pool.query(deleteQuery, deleteValues);
        return res.status(200).json({ message: 'All notifications deleted successfully for the user.' });
    } catch (error) {
        console.error('Error deleting notifications:', error);
        const err: ResponseModel = { error: 'Failed to delete notifications' };
        res.status(500).json(err);
    }
};

// notifications - delete one notification for a user
export const deleteNotif = async (req: Request, res: Response) => {
    const { user_id, notif_id } = req.params;
    const parsedUserId = parseInt(user_id as string);

    try {
        const deleteQuery = `DELETE FROM notifications WHERE receiver_id = $1 AND id = $2`;
        const deleteValues = [parsedUserId, notif_id];
        const result = await pool.query(deleteQuery, deleteValues);

        if (result.rowCount === 1) {
            return res.status(200).json({ message: 'Notification deleted successfully.' });
        } else {
            return res.status(400).json({ error: 'Notification not found.' });
        }
    } catch (error) {
        console.error('Error deleting notification:', error);
        return res.status(500).json({ error: 'Failed to delete notification.' });
    }
};


export const checkUsernameAvailability = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM user_ WHERE name = $1', [req.query.name]);
        res.status(200).json({ available: result.rows.length === 0 });
    } catch (error) {
        res.status(500).json({ error: "Error checking username availability: " + error });
    }
};


export const checkEmailAvailability = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM user_ WHERE email = $1', [req.query.email]);
        res.status(200).json({ available: result.rows.length === 0 });
    } catch (error) {
        res.status(500).json({ error: "Error checking email availability: " + error });
    }
}

// export async function createUser_backup(req: Request, res: Response) {
//     try {
//         // TODO!: Remove this state hard coded value before deployment
//         const state = req.headers['x-location-state'] || "CA";
//         if (!state) {
//             return res.status(400).json({ errors: 'State should be set' });
//         }
//         const userData = { ...req.body, state };
//         // Check if email is verified
//         const verificationResult = await pool.query('SELECT is_used FROM email_verification WHERE email = $1', [userData.email]);
//         if (verificationResult.rows.length === 0 || !verificationResult.rows[0].is_used) {
//             return res.status(400).json({ error: 'Email not verified' });
//         }

//         const user = await createUserService(userData);

//         // add new user to pending referral table
//         if (req.query.referral_code) {
//             try {
//                 await pool.query('UPDATE pending_referral_codes SET receiver_id = $1 WHERE referral_code = $2', [user.id, req.query.referral_code]);
//                 console.log('Added referral code to pending referral table:', req.query.referral_code);
//             } catch (error) {
//                 return res.status(400).json({ error: 'Invalid referral code or referral handling failed' });
//             }
//         }

//         // Generate token
//         const token = generateToken(user.id);
//         const response: ResponseModel = { data: user, token: token };
        
        
//         res.status(200).json(response);
//     } catch (error) {
//         if (error instanceof Error) {
//             const err: ResponseModel = { error: error.message };
//             res.status(400).json(err);
//             return;
//         }
//         const err: ResponseModel = { error: "Fail to create the user" };
//         res.status(500).json(err);
//     }
// }

export const getLastPasswordUpdate = async (req: Request, res: Response) => {
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json({ error: 'User ID is missing' });
    }
    try {
        const result = await pool.query('SELECT last_password_update FROM user_ WHERE id = $1', [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ lastPasswordUpdate: result.rows[0].last_password_update });
    } catch (error) {
        console.error('Error fetching last password update:', error);
        return res.status(500).json({ error: 'Failed to fetch last password update date' });
    }
};


export const setLastPasswordUpdate = async (req: Request, res: Response) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ error: 'User ID is missing' });
    }
    try {
        await pool.query('UPDATE user_ SET last_password_update = CURRENT_TIMESTAMP WHERE id = $1', [user_id]);
        return res.json({ message: 'Last password update date set successfully' });
    } catch (error) {
        console.error('Error updating last password update:', error);
        return res.status(500).json({ error: 'Failed to update last password date' });
    }
};

export const sendTrendingNotif = async (req: Request, res: Response) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ error: 'User ID is missing' });
    }
    try {
        createTrendingNotif(user_id);
        return res.json({ message: 'Successfully sent trending notification.' });
    } catch (error) {
        console.error('Error sending trending notification:', error);
        return res.status(500).json({ error: 'Failed to send trending notification' });
    }
};
