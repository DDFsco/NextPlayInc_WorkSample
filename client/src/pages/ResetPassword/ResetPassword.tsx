import React, { useState, useEffect } from 'react';
import styles from './ResetPassword.module.css';
import validation from './PasswordValidation';
import post from 'axios';
import { UserEdits } from '@client/utils';
import background from '../../assets/loginBackground/background.png';
import Header from '../../components/LoginHeader/LoginHeader';
import Footer from '../../components/LoginFooter/LoginFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { resetUserPassword } from '@client/utils';

interface password {
    password: string;
    confirmPass: string;
}

interface passwordErrors {
    password?: string;
    confirmPass?: string;
}

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<passwordErrors>({});
    const navigate = useNavigate();

    useEffect(() => {
        const resetPasswordAllowed = localStorage.getItem('resetPasswordAllowed');
        if (!resetPasswordAllowed) {
            //navigate('/forgot-password');
        }
    }, [navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const passwordData: password = { password, confirmPass };
        const validationErrors = validation(passwordData);
        setErrors(validationErrors);
        const email = localStorage.getItem('email');

        if (Object.keys(validationErrors).length === 0) {
            await handleResetPassword(email, password);
        }
    };

    const handleResetPassword = async (email, password) => {
        const resetUserPasswordData: UserEdits = { email, password };
        let newerrors: passwordErrors = {};
        try {
            const response = await resetUserPassword(resetUserPasswordData);
            if (response.status === 200) {
                localStorage.removeItem('resetPasswordAllowed'); // Clear the flag after successful reset
                localStorage.removeItem('email');
                navigate('/login');
            }
        } catch (error) {
            console.log(email, password);
            newerrors.password = 'Sorry your new password should not be the same as the old password';
            setErrors(newerrors);
            console.error('Password reset failed:', error);
        }
    };

    const handleCancel = () => {
        localStorage.removeItem('resetPasswordAllowed');
        localStorage.removeItem('email');
        navigate('/login');
    };

    let width=window.screen.width;
    let containerScale = Math.max(2.2857 - .000892857 * width,1) + "";

    return (
        <div className={styles.background} >
            <div style={{ position: 'relative', zIndex: 2 }}>
                <Header />
            </div>
            <div className={styles.cover}>
                <form className={styles.container} onSubmit={handleSubmit}>
                    <div className={styles.header}>
                        <div className={styles.text}>Reset Password</div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.inputType}>New Password</div>
                        {/*<FontAwesomeIcon icon={faLock} className={styles.passwordIcon} />*/}
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder=""
                            autoComplete="off"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                                icon={passwordVisible ? faEye : faEyeSlash}
                                className={styles.eyeIcon}
                                onClick={()=>setPasswordVisible(!passwordVisible)}
                            />
                    </div>
                    {errors.password && <p className={styles['error-box']}>{errors.password}</p>}
                    <div className={styles['passwordRequirement']}>(min of 8 characters, 1 lower case, 1 upper case, 1 special character)</div>
                    <div className={styles.input}>
                        <div className={styles.inputType}>Confirm Password</div>
                        {/*<FontAwesomeIcon icon={faLock} className={styles.confirmIcon} />*/}
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder=""
                            autoComplete="off"
                            value={confirmPass}
                            onChange={e => setConfirmPass(e.target.value)}
                        />
                        <FontAwesomeIcon
                                icon={passwordVisible ? faEye : faEyeSlash}
                                className={styles.eyeIcon}
                                onClick={()=>setPasswordVisible(!passwordVisible)}
                            />
                    </div>
                    {errors.confirmPass && <p className={styles['error-box']}>{errors.confirmPass}</p>}
                    <div className={styles['submit-container']}>
                        <button type="submit" className={styles.submit}>Submit</button>
                    </div>
                    <div className={styles['cancel-container']}>
                        <button type="button" className={styles.cancel} onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
export default ResetPassword;
