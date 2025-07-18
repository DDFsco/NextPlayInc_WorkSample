import styles from './LoginSecurityMenu.module.css';
import stylesMobile from './LoginSecurityMenuMobile.module.css';
import { Link } from 'react-router-dom';
import { AccountMenu } from '../../components/AccountMenu/AccountMenu';
import { QuestionPromptBox } from '../../components/QuestionPromptBox/QuestionPromptBox';
import { useEffect, useState } from 'react';
import { getUserInfo, getLastPasswordUpdate } from '@client/utils';
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import LoginFooter from '../../components/LoginFooter/LoginFooter';

export function LoginSecurityMenu() {

  const [email, setEmail] = useState('');
  const [lastPasswordUpdate, setLastPasswordUpdate] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        console.log(response.data);
        setEmail(response.data?.message?.email ?? '');
      } catch (err) {
        console.log("ERROR:" + err.message);
      }
    };

    const fetchLastPasswordUpdate = async () => {
      const userId = localStorage.getItem('id');
      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      try {
        const response = await getLastPasswordUpdate(userId);
        const timestamp = response.lastPasswordUpdate;
        
        if (timestamp) {
          const date = new Date(timestamp);

          const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          };
          
          const formattedDate = date.toLocaleDateString('en-US', options);
          
          setLastPasswordUpdate(formattedDate);
        }
      } catch (err) {
        console.log("ERROR:" + err.message);
      }
    };

    fetchUserInfo();
    fetchLastPasswordUpdate();
  }, []);

  return (
    <div className={styles['LoginSec-page-container']}>
      <div id={styles.LSheader}>
          <LoginHeader />
      </div>
      <div className={styles['content-div']}>
        <AccountMenu />
        <div className={styles["middle-div"]}>
          <div className={styles.LStitles}>
            <div>
              <h1 id={styles.LSFirstTitle}>Login & Security</h1>
            </div>
            <div>
              <p id={styles.LSSecondTitle}>Update your login details and secure your account.</p>
            </div>
          </div>

          <div className={styles['loginSec-horizontal-block']}>
            <div id={styles.LSWrapTable}>
              <table id={styles.LSMainTable} >
                <tbody>
                  <tr>
                    <div className={styles["LSth"]}>Logging In</div>
                  </tr>
                  <tr>
                    <td id={styles.LCMenuBoxTd}>
                      <div className={styles['horizontal-button']}>
                        <form id={styles.LSForm}>
                          <label id={styles.LSformLabel}>Email</label>
                          <p className={styles["email-box"]}>{email || 'Email Address'}</p>
                        </form>
                        <Link to="/login-security/change-email" id={styles.loginSecLinks}>Edit Email</Link>
                      </div>
                    </td>
                  </tr>
                  <div className={styles['line-horizontal']}></div>

                  <tr>
                    <td id={styles.LCMenuBoxTd}> 
                      <div className={styles['horizontal-button']}>
                        <form id={styles.LSForm}>
                          <label id={styles.LSformLabel}>Password</label>
                          <div className={styles["password-box"]}>Last updated: {lastPasswordUpdate || 'Not available'}</div>
                        </form>
                        <Link to="/login-security/update-password" id={styles.loginSecLinks}>Update Password</Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles['question']}>
            <QuestionPromptBox />
            </div>
          </div>
        </div>
      </div>
      <div id={styles.LSfooter}>
        <LoginFooter />
      </div>
    </div>
  );
};


export default LoginSecurityMenu;
