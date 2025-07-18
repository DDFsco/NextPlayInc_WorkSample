import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import login_validation from './LoginValidation';
import { useAuth } from '../../context/authProvider';
import { UserLogin } from '../../../../../libs/shared/utils/src/lib/user/types';
import Header from '../../components/LoginHeader/LoginHeader';
import Footer from '../../components/LoginFooter/LoginFooter';
import background from '../../assets/loginBackground/background.png';
import { userLogin } from '@client/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock , faEyeSlash, faEye, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { Form } from "react-bootstrap";


interface LoginErrors {
    username?: string;
    password?: string;
}

const LoginForm: React.FC = () => {
    const [action, setAction] = useState<string>("Login");
    const [name, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [staySignedIn, setStaySignedIn] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<LoginErrors>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginData: UserLogin = { name, password, staySignedIn };
        const validationErrors = login_validation(loginData);
        
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {

            // Check username exist in the database
            if (name === '') {}

            // Check password equal to the password in the database
            if (password === '') {}

            try {
                // If the user data is valid, attempt to log in
                const response = await userLogin(loginData);

                if (!response) {
                    throw new Error('User don\'t exist');
                } else if ('token' in response) { // Check if 'token' property exists in response
                    // Gives client a token
                    setToken(response.token);

                    // Hold on for 1 second to wait the token to be set
                    // This is to make sure the navigate function is called after the token is set
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    // Log the user in and redirect or do other actions
                    navigate('/contest-lobby');  // Redirect the user to the home page or dashboard
                    console.log('Login successful:', response.data);
                    // // test stay signed in based on token expiration time
                    // const jwtPayload = JSON.parse(window.atob(response.token.split('.')[1]));
                    // const expirationTime = jwtPayload.exp * 1000 - Date.now();
                    // console.log('Token expires in:', expirationTime / 1000 / 60 / 60, 'hours');
                } else {
                    throw new Error('Invalid response');
                }
            } catch (error: any) {
                console.error('Login failed:', error.message);
                // Handle errors based on the specifics of your error object
                // You might want to set error messages here to show to the user
                setErrors({ password: 'The username/password you entered is incorrect ' });
            }
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof LoginErrors) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
        if (errors[field]) {
            setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
        }
    };    

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // let width=window.screen.width;
    // let containerScale = Math.max(2.2857 - .000892857 * width,1) + "";

    return (

        <div className={styles.background} >

            <Header />  
            <div className={styles.cover}>
                <form className={styles.container} onSubmit={handleSubmit}>
                    <div className={styles.headerText}>
                        <div className={styles.text}>Welcome back!</div>
                        <div className={styles.text}>Sign in</div>
                        {/*<div className={styles.underline}></div>*/}
                    </div>
                    <div className={styles.input}>
                        <div className={styles.inputType}> Username / Email</div>
                        {/*<FontAwesomeIcon icon={faUser} className={styles.userIcon} />*/}
                        <Form.Group controlId="username">
                            <Form.Control
                                type="name"
                                placeholder=""
                                value={name}
                                onChange={handleInputChange(setUsername, 'username')}
                                autoComplete='new-password'
                                autoCorrect='new-password'
                        />
                        </Form.Group>
                        {/* {errors.username && <div className={styles.error}>{errors.username}</div>} */}
                    </div>
                    {errors.username && <p className={styles['error-box']}>{errors.username}</p>}
                        
                    <div className={styles.input}>
                        <div className={styles.inputType}> Password</div>
                        {/*<FontAwesomeIcon icon={faLock} className={styles.passwordIcon} />*/}
                        <form autoComplete='false'>
                        <input 
                            type={passwordVisible ? "text" : "password"}
                            placeholder=""
                            value={password}
                            onChange={handleInputChange(setPassword, 'password')}
                            autoComplete='none'
                        />
                        </form>
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEye : faEyeSlash}
                            className={styles.hideIcon}
                            onClick={togglePasswordVisibility}
                            style={{marginLeft: " 2vw"}}
                            // add testid so we can found the button when testing
                            data-testid="toggle-password-visibility"
                        />
                        {/* {errors.password && <div className={styles.error}>{errors.password}</div>} */}
                    </div>
                    {errors.password && <p className={styles['error-box']}>{errors.password}</p>}
                      
                    <div className={styles.staySignedIn}>
                        <input 
                            className={styles.staySignedInBox}
                            type="checkbox" checked={staySignedIn}
                            onChange={() => setStaySignedIn(!staySignedIn)}
                        />
                        <div className={styles.staySignedInText}>Stay signed in</div>
                    </div>
                    <div className={styles.forgotPassword}>
                        <span onClick={() => navigate('../forgot-password')}>Forgot Password?</span>
                    </div>
                    <div className={styles['sign-up']}></div>
                    <button type="submit" className={styles.submitContainer}> Log In
                    </button>
                    <div className={styles.sendCode}>
                    <span onClick={() => navigate('../signup')}>No account? Sign up now!</span>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
export default LoginForm;