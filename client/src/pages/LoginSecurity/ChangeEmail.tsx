import styles from './ChangeEmail.module.css';
import { AccountMenu } from '../../components/AccountMenu/AccountMenu';
import { QuestionPromptBox } from '../../components/QuestionPromptBox/QuestionPromptBox';
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import LoginFooter from '../../components/LoginFooter/LoginFooter';
import { useState, useEffect } from 'react';
import { verifyPassword, setUserEmail, emailSend, emailVerify, getUserInfo } from '@client/utils';

export function ChangeEmail() {
  const [clickLimitReached, setClickLimitReached] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newEmailTouched, setNewEmailTouched] = useState(false);
  const [newEmailError, setNewEmailError] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationCodeTouched, setConfirmationCodeTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [clickCount, setClickCount] = useState<number>(0);
  const [passwordError, setPasswordError] = useState('');

  // Reset click count every hour
  useEffect(() => {
    const resetClickCount = setInterval(() => {
        setClickCount(0);
        setClickLimitReached(false);
    }, 3600000); // 1 hour in milliseconds

    return () => clearInterval(resetClickCount);
  }, []);

  //  Fetch user info
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const respInfo = await getUserInfo();
        setCurrentEmail(respInfo.data?.message?.email || '');
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    }

    fetchUserInfo();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewEmail(value);
    setNewEmailTouched(false);
  };

  const handleNewEmailBlur = () => {
    setNewEmailTouched(true);
    if (validateEmail(newEmail)) {
      setNewEmailError('');
    } else {
      setNewEmailError('Invalid email address');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(e.target.value);
  };

  async function submitButton() {
    if (!newEmail || !confirmationCode) {
      setNewEmailError('Email and confirmation code must not be empty');
      return;
    }

    if (!validateEmail(newEmail)) {
      setNewEmailError('Invalid email address');
      return;
    }

    const respVerify = await verifyPassword(password);
    if (respVerify.status !== 200) {
      setPasswordError('Current password is incorrect');
      return;
    } else {
      setPasswordError('');
    }

    try {
      await emailVerify(newEmail, confirmationCode);
      await setUserEmail(newEmail);
      setCurrentEmail(newEmail);
      alert('Email updated successfully!');
    } catch (error) {
      alert('Failed to update email, please try again later.');
    }
  }

  async function sendConfirmationCode() {
    if (clickLimitReached) {
      alert('You have reached the maximum number of requests per hour.');
      return;
    }
    setConfirmationCodeTouched(true);
    if (!validateEmail(newEmail)) {
      setNewEmailError('Invalid email address');
      return;
    }
    try {
      await emailSend(newEmail);

      // Restrict the number of requests to 10 per hour
      setClickCount(prevCount => prevCount + 1);
      if (clickCount + 1 >= 10) {
          setClickLimitReached(true);
      }

    } catch (error) {
      alert('Failed to send confirmation code, please try again later.');
    }
  }

  return (
    <div className={styles['LoginSec-page-container']}>
      <div className={styles['LSheader']}>
        <LoginHeader />
      </div>
      <div className={styles['content-div']}>
        <AccountMenu />

        <div className={styles['middle-div']}>
          <div className={styles['login-security-header-div']}>
            <h1 className={styles['LSFirstTitle']}>Login & Security</h1>
            <p className={styles['LSSecondTitle']}>Update your login details and secure your account.</p>
          </div>

          <div className={styles['loginSec-horizontal-block']}>
            <section className={styles['login-security-section']}>
              <div className={styles['update-email']}>
                <h2 className={styles['LSth']}>Change Email</h2>
                <label className={styles['LSformLabel']}>Current Email</label>
                <input
                  placeholder="Email Address"
                  className={styles['formInput']}
                  type="text"
                  value={currentEmail}
                  disabled
                />
              </div>
              <div className={styles['line-horizontal']}></div>

              <div className={styles['new-email']}>
                <label className={styles['LSformLabel']}>New Email</label>
                <div className={styles['inputButtonWrapper']}>
                  <input
                    placeholder="New Email Address"
                    className={styles['formInput']}
                    type="text"
                    value={newEmail}
                    onChange={handleNewEmailChange}
                    onBlur={handleNewEmailBlur}
                  />
                  {!confirmationCodeTouched &&(
                  <button id={styles.sendButton} className={styles['loginSecButtons']} onClick={sendConfirmationCode}>
                  Send Confirmation Code
                </button>
                  )}
                  {confirmationCodeTouched && (
                    <div id={styles.sendButton}>
                    <p className={styles['codeMessage']}>Verification code sent. Did not receive?</p>
                    <button className={styles['loginSecButtons']} onClick={sendConfirmationCode}>Send again</button>
                </div>
                  )}

                </div>
                {newEmailTouched && newEmailError && (
                  <p className={styles['error-message']}>{newEmailError}</p>
                )}
              </div>

              <div className={styles['line-horizontal']}></div>

              <div className={styles['password-confirmation']}>
                <label className={styles['LSformLabel']}>Password</label>
                <input
                  placeholder="Password"
                  className={styles['formInput']}
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {!confirmationCodeTouched &&(
                  <button id={styles.sendButtonMobile} className={styles['loginSecButtons']} onClick={sendConfirmationCode}>
                  Send Confirmation Code
                </button>
                  )}
                  {confirmationCodeTouched && (
                    <div id={styles.sendButtonMobile}>
                    <p className={styles['codeMessage']}>Verification code sent. Did not receive?</p>
                    <button className={styles['loginSecButtons']} onClick={sendConfirmationCode}>Send again</button>
                </div>
                  )}
                {passwordError && <p className={styles['error-message']}>{passwordError}</p>}
              </div>

              <div className={styles['line-horizontal']}></div>

              <div className={styles['confirm-new-email']}>
                <label className={styles['LSformLabel']}>Enter Confirmation Code</label>
                <div className={styles['inputButtonWrapper']}>
                  <input
                    placeholder="Confirmation Code"
                    className={styles['formInput']}
                    type="text"
                    value={confirmationCode}
                    onChange={handleConfirmationCodeChange}
                  />
                  <button className={styles['loginSecButtons']} onClick={submitButton}>
                    Confirm New Email
                  </button>
                </div>
              </div>
            </section>
            <div className={styles['question-prompt-box']}>
              <QuestionPromptBox />
            </div>
          </div>
        </div>
      </div>
      <div className={styles['LSfooter']}>
        <LoginFooter />
      </div>
    </div>
  );
}

export default ChangeEmail;
