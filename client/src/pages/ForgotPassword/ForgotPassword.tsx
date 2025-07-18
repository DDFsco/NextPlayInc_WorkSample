import React, { useState, useEffect } from 'react';
import styles from './ForgotPassword.module.css';
import validation from './EmailValidation';
import background from '../../assets/loginBackground/background.png';
import Footer from '../../components/LoginFooter/LoginFooter';
import Header from '../../components/LoginHeader/LoginHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { emailVerify, emailSend } from '@client/utils';
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';

interface emailErrors {
    email?: string;
    verificationCode?: string;
}

interface emailCheck {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [errors, setErrors] = useState<emailErrors>({});
    const [verificationCode, setVerificationCode] = useState("");
    const [message, setMessage] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(0);
    const [clickCount, setClickCount] = useState<number>(0);
    const [clickLimitReached, setClickLimitReached] = useState<boolean>(false);
    const navigate = useNavigate();

    // Reset click count every hour
    useEffect(() => {
        const resetClickCount = setInterval(() => {
            setClickCount(0);
            setClickLimitReached(false);
        }, 3600000); // 1 hour in milliseconds

        return () => clearInterval(resetClickCount);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }

        return () => clearTimeout(timer);
    }, [countdown]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailData: emailCheck = { email };
        const validationErrors = validation(emailData);
        setErrors(validationErrors);
        const verifCode = verificationCode;

        if (Object.keys(validationErrors).length === 0) {
            // verificationCode is collected from the user input
            await handleVerifyEmail(email, verifCode);
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof emailErrors) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
        if (errors[field]) {
            setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
            setMessage(''); // Clear message when starting to type
        }
    };

    const handleVerifyEmail = async (email, verifCode) => {
        let newerrors: emailErrors = {};
        try {
            const response = await emailVerify(email, verifCode);
            if (response.status === 200) {
                // email verified
                localStorage.setItem('email', email);
                localStorage.setItem('resetPasswordAllowed', 'true');
                navigate('/reset-password');
            }
        } catch (error) {
            newerrors.verificationCode = 'Sorry verification code is not correct';
            setErrors(newerrors);
            console.error('Verification failed:', error);
        }
    };

    const handleSendVerificationCode = async () => {
        let newerrors: emailErrors = {};
        if (clickLimitReached) {
            newerrors.email = 'You have reached the maximum number of requests per hour.';
            setErrors(newerrors);
            setMessage(''); // Clear message when starting to type
            return;
        }

        if (countdown > 0) {
            newerrors.email = 'Please wait for 60 seconds to send request.';
            setErrors(newerrors);
            setMessage(''); // Clear message when starting to type
            return;
        }


        const emailData = { email };
        const validationErrors = validation(emailData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await emailSend(email.toString());
                setMessage('The verification code has been sent to your email');
                setErrors({}); // Clear any existing errors when setting a new message
                setCountdown(60); // Start 1 minute countdown
                setClickCount(prevCount => prevCount + 1);
        
                if (clickCount + 1 >= 10) {
                    setClickLimitReached(true);
                }
            } catch (error) {
                console.error('Email does not exist', error);
            }
        }
        
    };

    // let width=window.screen.width;
    // let containerScale = Math.max(2.2857 - .000892857 * width,1) + "";

    return (
        <div className={styles.background} >
            <Header />
            <div className={styles.cover}>
                <form className={styles.container} onSubmit={handleSubmit}>
                    <div className={styles.header}>
                        <div className={styles.text}>Forgot Password</div>
                    </div>

                    <div className={styles.inputs}>
                        <div className={styles.input}>
                            <div className={styles.inputType}>Email</div>
                            {/*<FontAwesomeIcon icon={faEnvelope} className={styles.emailIcon} />*/}
                            <input
                                type="text"
                                placeholder=""
                                value={email}
                                onChange={handleInputChange(setEmail, 'email')}
                            />
                            {countdown > 0 ? (
                                <div className={styles.countdown}>{countdown}s</div>
                            ) : (
                                <div onClick={handleSendVerificationCode} className={styles.send}><span>Send</span></div>
                            )}
                        </div>
                        {errors.email && <p className={styles['error-box']}>{errors.email}</p>}
                        {message && <div className={styles.message}>{message}</div>}

                        <div className={styles.input}>
                            <div className={styles.inputType}>Verification code</div>
                            {/*<FontAwesomeIcon icon={faShield} className={styles.verifyIcon} />*/}
                            <input
                                type="verifyCode"
                                placeholder=""
                                value={verificationCode}
                                onChange={handleInputChange(setVerificationCode, 'verificationCode')}
                            />
                        </div>
                        {errors.verificationCode && <p className={styles['error-box']}>{errors.verificationCode}</p>}
                    </div>

                    <div className={styles['forgot-password']}>Please enter the verification code we sent to your email</div>
                    <div onClick={handleSendVerificationCode} className={styles['sign-up']}>Didn't Receive? <span> Send again</span></div>
                    <button type="submit" className={styles.submitContainer}>
                        <FontAwesomeIcon icon={faArrowRight} className={styles.continue} />
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default ForgotPassword;
