import React, { createContext, useContext, useState, useEffect } from 'react';
import { getNotifs, deleteNotif, deleteAllNotifs, sendTrendingNotif, fetchContest } from '@client/utils';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';

interface NotificationContextType {
    notifications: any[];
    setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
    fetchNotifications: (user_id: string) => Promise<any[]>;
    deleteNotification: (user_id: string, notif_id: number) => Promise<void>;
    deleteAllNotifications: (user_id: string) => Promise<void>;
    clickedTitle: (contest_id: number, notif_type: string) => void;
}

interface NotificationProviderProps {
    children: React.ReactNode;
}

const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    setNotifications: () => {},
    fetchNotifications: async () => [],
    deleteNotification: async () => {},
    deleteAllNotifications: async () => {},
    clickedTitle: () => {}
});

// Send trending notification
const sendTrendingNotification = async (user_id: string) => {
    try {
        if (user_id) {
            await sendTrendingNotif(user_id);
            console.log('Notification sent.');
        } else {
            console.error('User ID not found in localStorage');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

// Check if notification should be sent         **may be used in the future
/* const shouldSendNotification = (userTimeNow: moment.Moment): boolean => {
    return userTimeNow.second() === 0 && userTimeNow.minute() === 0 && userTimeNow.hour() >= 8 && userTimeNow.hour() <= 20; // 8am and 8pm
}; */

// Schedule notifications based on user's time zone
const scheduleTrendingNotifs = async (user_id: string): Promise<number | NodeJS.Timeout>=> {
    const userTimeZone = moment.tz.guess();
    const userInitialTimeNow = moment().tz(userTimeZone);

    // Calculate the time until the next hour
    const nextHour = userInitialTimeNow.clone().startOf('hour').add(1, 'hour');
    const delay = nextHour.diff(userInitialTimeNow);

    return new Promise((resolve) => {
        // Set a timeout to trigger the first notification at the start of the next hour
        const timeoutId = setTimeout(async () => {
            const userTimeNow = moment().tz(userTimeZone);
            /*if (shouldSendNotification(userTimeNow)) {
                await sendTrendingNotification(user_id);
            }*/
            await sendTrendingNotification(user_id);
            
            // Set an interval to check every hour on the hour
            const intervalId = setInterval(async () => {
                const userTimeNow = moment().tz(userTimeZone);
                /*if (shouldSendNotification(userTimeNow)) {
                    await sendTrendingNotification(user_id);
                }*/
                await sendTrendingNotification(user_id);
            }, 3600000); // Every hour
            
            // Resolve the promise with the interval ID
            resolve(intervalId);
        }, delay);
    });
};

export const NotificationProvider: React.FC <NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const navigate = useNavigate();

        // Set up interval on mount and clear on unmount
        useEffect(() => {
            const userId = localStorage.getItem('id');

            if (userId) {
                const setupInterval = async () => {
                    const intervalId = await scheduleTrendingNotifs(userId);
        
                    // Ensure intervalId is valid before attempting to clear it
                    if (typeof intervalId === 'number') {
                        return () => clearInterval(intervalId);
                    }
                };
        
                setupInterval().then(cleanup => {
                    // Only return the cleanup function if it's available
                    if (cleanup) {
                        return cleanup;
                    }
                });
            }
        }, []);

        // Fetch notifications
        const fetchNotifications = async (user_id: string): Promise<any[]> => {
            try {
                const notificationsData = await getNotifs(user_id);
                setNotifications(notificationsData);
                return notificationsData;
            } catch (error) {
                console.error('Error fetching notifications:', error);
                return [];
            }
        };
    
        // Delete one specific notification for a user
        const deleteNotification = async (user_id: string, notif_id: number): Promise<void> => {
            try {
                await deleteNotif(user_id, notif_id);
                const updatedNotifications = notifications.filter(notification => notification.notif_id !== notif_id);
                setNotifications(updatedNotifications);
            } catch (error) {
                console.error('Error deleting notification:', error);
            }
        };
    
        // Deletes all notifications for a user
        const deleteAllNotifications = async (user_id: string): Promise<void> => {
            try {
                await deleteAllNotifs(user_id);
                setNotifications([]);
            } catch (error) {
                console.error('Error deleting all notifications:', error);
            }
        };
        
        const clickedTitle = async (contest_id: number, notif_type: string): Promise<void> => {
            // Check what type of notification it is and navigate to the correct page
            if (contest_id) {
              const contest = await fetchContest(contest_id);
        
              if (notif_type === "Trending") {
                const sport = contest.type === 'MLB' ? 'baseball' : 'football';
                const sportType = contest.sport_type === 'Classic No Cap' ? 'no-cap-showdown' : 'single-showdown';
                navigate(`../contest/${sport}/${sportType}/${contest.id}`);
              } else if (notif_type === "Incomplete Lineup") {
                if (contest.type === 'NFL') { 
                  navigate(`../contest/upcoming/football/${contest.id}`);
                } else { // contest.type === 'MLB'
                  /*navigate(`../mycontestBB}`);*/ // currently only leads to contest with contestId 13
                }
              } else if (notif_type === "Invite a Friend") { 
                navigate(`../my-contests`);
              }
            }
          };

    return (
        <NotificationContext.Provider
            value={{ notifications, setNotifications, fetchNotifications, deleteNotification, deleteAllNotifications, clickedTitle }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
