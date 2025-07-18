import { UserLogin, UserSignup, User, UserResponse, UserEdits, ErrorResponse, UserSignup_, User_, UserResponse_ } from "./types";
import axios from "axios";
import { PROTOCOL, SERVER_IP, SERVER_PORT } from "../global_var"

export async function getUserList(): Promise<User[] | ErrorResponse> {
    const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/list_users`);

    if (response.status === 200) {
        const users: User[] = response.data.data.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password_hash: user.password_hash,
            state: user.state,
            is_active: user.is_active,
            creation_date: new Date(user.creation_date),
            last_login: new Date(user.last_login),
            verification_status_id: user.verification_status_id
        }));

        return users;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
}

export async function getSuccessfulReferrals(id: number): Promise<string[][]> {
    const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/successful_referrals`, { headers: { id } });

    let data = response.data.data;
    let length = data.length;
    let referrals: string[][] = new Array<Array<string>>;
    for (let i = 0; i < length; i++) {
        referrals[i] = new Array<string>;
        referrals[i][0] = data[i].receiver_name;
        let date: string = data[i].date_used;
        let formattedDate = date.substring(5, 7) + "/" + date.substring(8, 10) + "/" + date.substring(0, 4);
        referrals[i][1] = formattedDate;
    }
    return referrals;
}

export async function addReferralCode(id: string, code: string): Promise<string> {
    await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/add_referral_code`, { headers: { id, code } });
    return "localhost:4200/signup";
}

export async function userLogin(loginInfo: UserLogin): Promise<UserResponse | ErrorResponse> {

    const response = await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/login`, loginInfo);

    if (response.status === 200) {
        const userData: User_ = response.data.data;
        const userToken: string = response.data.token;

        const loggedInUser: UserResponse_ = {
            data: userData,
            token: userToken
        }

        localStorage.setItem('id', response.data.data.id);
        localStorage.setItem('name', response.data.data.name);
        localStorage.setItem('email', response.data.data.email);
        localStorage.setItem('state', response.data.data.state);
        localStorage.setItem('is_active', response.data.data.is_active);
        localStorage.setItem('verification_status_id', response.data.data.verification_status_id);
        // localStorage.setItem('first_name', response.data.data.first_name);
        // localStorage.setItem('last_name', response.data.data.last_name);
        // localStorage.setItem('dob', response.data.data.date_of_birth);
        // localStorage.setItem('zip_code', response.data.data.zip_code);
        return loggedInUser;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
}

export async function userSignup(signupInfo: UserSignup_): Promise<UserResponse_ | ErrorResponse> {
    try {
        let url = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/signup_`;
        if (signupInfo.referralCode) {
            url += `?referral_code=${signupInfo.referralCode}`;
        }
        const response = await axios.post(url, signupInfo);

        if (response.status === 200) {
            const userData: User_ = response.data.data;
            const userToken: string = response.data.token;

            const signedUpUser: UserResponse_ = {
                data: userData,
                token: userToken
            }

            return signedUpUser;
        } else {
            console.log('error');
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Signup failed';
            throw new Error(errorMessage);
        } else {
            console.log('error', error);
            throw new Error('An unexpected error occurred');
        }
    }
}

export async function checkUserAuth(): Promise<any> {
    const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/check_auth`);

    if (response.status === 200) {
        return response;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
}

export async function editUser(newUserInfo: UserEdits): Promise<UserResponse | ErrorResponse> {
    const response = await axios.put(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/edit/:id`, newUserInfo);

    if (response.status === 200) {
        const userData: User = response.data.data;
        const userToken: string = response.data.token;

        const updatedUser: UserResponse = {
            data: userData,
            token: userToken
        }

        return updatedUser;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
}

export async function resetUserPassword(newUserInfo: UserEdits): Promise<any> {
    const response = await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/reset_password`, newUserInfo);

    if (response.status === 200) {
        return response;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
}

export async function deleteUser(): Promise<any> {
    const response = await axios.delete(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/delete/:id`);

    if (response.status === 200) {
        return response;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
}

export async function emailSend(email: string): Promise<any> {
    const response = await axios.put(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/email_send`, { email });

    if (response.status === 200) {
        return response;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
}

export async function emailVerify(email: string, verifCode: string): Promise<any> {
    const code = parseInt(verifCode, 10);
    console.log("Check email as string: " + typeof (email));
    console.log("Check verifCode as num: " + typeof (code));
    console.log(`Sending verification data:`, { email, code });

    try {
        const response = await axios.put(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/email_verify`, { email, code });

        if (response.status === 200) {
            console.log("successfully verified");
            return response;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error("fail to verify email: " + error);
    }
}

export async function emailConfirmToken(token: string): Promise<any> {
    const response = await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/email_confirm_token`, { token });

    if (response.status === 200) {
        return response;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
}

export async function emailConfirm(email: string): Promise<any> {
    try {
        const response = await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/email_confirm`, { email });

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    }
    catch (error) {
        console.log(error);
    }
}

export async function personaVerify(id: number, verification_status_id: number): Promise<any> {
    const response = await axios.put(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/persona_verification/${id}/${verification_status_id}`);
    if (response.status === 200) {
        return response.data.message;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
}

export async function getPersonaVerificationStatus(): Promise<any> {
    const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/verification_status`);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(`Unexpected status code: ${response.status}`);
    }
};

// notifications - get notifications for a user
export async function getNotifs(user_id: string): Promise<any[]> {
    try {
        const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/${user_id}/notifications`,
            { params: { user_id: user_id } });
        
        if (response.status === 200) {
            console.log('response.data: ', response.data);
            if (response.data.length > 0) {
                return response.data.map((notification: any) => ({
                    notif_id: notification.id,
                    title: notification.title,
                    content: notification.content,
                    timeCreated: new Date(notification.created_at).toISOString(),
                    contest_id: notification.contest_id,
                    type: notification.type
                }));
            } else {
                return [];
            }
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Failed to fetch notifications: ${error}`);
    }
}

// notifications - delete all notifications as read for a user
export async function deleteAllNotifs(user_id: string): Promise<void> {
    try {
        const response = await axios.delete(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/${user_id}/notifications/delete`,
            { params: { user_id: user_id } });

        if (response.status === 200) {
            console.log("Successfully deleted all notifications");
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Failed to delete all notifications: ${error}`);
    }
}

// notifications - delete one notification for a user
export async function deleteNotif(user_id: string, notif_id: number): Promise<void> {
    try {
        const response = await axios.delete(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/${user_id}/notifications/${notif_id}/delete`,
            { params: { user_id: user_id, notif_id: notif_id } });

        if (response.status === 200) {
            console.log("Successfully deleted notification with ID:", notif_id);
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Failed to delete notification with ID ${notif_id}: ${error}`);
    }
};


export async function checkUsernameAvailability(name: string): Promise<boolean> {
    try {
        const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/check_username_availability`, { params: { name } });
        if (response.status === 200) {
            return response.data.available;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Failed to check username availability: ${error}`);
    }
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
    try {
        const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/check_email_availability`, { params: { email } });
        if (response.status === 200) {
            return response.data.available;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Failed to check email availability: ${error}`);
    }
}

export async function userSignup_backup(signupInfo: UserSignup): Promise<UserResponse | ErrorResponse> {
    try {
        let url = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/signup`;
        if (signupInfo.referralCode) {
            url += `?referral_code=${signupInfo.referralCode}`;
        }
        const response = await axios.post(url, signupInfo);

        if (response.status === 200) {
            const userData: User = response.data.data;
            const userToken: string = response.data.token;

            const signedUpUser: UserResponse = {
                data: userData,
                token: userToken
            }

            return signedUpUser;
        } else {
            console.log('error');
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Signup failed';
            throw new Error(errorMessage);
        } else {
            console.log('error', error);
            throw new Error('An unexpected error occurred');
        }
    }
}


export async function getLastPasswordUpdate(user_id: string): Promise<any> {
    try {
        const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/last_password_update`, { params: { user_id } });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to get last password update: ${error.response ? error.response.data : error.message}`);
        } else {
            throw new Error(`Failed to get last password update: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}



export async function setLastPasswordUpdate(user_id: string): Promise<any> {
    try {
        const response = await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/set_last_password_update`, { user_id });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to set last password update: ${error.response ? error.response.data : error.message}`);
        } else {
            throw new Error(`Failed to set last password update: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}

export async function sendTrendingNotif(user_id: string): Promise<any> {
    try {
        const response = await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/send_trending_notif`, { user_id });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to send trending notifcation: ${error.response ? error.response.data : error.message}`);
        } else {
            throw new Error(`Failed to send trending notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
