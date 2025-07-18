import express from "express";
import { listUsers, createUser, editUser, deleteUser, loginUser, sendEmail, verifyEmail, verifyPersona, 
        resetPassword, getVerificationStatus, getUserDetail, sendNotification, getNotifications, 
        deleteAllNotifs, deleteNotif, checkUsernameAvailability, checkEmailAvailability,
        confirmEmail,
        verifyEmailWithToken,
        setLastPasswordUpdate, getLastPasswordUpdate,
        sendTrendingNotif} from "../controllers/users";
import { getStateWithIP, testGetStateWithIP } from "../middlewares/ipGeolocation";
import { addReferralCode, getSuccessfulReferrals } from "../controllers/referrals";
import { validateUser } from "../middlewares/userService";
import { isAuthenticated, testAuth, testToken } from "../middlewares/auth";
import { getFirstTrophies, getTotalTrophies } from "../controllers/trophies";
//This router will contain all the user methods including signup, login, get user detail, edit, delete

const userRoutes = express.Router();

userRoutes.get("/list_users", listUsers);

// Get user detail
userRoutes.get('/user/:id', isAuthenticated, getUserDetail);

// login and logout
userRoutes.post("/login", loginUser);
//TODO!: logout after jwt is implemented on signup and login
userRoutes.post("/logout", () => { });

//signup
//TODO: include getStatewithIP in this function after deployment.
userRoutes.post("/signup_", validateUser, createUser);
// userRoutes.post("/signup", validateUser, createUser);
userRoutes.put("/edit/:id", isAuthenticated, validateUser, editUser);

userRoutes.delete("/delete/:id", isAuthenticated, deleteUser);

// geolocation
userRoutes.get("/ipGeolocation", isAuthenticated, getStateWithIP);
//userRoutes.get("/ipGeolocation/test", testGetStateWithIP);
//test_token
userRoutes.get("/get_token", testToken);

//test Auth Middleware
//All protected Routes must be defined this way
userRoutes.get("/check_auth", isAuthenticated, testAuth);

// send one-time code to email
userRoutes.put("/email_send", sendEmail);
// verify one-time code
userRoutes.put("/email_verify", verifyEmail);
// confirm email
userRoutes.post("/email_confirm", confirmEmail);
userRoutes.post("/email_confirm_token", verifyEmailWithToken);


// update user verification status
userRoutes.put("/persona_verification/:id/:verification_status_id", isAuthenticated, verifyPersona);

// reset user password
userRoutes.post("/reset_password", resetPassword);

// get user verification status
userRoutes.get("/verification_status", getVerificationStatus);

// send notifications
userRoutes.post("/notifications", sendNotification);

// get notifications for a user
userRoutes.get("/:user_id/notifications", getNotifications); // isAuthenticated,

// mark all notifications as read for a user
//userRoutes.put("/:user_id/notifications/markAllRead", markAllNotifsRead); // isAuthenticated,

// delete all notifications for a user
userRoutes.delete("/:user_id/notifications/delete", deleteAllNotifs); //isAuthenticated,

// delete one notification for a user
userRoutes.delete("/:user_id/notifications/:notif_id/delete", deleteNotif); //isAuthenticated,
// get success referrals
userRoutes.get("/successful_referrals", isAuthenticated, getSuccessfulReferrals);
userRoutes.get("/add_referral_code", isAuthenticated, addReferralCode);

//Trophy stuff
userRoutes.get("/total_trophies", isAuthenticated, getTotalTrophies);
userRoutes.get("/first_trophies", isAuthenticated, getFirstTrophies);

// check username and email availability
userRoutes.get("/check_username_availability", checkUsernameAvailability);
userRoutes.get("/check_email_availability", checkEmailAvailability);

// update the time when the given user's password has been changed
userRoutes.post("/set_last_password_update", setLastPasswordUpdate);
userRoutes.get("/last_password_update", getLastPasswordUpdate);

// sends trending notification to user once per hour from 8am-8pm in user's timezone
userRoutes.post("/send_trending_notif", sendTrendingNotif);

export default userRoutes;
