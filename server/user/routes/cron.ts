import cron from "node-cron";
import { handleReferrals } from "../middlewares/handleReferral";
import { createLineupNotifs, deleteLineupNotifs, deleteTrendingNotifs, createInviteFriendNotif } from "../models/user";

// schedule referral handling
export function setReferralCron() {
    cron.schedule('*/30 * * * *', async () => {
            // console.log('Running referral qualification check');
            handleReferrals();
    });
}

export function setNotificationCron() {
    // Schedule cron job to run every minute send and/or delete automated notifications
    cron.schedule('0 * * * * *', () => {
        // console.log('executing cron jobs')
        deleteTrendingNotifs();
        createLineupNotifs();
        deleteLineupNotifs();
        createInviteFriendNotif();
    });
}
