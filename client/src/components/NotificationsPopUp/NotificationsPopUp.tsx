import React, { useState, useEffect } from 'react';
import styles from './NotificationsPopUp.module.css'; 
import NotificationPopupMessage from '../NotificationPopupMessage/NotificationPopupMessage';
import { useAuth } from "../../context/authProvider";
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationsContext';

const NotificationsPopUp = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { notifications, setNotifications, fetchNotifications, deleteNotification, clickedTitle } = useNotifications();
    const [screenWidth, setWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const fetchNotifsAndSetHeight = async () => {
            if (token) {
                try {
                    const user_id = localStorage.getItem("id");

                    if (user_id) {
                        const notificationsData = await fetchNotifications(user_id);
                        setNotifications(notificationsData); 
                    }
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };

        fetchNotifsAndSetHeight();
    }, [token]);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onDeleteNotif = async (notif_id: number) => {
        try {
            const user_id = localStorage.getItem("id");

            if (user_id) {
                await deleteNotification(user_id, notif_id);
    
                // Fetch updated notifications after deletion
                const updatedNotifications = await fetchNotifications(user_id);
                setNotifications(updatedNotifications);
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const onClickTitle = (contest_id: number, notif_type: string) => {
        clickedTitle(contest_id, notif_type);
    }

    const renderTopNotifs = () => {
        if (notifications.length > 0) {
            // Slice the last three notifications
            const newestNotifications = notifications.slice(0, 3); // top 3 notifications
    
            return (
                newestNotifications.map(notification => (
                    <NotificationPopupMessage
                        key={notification.notif_id}
                        notif_id={notification.notif_id}
                        title={notification.title}
                        content={notification.content}
                        contest_id={notification.contest_id}
                        type={notification.type}
                        timeCreated={notification.timeCreated}
                        onDeleteNotif={onDeleteNotif}
                        onClickTitle={onClickTitle}
                    />
                ))
            );
        } else {
            return (
                <p className={styles.noNotifsText} style={{fontSize: screenWidth > 480 ? '1vw' : '3vw'}}>You have no new notifications</p>
            ); 
        }
    };

    return (
        <div className={styles.notifsPopupContainer} style={{ top: screenWidth > 480 ? '3vw' : '16.5vw' }}>
            <div className={styles.notifTitle}>Notifications({notifications.length})</div>
            <div className={styles.notifContent}>
                {renderTopNotifs()}
            </div>
            <div className={styles.viewAllText} onClick={() => { navigate("/notifications") }}>View All</div>
        </div>
    );
};

export default NotificationsPopUp;
