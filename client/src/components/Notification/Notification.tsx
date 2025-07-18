import styles from './Notification.module.css';
import closeImg from '../../assets/buttonIcons/close.png'; 
import CheckedBoxImg from '../../assets/buttonIcons/checked_box.png'; 
import { useNavigate } from 'react-router-dom';
import { fetchContest } from '@client/utils';
import { formatDistanceToNow } from 'date-fns';

interface NotificationProps {
  // Associated with 'notifications' table columns
  notif_id: number;
  title: string;
  content: string;
  contest_id: number;
  type: string;

  // Other props
  showChecked: boolean;
  timeCreated: number;
  onDeleteNotif: (notif_id: number) => void;
  onClickTitle: (contest_id: number, notif_type: string) => void;
}
  
const Notification: React.FC<NotificationProps> = ({ notif_id, title, content, timeCreated, contest_id, 
                                                      showChecked, onDeleteNotif, type, onClickTitle}) => {
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
    
    if (notifTitle.length > 70) { // 65vw is MyNotifications notif container width
      notifTitle = `${notifTitle.substring(0, 70)}...`;
    }

    return notifTitle;
  };

  const setNotifContent = (): string => {
    let notifContent = content;
    
    if (notifContent.length > 410) { // 65vw is MyNotifications notif container width
      notifContent = `${notifContent.substring(0, 410)}...`;
    }

    return notifContent;
  };

  return (
    <div className={styles.container}>
      {showChecked && (
              <img src={CheckedBoxImg} alt="Checked Box" className={styles.checkedButton} style={{ zIndex: 3 }} />
          )}
          {!showChecked && (
              <img src={closeImg} alt="Close" className={styles.closeButton} style={{ zIndex: 3 }} onClick={handleDelete}/>
          )}
      <p className={styles.timestamp}>{formatDate(timeCreated)}</p>
      <h3 className={styles.title} style={{ cursor: contest_id ? 'pointer' : 'default' }} onClick={handleClickTitle}>{setNotifTitle()}</h3>
      <p className={styles.content}>{setNotifContent()}</p>
    </div>
  );
};

export default Notification;
