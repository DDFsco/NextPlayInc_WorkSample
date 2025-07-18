import Footer from '../../components/LoginFooter/LoginFooter';
import styles from './MyNotifications.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import WebNotification from '../../components/Notification/Notification';
import React, { useState, useEffect } from 'react';
import CheckedBoxImg from '../../assets/buttonIcons/checked_box.png'; 
import Header from '../../components/LoginHeader/LoginHeader';
import NoAlarm from '../../assets/images/no-alarm.png';
import { useNotifications } from '../../context/NotificationsContext';
import MobileNotification from '../../components/MobileNotification/MobileNotification';

const MyNotifications: React.FC = () => {
    const { notifications, setNotifications, fetchNotifications, deleteNotification, deleteAllNotifications, clickedTitle } = useNotifications();
    const [containerHeight, setContainerHeight] = useState<number>(36); // around 4 notifications
    const [markedAllAsRead, setMarkAllAsRead] = useState<boolean>(false);
    const [screenWidth, setScreenWidth] = React.useState(window.screen.width);

    useEffect(() => {
        window.addEventListener ('resize', () => {setScreenWidth(window.screen.width)});
        window.removeEventListener ('resize', () => {setScreenWidth(window.screen.width)});

        const fetchNotifsAndSetHeight = async () => {
            try {
                const user_id = localStorage.getItem("id");
                
                if (user_id) {
                    const notificationsData = await fetchNotifications(user_id);
            
                    // Update state with fetched notifications
                    setNotifications(notificationsData);
    
                    // Adjust container height based on notifications length
                    // (9vw is height of a notification + 1vw for gap, 7vw for area above notifs)
                    const containerHeight = Math.max(36, notificationsData.length * 10);

                    if (containerHeight >= 36) {
                        setContainerHeight(containerHeight + 7);
                    } else {
                        setContainerHeight(containerHeight);
                    }
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
    
        fetchNotifsAndSetHeight();
    }, []);

    const toggleMarkedAllAsRead = () => {
        setMarkAllAsRead(prevState => !prevState);
        renderMarkAll();
    };

    const handleMarkAllAsRead = async () => {
        try {
            const user_id = localStorage.getItem("id");

            if (user_id) {
                await deleteAllNotifications(user_id);
                setNotifications([]);
                setContainerHeight(550);
                setMarkAllAsRead(false);
            }

        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    
    };

    const onDeleteNotif = async (notif_id: number) => {
        try {
            const user_id = localStorage.getItem("id");

            if (user_id) {
                await deleteNotification(user_id, notif_id);
    
                // Fetch updated notifications after deletion
                const updatedNotifications = await fetchNotifications(user_id);
                setNotifications(updatedNotifications);
    
                // Adjust container height based on notifications length
                    // (9vw is height of a notification + 1vw for gap, 7vw for area above notifs)
                    const containerHeight = Math.max(36, updatedNotifications.length * 10);

                    if (containerHeight >= 36) {
                        setContainerHeight(containerHeight + 7);
                    } else {
                        setContainerHeight(containerHeight);
                    }
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const onClickTitle = (contest_id: number, notif_type: string) => {
        clickedTitle(contest_id, notif_type);
    }

    const renderMarkAll = () => {
        if (notifications.length > 0) {
            if (!markedAllAsRead) {
                return (
                    <div>
                        <FontAwesomeIcon icon={faSquare} className={screenWidth > 480? styles.markAllButtonFalse : styles.markAllButtonFalse_M} style={{ position: 'relative', zIndex: 3 }} onClick={notifications.length > 0? toggleMarkedAllAsRead : undefined} />
                        <div className={screenWidth > 480? styles.markReadText : styles.markReadText_M} style={{ zIndex: 3 }}>
                            Mark As All Read
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <img src={CheckedBoxImg} alt="Checked Box" className={screenWidth > 480? styles.markAllButtonTrue : styles.markAllButtonTrue_M} style={{ position: 'relative', zIndex: 3 }} onClick={toggleMarkedAllAsRead} />
                        <div className={screenWidth > 480? styles.confirmText : styles.confirmText_M} style={{ cursor: 'pointer', zIndex: 3 }} onClick={notifications.length > 0? handleMarkAllAsRead : undefined}>
                            Confirm Mark As All Read
                        </div>
                    </div>
                );
            }
        }
    };

    const renderNotifs = () => {
        if (notifications.length > 0) {
                return (
                    notifications.map(notification => (
                        screenWidth > 480 ? 
                            <WebNotification
                                notif_id={notification.notif_id}
                                title={notification.title}
                                content={notification.content}
                                contest_id={notification.contest_id}
                                type={notification.type}
                                showChecked={markedAllAsRead}
                                timeCreated={notification.timeCreated}
                                onDeleteNotif={onDeleteNotif}
                                onClickTitle={onClickTitle}
                            /> :
                            <MobileNotification
                            notif_id={notification.notif_id}
                            title={notification.title}
                            content={notification.content}
                            contest_id={notification.contest_id}
                            type={notification.type}
                            showChecked={markedAllAsRead}
                            timeCreated={notification.timeCreated}
                            onDeleteNotif={onDeleteNotif}
                            onClickTitle={onClickTitle}
                            />
                    )));
        } else {
            return (
                <div>
                    <img src={NoAlarm} alt="No Alarm" className={screenWidth > 480? styles.noAlarmImg : styles.noAlarmImg_M}/>
                    <p className={screenWidth > 480? styles.noNotifsText : styles.noNotifsText_M}>You have no new notifications</p>
                </div>
            );
        }
    };

    if (screenWidth > 480) {
        return (
            <div className={styles.myNotifsContainer}>
                <div style={{ position: 'relative', zIndex: 4 }}>
                    <Header/>
                </div>
                <div className={styles.background} style={{ height: `${containerHeight}vw` }}>
                    <div className={styles.notifsText}>Notifications</div>
                    {renderMarkAll()}
                    <div className={styles.notifContainer} style={{ zIndex: 3, height: `${containerHeight}vw` }}>
                        {renderNotifs()}
                    </div>
                </div>
                <div style={{ position: 'relative', zIndex: 1, paddingTop: '5vh' }}>
                    <Footer />
                </div>
            </div>
        );
    } else { // Mobile screen
        return (
            <div className={styles.myNotifsContainer}>
                <div style={{ position: 'relative', zIndex: 4 }}>
                    <Header/>
                </div>
                <div className={styles.background} style={{ height: `${containerHeight}vw` }}>
                    {renderMarkAll()}
                    <div className={styles.notifContainer_M} style={{ zIndex: 3, height: `${containerHeight}vw` }}>
                        {renderNotifs()}
                    </div>
                </div>
            </div>
        );
    }
}

export default MyNotifications;
