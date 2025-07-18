import { pool } from '../../db';

async function handleReferrals() {
    try {
        // retrieve all pending referral codes where receiver id is not null and expiration date is in the future
        const pendingRefferals = await pool.query('SELECT * FROM pending_referral_codes WHERE receiver_id IS NOT NULL AND expiration_date > NOW()');
        // loop through each pending referral code
        for (const referral of pendingRefferals.rows) {
            const referrerId = referral.sender_id;
            const newUserId = referral.receiver_id;

            // check if the new user deposited at least $10
            // TODO: implement this

            // check if the new user played through at least $5
            // TODO: implement this

            // ensure both users are active
            const referrerResult = await pool.query('SELECT is_active FROM user_ WHERE id = $1', [referrerId]);
            const newUserResult = await pool.query('SELECT is_active FROM user_ WHERE id = $1', [newUserId]);
            if (!referrerResult.rows[0].is_active || !newUserResult.rows[0].is_active) {
                continue;
            }

            // ensure both users have verified their Persona account
            const referrerPersonaResult = await pool.query('SELECT verification_status_id FROM user_ WHERE id = $1', [referrerId]);
            const newUserPersonaResult = await pool.query('SELECT verification_status_id FROM user_ WHERE id = $1', [newUserId]);
            if (parseInt(referrerPersonaResult.rows[0].verification_status_id) !== 2 || parseInt(newUserPersonaResult.rows[0].verification_status_id) !== 2) {
                continue;
            }

            // retrieve receiver name from user_ table
            const receiverNameResult = await pool.query('SELECT name FROM user_ WHERE id = $1', [newUserId]);
            // add to successful referral table
            await pool.query(
                'INSERT INTO successful_referral_codes (sender_id, receiver_id, receiver_name) VALUES ($1, $2, $3)',
                [referrerId, newUserId, receiverNameResult.rows[0].name]
            );

            // award bonus to referrer and new user
            await pool.query('UPDATE user_ SET balance = balance + 10 WHERE id = $1', [referrerId]);
            await pool.query('UPDATE user_ SET balance = balance + 10 WHERE id = $1', [newUserId]);

            // remove from pending referral table
            await pool.query('DELETE FROM pending_referral_codes WHERE sender_id = $1 AND receiver_id = $2', [referrerId, newUserId]);

            console.log(`Referral from user ${referrerId} to user ${newUserId} was successful`);
        }
        
    } catch (error) {
        throw new Error("Error handling referral: " + error as string);
    }
}

export { handleReferrals };