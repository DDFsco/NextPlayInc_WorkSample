import React from 'react';
import styles from './LoginHeaderFB.module.css';
import logo from '../../assets/images/baseball-logo.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import letterLogo from '../../assets/images/baseball-logo-letter.png';
import userLogo from '../../assets/images/user-logo.svg';
import notificationBell from '../../assets/images/active-notification.png';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const username = localStorage.getItem('name');
  console.log(location);

    const handleDepositClick = () => { 
        alert('TODO: ImplementDeposit Clicked');
    }

  if (username) {
    return (
      <div className={styles.container}>
        <div className={styles.webHeader}>
          <div className={styles.logoContainer}>
            <img src={logo} width={66} height={66} alt="logo" />
            <img src={letterLogo} width={168} height={38} alt="letter-logo" />
          </div>
          <div className={styles.mainOptionsContainer}>
            <div className={styles.rowOne}>
              <div className={[styles.activeUrl, styles.linkOption].join(' ')}>
                <p>DAILY FANTASY</p>
              </div>
              <div className={styles.endOptionsContainer}>
                <div
                  className={styles.optionContainer}
                  style={{ borderLeft: 'none' }}
                >
                  <p className={styles.italicAd}>
                    Refer a Friend, each of you gets $10!
                  </p>
                </div>
                <div className={styles.optionContainer}>
                  <img
                    src={userLogo}
                    width={'20px'}
                    height={'20'}
                    alt="user-logo"
                  />
                  <p className={styles.userText}>{username}</p>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#ECCF37"
                    className="size-6"
                    width={18}
                    style={{ marginLeft: '20px' }}
                    height={18}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                <div className={styles.optionContainer}>
                  <img
                    src={notificationBell}
                    width={22}
                    height={22}
                    alt="notification-bell"
                  />
                </div>
              </div>
            </div>
            <div className={styles.rowTwo}>
              <div className={styles.optionRow}>
                <div
                  className={[styles.activeUrl, styles.linkOption].join(' ')}
                >
                  <p>Lobby</p>
                </div>
                <div className={[styles.linkOption].join(' ')}>
                  <p>My Contests</p>
                </div>
              </div>
              <div className={styles.endOptionsContainer}>
                <div
                  className={[
                    styles.optionContainer,
                    styles.twoStackOptions,
                  ].join(' ')}
                  style={{ borderLeft: 'none' }}
                >
                  <p>ACCOUNT BALANCE</p>
                  <div className={styles.row}>
                    <p
                      style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}
                    >
                      $ 0.00
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="size-6"
                      width={10}
                      height={10}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className={[
                    styles.optionContainer,
                    styles.twoStackOptions,
                  ].join(' ')}
                >
                  <p>CONTEST CREDITS</p>
                  <div className={styles.row}>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontWeight: 600,
                      }}
                    >
                      $ 0.00
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="size-6"
                      width={10}
                      height={10}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className={styles.optionContainer}>
                  <button className={styles.depositButton} onClick={handleDepositClick}>DEPOSIT +</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (location === '/mycontestfb') {
    return (
        <div className={styles.container}>
        <div className={styles.webHeader}>
          <div className={styles.logoContainer}>
            <img src={logo} width={66} height={66} alt="logo" />
            <img src={letterLogo} width={168} height={38} alt="letter-logo" />
          </div>
          <div className={styles.mainOptionsContainer}>
            <div className={styles.rowOne}>
              <div className={[styles.activeUrl, styles.linkOption].join(' ')}>
                <p>DAILY FANTASY</p>
              </div>
              <div className={styles.endOptionsContainer}>
                <div
                  className={styles.optionContainer}
                  style={{ borderLeft: 'none' }}
                >
                  <p className={styles.italicAd}>
                    Refer a Friend, each of you gets $10!
                  </p>
                </div>
                <div className={styles.optionContainer}>
                <button className={styles.signUpButton} onClick={() => { navigate("/login") }}><p>Login</p></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
        <div className={styles.container}>
        <div className={styles.webHeader}>
          <div className={styles.logoContainer}>
            <img src={logo} width={66} height={66} alt="logo" />
            <img src={letterLogo} width={168} height={38} alt="letter-logo" />
          </div>
          <div className={styles.mainOptionsContainer}>
            <div className={styles.rowOne}>
              <div className={[styles.activeUrl, styles.linkOption].join(' ')}>
                <p>DAILY FANTASY</p>
              </div>
              <div className={styles.endOptionsContainer}>
                <div
                  className={styles.optionContainer}
                  style={{ borderLeft: 'none' }}
                >
                  <p className={styles.italicAd}>
                    Refer a Friend, each of you gets $10!
                  </p>
                </div>
                <div className={styles.optionContainer}>
                <button className={styles.signUpButton} onClick={() => { navigate("/signup") }}><p>Sign Up</p></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;