import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import styles from './SignupForm.module.css';
import "./date-picker-css.scss";
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import Footer from "../../components/LoginFooter/LoginFooter";
import { UserSignup_ } from '../../../../../libs/shared/utils/src/lib/user/types';
import { emailConfirm, userSignup } from '@client/utils';
import { useAuth } from '../../context/authProvider';
import ReCAPTCHA from 'react-google-recaptcha';
import { checkUsernameAvailability, checkEmailAvailability } from "@client/utils";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import DatePicker from "react-datepicker";
import { NX_RECAPTCHA_SITE_KEY } from '@client/utils';

type FormInputs = {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    email: string;
    zipCode: string;
    dob: Date;
    agreement: boolean;
    recaptcha: string;
};

const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});

const SignupForm: React.FC = () => {
    const { register, handleSubmit, watch, setError, clearErrors, control, formState: { errors } } = useForm<FormInputs>({ 
        mode: 'onBlur', 
        reValidateMode: 'onChange'
    });
    const { setToken } = useAuth();
    const nagivate = useNavigate();
    const [referralCode, setReferralCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const captchaRef = useRef<ReCAPTCHA>(null);

    const password = watch("password");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('referral_code');
        if (code) {
            setReferralCode(code);
        }
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
        // Check reCAPTCHA
        const recaptchaToken = await captchaRef.current?.getValue();
        if (!recaptchaToken) {
            setError('recaptcha', { message: "Please complete the reCAPTCHA" });
            return;
        }

        const SignupData: UserSignup_ = {
            name: data.username,
            email: data.email,
            password: data.password,
            first_name: "NA",
            last_name: "NA",
            date_of_birth:"1970-01-01",
            zip_code: "000000",
            referralCode: referralCode,
            recaptcha: recaptchaToken
        };
        try {
            const response = await userSignup(SignupData);
            if ("token" in response) {
                setToken(response.token);
            }
            if ("data" in response) {
                localStorage.setItem('id', response.data.id.toString());
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('state', response.data.state);
                await emailConfirm(SignupData.email);
            }
            nagivate('/contest-lobby');

        } catch (error) {
            console.log(error);
        }
    };
    const handleFormSubmit = (event) => {
        setIsSubmitted(true);
        handleSubmit(onSubmit)(event);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={styles['screen-container']}>
            <LoginHeader />
            <div className={styles['form-container']} >
                <div className={styles['form-header']}>
                    <h1>Welcome! Let's register your account.</h1>
                </div>
                <form onSubmit={handleFormSubmit} noValidate>
                    <div className={styles['input-container']}>
                        <div className={styles.inputType}> Username* </div>
                        <Form.Group controlId="username">
                            <Form.Control
                                type="text"
                                placeholder=""
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: { value: 1, message: "Username must be at least 1 characters long" },
                                    maxLength: { value: 20, message: "Username must be at most 20 characters long" },
                                    pattern: {
                                        value: /^[^\s]+$/,
                                        message: "Username cannot contain spaces",
                                    },
                                    onChange: () => {
                                        if (errors.username) {
                                            clearErrors('username');
                                        }
                                    },
                                    validate: async value => {
                                        // check for profanity
                                        if (matcher.hasMatch(value)) {
                                            return "Username contains inappropriate language";
                                        }

                                        try {
                                            const isAvailable = await checkUsernameAvailability(value);
                                            return isAvailable || "Username is already taken";
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }
                                }
                            )}
                            />
                        </Form.Group>
                      
                    </div>
                    {errors.username && <p className={styles['error-box']}>{errors.username.message}</p>}
                        
                    <div className={styles['input-container']}>
                        <div className={styles.inputType}>Password*</div>
                        <Form.Group controlId="password">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder=""
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
                                        message: "Password doesn't meet the requirements",
                                    },
                                    onChange: () => {
                                        if (errors.password) {
                                            clearErrors('password');
                                        }
                                    }
                                })}
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                                className={styles.eyeIcon}
                                onClick={togglePasswordVisibility}
                            />
                        </Form.Group>

                        
                    </div>
                    {errors.password && <p className={styles['error-box']}>{errors.password.message}</p>}
                    <p className={styles.p}>(min of 8 characters, 1 lower case, 1 upper case, 1 special character)</p>

                    <div className={styles['input-container']}>
                        <div className={styles.inputType}>Confirm Password*</div>
                        <Form.Group controlId="confirmPassword">
                            <Form.Control
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder=""
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => 
                                        value === password || "Passwords do not match",
                                    onChange: () => {
                                        if (errors.confirmPassword) {
                                            clearErrors('confirmPassword');
                                        }
                                    }
                                })}
                            />
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? faEye : faEyeSlash}
                                className={styles.eyeIcon}
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        </Form.Group>

                    </div>
                    {errors.confirmPassword && <p className={styles['error-box']}>{errors.confirmPassword.message}</p>}
                    <div className={styles['input-container']}>
                        <div className={styles.inputType}>Email*</div>
                        <Form.Group controlId="email">

                            <Form.Control
                                type="email"
                                placeholder=""
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Invalid email address",
                                    },
                                    validate: async value => {
                                        try {
                                            const isAvailable = await checkEmailAvailability(value);
                                            return isAvailable || "Email is already taken";
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    },
                                    onChange: () => {
                                        if (errors.email) {
                                            clearErrors('email');
                                        }
                                    }
                                })}
                            />
                        </Form.Group>

                    </div>
                    {errors.email && <p className={styles['error-box']}>{errors.email.message}</p>}
                    <div className={styles.agreementContainer}>
                        <Form.Check
                            type="checkbox"
                            {...register("agreement", {
                                required: "Please agree to the terms and conditions",
                            })}
                        />
                        <label>
                            I have read and agree to the{" "}
                            <a href="/terms-and-conditions" target="_blank">Terms and Conditions</a> & acknowledge the{" "}
                            <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                        </label>
                    </div>
                    {errors.agreement && <p id={styles['error-box-agreement']} className={styles['error-box']}>{errors.agreement.message}</p>}
                    <div className={styles['recaptcha-container']}>
                        <Controller name="recaptcha" rules={{ required: "Please complete the reCAPTCHA" }} control={control}
                            render={({ field }) =>
                                <ReCAPTCHA sitekey={NX_RECAPTCHA_SITE_KEY} onChange={field.onChange} ref={captchaRef} />}/>
                            
                    </div>
                    {errors.recaptcha && <p className={styles['error-box']}>{errors.recaptcha.message}</p>}
                    <button className={styles.signUpSubmit} type="submit">Sign Up</button>
                    {isSubmitted && Object.keys(errors).length !== 0 && <p className={styles['error-box']}>Error: please fill out all fields in this form and try again</p>}
                </form>
                <div className={styles.loginLink}>
                    <a href="/login">Already registered? Login to your account</a>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SignupForm;
