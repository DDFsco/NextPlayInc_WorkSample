import styles from './UpdatePassword.module.css';
import { AccountMenu } from '../../components/AccountMenu/AccountMenu';
import { QuestionPromptBox } from '../../components/QuestionPromptBox/QuestionPromptBox';
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import LoginFooter from '../../components/LoginFooter/LoginFooter';
import { useState } from 'react';
import { verifyPassword, setPassword } from '@client/utils';
import { resetUserPassword } from '@client/utils';
import { UserEdits } from '@client/utils';
import { getUserInfo } from '@client/utils';
import { setLastPasswordUpdate } from '@client/utils';


export function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkPasswordTouched, setCheckPasswordTouched] = useState(false);
  const [checkPasswordError, setCheckPasswordError] = useState('');
  const [currPasswordError, setCurrPasswordError] = useState('');

  const validateNewPassword = (newPassword) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(newPassword);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setNewPasswordTouched(false);
  };
  const handleNewPasswordBlur = () => {
    setNewPasswordTouched(true);
    if (validateNewPassword(newPassword)) {
      setNewPasswordError('');
    } else {
      setNewPasswordError('New password must meet the requirements');
    }
  };

  const handleCheckPasswordChange = (e) => {
    const value = e.target.value;
    setCheckPassword(value);
    setCheckPasswordTouched(false);
  };
  const handleCheckPasswordBlur = () => {
    setCheckPasswordTouched(true);
    if (checkPassword === newPassword) {
      setCheckPasswordError('');
    } else {
      setCheckPasswordError('Confirm new password must match new password');
    }
  };

  async function submitButton() {
    if (!newPassword || !checkPassword) {
      setNewPasswordError('New password and confirm password must not be empty');
      return;
    }
    if (newPassword !== checkPassword) {
      setCheckPasswordError('Confirm new password must match new password');
      return;
    }

    const respVerify = await verifyPassword(currentPassword);
    if (respVerify.status !== 200) {
      setCurrPasswordError('Current password is incorrect');
      return;
    } else {
      setCurrPasswordError('');
    }

    const respInfo = await getUserInfo();
    const userEmail = respInfo.data?.message?.email;
    const resetPasswordUser: UserEdits = {
      email: userEmail,
      password: newPassword
    };
    const respSetPassword = await resetUserPassword(resetPasswordUser);
    if (respSetPassword.status !== 200) {
      alert('Failed to update password, please try again later.');
      return;
    } else {
      const userId = localStorage.getItem('id');
      if (!userId) {
          alert("User ID not found. Please log in again.");
          return;
      }
      await setLastPasswordUpdate(userId);
      setCurrentPassword('');
      setNewPassword('');
      setCheckPassword('');
      setNewPasswordTouched(false);
      setNewPasswordError('');
      setCheckPasswordTouched(false);
      setCheckPasswordError('');
      setCurrPasswordError('');
      alert('Password updated successfully!');
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
            {/* Update Password */}
            <div className={styles['update-password']}>
              <h2 className={styles['LSth']}>Update Password</h2>
              <label className={styles['LSformLabel']}>Current Password</label>
              <input
                placeholder="Current Password"
                className={styles['currPassword']}
                type="password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
              {currPasswordError && <p className={styles['error-message']}>{currPasswordError}</p>}
            </div>
            <div className={styles['line-horizontal']}></div>
            {/* New Password */}
            <div className={styles['new-password']}>
              <label className={styles['LSformLabel']}>New Password</label>
              <div className={styles['inputButtonWrapper']}>
              <input
                placeholder="New Password"
                className={styles['formInput']}
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                onBlur={handleNewPasswordBlur}
              />
              <p className={styles['password-guideline']}>
                (min of 8 characters, 1 lower case, 1 upper case, 1 special character)
              </p>
              </div>
              {newPasswordTouched && newPasswordError && (
                <p className={styles['error-message']}>{newPasswordError}</p>
              )}
            </div>

            <div className={styles['line-horizontal']}></div>

            {/* Confirm New Password */}
            <div className={styles['confirm-new-password']}>
              <label className={styles['LSformLabel']}>Confirm New Password</label>
              <div className={styles['inputButtonWrapper']}>
                <input
                  placeholder="Confirm New Password"
                  className={styles['formInput']}
                  type="password"
                  value={checkPassword}
                  onChange={handleCheckPasswordChange}
                  onBlur={handleCheckPasswordBlur}
                />
                <button className={styles['loginSecButtons']} onClick={submitButton}>
                  Confirm New Password
                </button>
              </div>
              {checkPasswordTouched && checkPasswordError && (
                <p className={styles['error-message']}>{checkPasswordError}</p>
              )}
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

export default UpdatePassword;
