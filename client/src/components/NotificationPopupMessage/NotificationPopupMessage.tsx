import React, { useState, useEffect } from 'react';
import styles from './NotificationPopupMessage.module.css';
import closeImg from '../../assets/buttonIcons/close.png'; 
import { formatDistanceToNow } from 'date-fns';
import { fetchContest } from '@client/utils';

interface NotificationPopupMessageProps {
  // Associated with 'notifications' table columns
  notif_id: number;
  title: string;
  content: string;
  contest_id: number;
  type: string;

  // Other props
  timeCreated: number;
  onDeleteNotif: (notif_id: number) => void;
  onClickTitle: (contest_id: number, notif_type: string) => void;
}

const NotificationPopupMessage: React.FC<NotificationPopupMessageProps> = ({ notif_id, title, content, timeCreated, onDeleteNotif, 
                                                                            contest_id, type, onClickTitle}) => {  
  // converts timestamp to formatted date string
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formattedTimeCreated = formatDate(timeCreated);

  const handleDelete = () => {
    onDeleteNotif(notif_id);
  };

  const handleClickTitle = () => {
    onClickTitle(contest_id, type);
  };

  const setNotifTitle = (): string => {
    let notifTitle = title;
    if (notifTitle.length > 28) {
      notifTitle = `${notifTitle.substring(0, 28)}...`;
    }
    return notifTitle;
  };

  const setNotifContent = (): string => {
    let notifContent = content;
    if (notifContent.length > 44) {
      notifContent = `${notifContent.substring(0, 44)}...`;
    }
    return notifContent;
  };

  return (
    <div className={styles.popupContainer}>
      <img src={closeImg} alt="Close" className={styles.popupCloseButton} onClick={handleDelete} />
      <p className={styles.popupTimestamp}>{formatDate(timeCreated)}</p>
      <h3 className={styles.popupTitle} style={{ cursor: contest_id ? 'pointer' : 'default' }} onClick={handleClickTitle}>{setNotifTitle()}</h3>
      <p className={styles.popupContent}>{setNotifContent()}</p>
    </div>
  );
};

export default NotificationPopupMessage;
