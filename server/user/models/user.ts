// Database and Req, Res models for routes 
import bcrypt from 'bcryptjs';
import { pool } from "../../db";
import e from 'express';

export interface ResponseModel {
    data?: object,
    error?: string,
    message?: string,
    token?: string
}

// export interface UserModel {
//     name?: string,
//     password?: string,
//     email?: string,
//     date_of_birth?: Date,
//     state?: string,
//     verification_status_id?: number
// }

// export interface User extends UserModel {
//     id: number
// }

export interface UserModel {
    name?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    date_of_birth?: Date,
    zip_code?: string,
    state?: string,
    verification_status_id?: number
}

export interface User extends UserModel {
    id: number
}

export async function createUser(userModel: UserModel): Promise<User> {
    const { name, password, first_name, last_name, email, date_of_birth, zip_code, state } = userModel;
    try {
        // Insert into user_ table
        const userQuery = `INSERT INTO user_ (name, password_hash, email, date_of_birth, state, is_active) 
                           VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const userValues = [name, password, email, date_of_birth, state, true];
        const { rows: userRows } = await pool.query(userQuery, userValues);
        const userId = userRows[0].id;
        // Insert into user_info table
        const userInfoQuery = `INSERT INTO user_info (id, first_name, last_name, zip_code) 
                               VALUES ($1, $2, $3, $4) RETURNING *`;
        const userInfoValues = [userId, first_name, last_name, zip_code];
        const { rows: userInfoRows } = await pool.query(userInfoQuery, userInfoValues);
        // Update last_password_updated
        const updateQuery = `UPDATE user_ SET last_password_update = CURRENT_TIMESTAMP WHERE id = $1`;
        await pool.query(updateQuery, [userId]);
        // Insert into user_profile table
        const userProfileQuery = `INSERT INTO user_profile (user_id, first_name, last_name, date_of_birth, state, postal_code)
                                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const userProfileValues = [userId, first_name, last_name, date_of_birth, state, zip_code];
        await pool.query(userProfileQuery, userProfileValues);

        await pool.query('COMMIT');

        // Merge the user and user_info data if needed, otherwise just return userRows[0]
        const user = {
            ...userRows[0],
            first_name: userInfoRows[0].first_name,
            last_name: userInfoRows[0].last_name,
            zip_code: userInfoRows[0].zip_code
        };
        return user;
    } catch(error) {
        throw new Error("Error creating user: " + error);
    }
}

// export async function createUser_backup(userModel: UserModel): Promise<User> {
//     const { name, password, email, date_of_birth, state } = userModel;
//     try {
//         const query = 'INSERT INTO user_ (name, password_hash, email, date_of_birth, state, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
//         const values = [name, password, email, date_of_birth, state, true];
//         const  { rows } = await pool.query(query, values);
//         return rows[0];
//     } catch(error) {
//         throw new Error("Error creating user: " + error);
//     }
// }

export async function editUser(id: number, userModel: UserModel): Promise<User> {
    const { name, password, email, date_of_birth, } = userModel;
    try {
        const updateFields: string[] = [];
        const values: any[] = [];
        if (name !== undefined) {
            updateFields.push(`name = $${values.length + 1}`);
            values.push(name);
        }
        if (password !== undefined) {
            updateFields.push(`password_hash = $${values.length + 1}`);
            values.push(password);
        }
        if (email !== undefined) {
            updateFields.push(`email = $${values.length + 1}`);
            values.push(email);
        }
        if (date_of_birth !== undefined) {
            updateFields.push(`date_of_birth = $${values.length + 1}`);
            values.push(date_of_birth);
        }
        if (updateFields.length === 0) {
            throw new Error("no fields to update");
        }
        const query = `UPDATE user_ SET ${updateFields.join(', ')} WHERE id = ${id} RETURNING *`;
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function deleteUser(id: number): Promise<void> {
    try {
        // delete from email_connect table
        const email = await pool.query('SELECT email FROM user_ WHERE id = $1', [id]);
        const query_email_connect = 'DELETE FROM email_connect WHERE email = $1';
        const values_email_connect = [email.rows[0].email];
        await pool.query(query_email_connect, values_email_connect);

        // Delete from user_info table
        const query_user_info = 'DELETE FROM user_info WHERE id = $1';
        const values_user_info = [id];
        await pool.query(query_user_info, values_user_info);

        // Delete from user_profile table
        const query_user_profile = 'DELETE FROM user_profile WHERE user_id = $1';
        const values_user_profile = [id]
        await pool.query(query_user_profile, values_user_profile)

        // Delete from user_ table
        const query_user = 'DELETE FROM user_ WHERE id = $1';
        const values_user = [id];
        await pool.query(query_user, values_user);
    } catch (error) {
        throw new Error("Error deleting user: " + error);
    }
}

export async function resetPassword(email: string, password: string): Promise<void> {
    try {
        const query = 'UPDATE user_ SET password_hash = $1, last_password_update = CURRENT_TIMESTAMP WHERE email = $2';
        const values = [password, email];
        await pool.query(query, values);
    } catch (error) {
        throw new Error("Error resetting password: " + error);
    }
}

export async function checkEmail(email: string): Promise<boolean> {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM user_ WHERE email = $1', [email]);
        return result.rows[0].count > 0;
    } catch (error) {
        console.error("Error checking email:", error);
        throw new Error("Error checking email");
    }
}

export async function userExists(id: number): Promise<boolean> {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM user_ WHERE id = $1', [id]);
        return result.rows[0].count > 0;
    } catch (error) {
        console.error("Error checking user:", error);
        throw new Error("Error checking user");
    }
}

export async function hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Error hashing password");
    }
}

// check if the new password is different from the old password in the database
export async function comparePassword(email: string, newPassword: string): Promise<boolean> {
    try {
        const data = await pool.query('SELECT password_hash FROM user_ WHERE email = $1', [email]);

        const result = await bcrypt.compare(newPassword, data.rows[0].password_hash);
        return result;
    } catch (error) {
        console.error("Error checking password:", error);
        throw new Error("Error checking password");
    }
}

// Notify user about top trending contest every hour from 8am-8pm
export async function createTrendingNotif(userId: string): Promise<void> {
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            throw Error("No valid connections")
        }
        // Retrieve #1 trending contest
        const topContestQuery = `
            SELECT id, name
            FROM contests 
            WHERE (start_date + start_time) > NOW()
                AND current_users < max_player
                AND id NOT IN (
                    SELECT contest_id
                    FROM notifications
                )
            ORDER BY current_users DESC, (start_date + start_time) ASC
            LIMIT 1;
        `; 

        const { rows: topContestRow } = await pool.query(topContestQuery);
        
        if (topContestRow.length === 0) {
            throw new Error('No trending contests found.');
        }

        const { id: contestID, name: contestTitle } = topContestRow[0];
        
        // Insert a notification for specified user
        const notifTitle = `"${contestTitle}" is trending, join now!`;
        const notifMessage = `"${contestTitle}" is trending, join now for a chance to win a trophy!`;
        const notifType = 'Trending';

        const insertNotifsQuery = `
            INSERT INTO notifications (receiver_id, title, content, contest_id, type)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [userId, notifTitle, notifMessage, contestID, notifType];

        await client.query(insertNotifsQuery, values);

        console.log('Trending notifications created successfully for user', userId);
    } catch (error) {
        if (client) {
            await client.query("ROLLBACK")
        }
        console.error('Error creating trending notification for user', userId, error);
    } finally {
        if (client) {
            client.release();
        }
    }
}

// Delete trending notifications whose contests can no longer be joined
export async function deleteTrendingNotifs(): Promise<void> {
    let client
    try {
        client = await pool.connect();
        if (!client) {
            throw Error("No valid client")
        }
        // Check contests for if the contest reaches the Max number of entries -or- if the contest has started
        const deleteNotifsQuery = `
            DELETE FROM notifications
            WHERE (notifications.type = 'Trending' OR notifications.type = 'Invite a Friend')
            AND notifications.contest_id IN (
                SELECT c.id
                FROM contests c
                WHERE (c.current_users >= c.max_player OR (c.start_date + c.start_time) <= NOW())
            )
        `;

        const result = await client.query(deleteNotifsQuery);

        // console.log('Deleted trending notifications deleted for contests that can no longer be joined, if any.');
    } catch (error) {
        if (client) {
            client.query("ROLLBACK")
        }
        console.error('Error deleting trending notifications:', error);
    } finally {
        if (client) {
            client.release();
        }
    }
}

// Notify each user who is part of a contest starting in 30 min who hasn't submitted their lineup yet
export async function createLineupNotifs(): Promise<void> {
    let client
    try {
        client = await pool.connect();
        if (!client) {
            throw Error("No valid connections")
        }
        // Format 30 minutes from now to milliseconds (ms)
        const thirtyMinMS = new Date(Date.now() + 30 * 60 * 1000);

        // Truncate milliseconds from thirty min from now
        const thirtyMinTruncated = new Date(thirtyMinMS);
        thirtyMinTruncated.setMilliseconds(0);

        const todayDateString = thirtyMinTruncated.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        const thirtyMinISOString = thirtyMinTruncated.getHours().toString().padStart(2, '0') + ':' 
                                    + thirtyMinTruncated.getMinutes().toString().padStart(2, '0')
                                    + ':00+00:00'; // 'HH:MM:00+00:00'

        // Retrieve all contests starting in 30 minutes
        const contestsQuery = `
            SELECT id, name
            FROM contests 
            WHERE start_date = $1::DATE AND start_time = $2::TIME WITH TIME ZONE 
        `;

        const { rows: contestsRows } = await client.query(contestsQuery, [todayDateString, thirtyMinISOString]);
        
        if (contestsRows.length === 0) {
            // console.log('No contests found starting in 30 minutes, which is at ', todayDateString, thirtyMinISOString);
            return;
        }

        // Iterate over each contest that starts in 30 min
        for (const contest of contestsRows) {
            const { id: contestId, name: contestTitle } = contest;

            // Retrieve users who have joined the contest but have an incomplete lineup 
            const incompleteLineupsQuery = `
                SELECT cu.user_id
                FROM contest_users cu
                INNER JOIN contests c ON cu.contest_id = c.id
                WHERE cu.contest_id = $1
                AND (
                    (c.type = 'MLB' AND 
                        ((c.sport_type = 'Classic No Cap' AND 
                        (array_length(cu.player_ids, 1) < 10 OR cu.player_ids IS NULL OR cu.player_ids = '{}')) OR
                        (c.sport_type = 'Single Game Showdown' AND 
                        (array_length(cu.player_ids, 1) < 6 OR cu.player_ids IS NULL OR cu.player_ids = '{}')))) OR
                    (c.type = 'NFL' AND 
                        ((c.sport_type = 'Classic No Cap' AND 
                        (array_length(cu.player_ids, 1) < 9 OR cu.player_ids IS NULL OR cu.player_ids = '{}')) OR
                        (c.sport_type = 'Single Game Showdown' AND 
                        (array_length(cu.player_ids, 1) < 6 OR cu.player_ids IS NULL OR cu.player_ids = '{}'))))
                );
            `;
            const { rows: incompleteLineupUsers } = await client.query(incompleteLineupsQuery, [contestId]);


            if (incompleteLineupUsers.length === 0) {
                console.log(`No users with incomplete lineups for contest ${contestId}.`);
                continue;
            }

            // Iterate over each user with an incomplete lineup and insert a notification
            for (const user of incompleteLineupUsers) {
                const userId = user.user_id;
                const notifTitle = `Submit your lineup for "${contestTitle}!"`;
                const notifMessage = `"${contestTitle}" starts in 30 minutes. Don't forget to submit your lineup!`;
                const notifType = 'Incomplete Lineup';

                const insertNotifQuery = `
                    INSERT INTO notifications (receiver_id, title, content, contest_id, type)
                    VALUES ($1, $2, $3, $4, $5)
                `;
                const values = [userId, notifTitle, notifMessage, contestId, notifType];

                await client.query(insertNotifQuery, values);
            }
        }

        console.log('Incomplete lineup notifications created successfully for users if needed.');
    } catch (error) {
        if (client) {
            client.query("ROLLBACK")
        }
        console.error('Error creating incomplete lineup notifications:', error);
    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function deleteLineupNotifs(): Promise<void> {
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            throw Error("No valid connections")
        }
        // Check contests for if the user submits their lineup (green check in screen 63) 
        //  -or- if the contest has started
        const deleteNotifsQuery = `
            DELETE FROM notifications
            WHERE notifications.type = 'Incomplete Lineup'
            AND notifications.contest_id IN (
                SELECT c.id
                FROM contests c
                JOIN contest_users cu ON c.id = cu.contest_id
                WHERE (
                    (c.type = 'MLB' AND 
                        ((c.sport_type = 'Classic No Cap' AND array_length(cu.player_ids, 1) = 10) OR
                        (c.sport_type = 'Single Game Showdown' AND array_length(cu.player_ids, 1) = 6)))
                    OR (c.type = 'NFL' AND 
                        ((c.sport_type = 'Classic No Cap' AND array_length(cu.player_ids, 1) = 9) OR
                        (c.sport_type = 'Single Game Showdown' AND array_length(cu.player_ids, 1) = 6)))
                    OR (c.start_date + c.start_time) <= NOW()
                )
            )
        `;

        const result = await client.query(deleteNotifsQuery);

        // console.log('Deleted incomplete lineup notifications if any need to be.');
    } catch (error) {
        if (client) {
            client.query("ROLLBACK")
        }
        console.error('Error deleting incomplete lineup notifications:', error);
    } finally {
        if (client) {
            client.release();
        }
    }
}


// Send this notification to each individual who is part of a contest:
// Only send if the contests have less than the max number of entrants (e.g., 8/10) 
// and the contest starts within the next 29 to 30 minutes
export async function createInviteFriendNotif(): Promise<void> {
    let client
    try {
        client = await pool.connect();
        if (!client) {
            throw Error("No valid connection")
        }
        // Retrieve contests that are starting within the next 29 to 30 minutes
        const thirtyMinutesFromNowQuery = `
        SELECT id, name, current_users, max_player
        FROM contests
        WHERE (start_date::timestamp + start_time::time) BETWEEN (NOW() + interval '29 minutes') AND (NOW() + interval '30 minutes')
          AND current_users < max_player;
        
        `;

        // Retrieve the contests starting within the next 29 to 30 minutes
        const { rows: thirtyMinutesFromNowRows } = await client.query(thirtyMinutesFromNowQuery);

        if (thirtyMinutesFromNowRows.length === 0) {
            // console.log('No contests starting within the next 29 to 30 minutes.');
            return;
        }

        // Create notifications for each user in the contests
        for (const contest of thirtyMinutesFromNowRows) {
            const contestId = contest.id;
            const contestTitle = contest.name;

            // Retrieve all users who are part of the contest
            const getUsersQuery = `
                SELECT user_id
                FROM contest_users
                WHERE contest_id = $1
            `;

            const { rows: contestUsers } = await client.query(getUsersQuery, [contestId]);

            // Iterate over each user and insert a notification
            for (const user of contestUsers) {
                const userId = user.user_id;
                const notifTitle = 'Invite your friends to join "' + contestTitle + '"';
                const notifMessage = '"' + contestTitle + '" starts soon. Invite your friends to join!';
                const notifType = 'Invite a Friend';

                const insertNotificationQuery = `
                    INSERT INTO notifications (receiver_id, title, content, contest_id, type)
                    VALUES ($1, $2, $3, $4, $5)
                `;
                const values = [userId, notifTitle, notifMessage, contestId, notifType];

                await client.query(insertNotificationQuery, values);
            }
        }

        console.log('Notifications created successfully for all contest users.');
    } catch (error) {
        if (client) {
            client.query("ROLLBACK")
        }
        console.error('Error creating notifications:', error);
    } finally {
        if (client) {
            client.release();
        }
    }
}