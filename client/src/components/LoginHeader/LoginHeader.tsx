import React, { useEffect } from 'react';
import styles from './LoginHeader.module.css';
import stylesMobile from './LoginHeaderMobile.module.css';
import logo from '../../assets/logos/next_play_logo_letter.png';
import baseballLogo from '../../assets/logos/next_play_gold.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faAngleDown, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import ProfilePic from '../../assets/images/DefaultProfilePic.png';
import mobileMenu from '../../assets/images/mobile_menu_icon.png';
import path from 'path';
import LobbyDropdownMenu from '../LobbyDropdownMenu/LobbyDropdownMenu';
import LobbyPopup18 from '../LobbyPopUp18/Popup18';
import LobbyPopup19 from '../LobbyPopUp19/Popup19';
import NotificationsPopUp from '../NotificationsPopUp/NotificationsPopUp';
import { useAuth } from '../../context/authProvider';
import { getNotifs, getProfileInfo, getTrophies } from '@client/utils';
import { useNotifications } from '../../context/NotificationsContext';

let username = localStorage.getItem("name");
let token = localStorage.getItem("token");
let currentPath="";
const Header = ({ children } = null) => {
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const [user_id, setUserId] = useState(localStorage.getItem("id"));
    const [hover,setHover]=React.useState(false);
    const [startHover,setStartHover]=React.useState(false);
    const [openProfile, setOpenProfile] = React.useState(false);
    const [openNotifsPopup, setNotifsPopup] = React.useState(false);
    const [trophiesTotal, setTrophiesTotal] = React.useState(0);
    const [trophiesFirst, setTrophiesFirst] = React.useState(0);
    const [profile, setProfile] = React.useState("");
    const dropdownRef = useRef(null);
    const dropdownRef_2 = useRef(null);
    const dropdownRef_3 = useRef(null);
    const profileRef = useRef(null);
    const notifsPopupRef = useRef(null);
    const bellIconRef = useRef(null);
    const { notifications, fetchNotifications } = useNotifications();
    setTimeout(()=>{setStartHover(true)},1);
    const [width,setWidth] = React.useState(window.screen.width);

    //Makes sure that the header doesn't change will loading the contest lobby when the user first signs up
    if(currentPath=="" || path != currentPath || path!="/signup")
    {
        username = localStorage.getItem("name");
        token = localStorage.getItem("token");
        currentPath=path;
    }

  useEffect(() => {
    window.addEventListener ('resize', () => {setWidth(window.screen.width)});
    window.removeEventListener ('resize', () => {setWidth(window.screen.width)});
}, []);

    useEffect(() => {
        const handler = (event) => {
            // Close the dropdown if the user clicks outside of dropdown or dropdown icon
            if (dropdownRef.current && !dropdownRef_3.current.contains(event.target) && !dropdownRef_2.current.contains(event.target) && !dropdownRef.current.contains(event.target) && !profileRef.current.contains(event.target)) {
                setOpenProfile(false);

            }
            if (notifsPopupRef.current && !notifsPopupRef.current.contains(event.target) &&
                bellIconRef.current && !bellIconRef.current.contains(event.target)) {
                setNotifsPopup(false);
            }
        };

        document.addEventListener("mouseup", handler);

        return () => {
            document.removeEventListener("mouseup", handler);
        };
    }, []);

    
    

    useEffect(() => {
        setUserId(localStorage.getItem("id"));
        const fetchData = async () => {
            try {
                if (user_id) {
                    let temp = await getTrophies(user_id, token);
                    setTrophiesTotal(parseInt(temp[0]));
                    setTrophiesFirst(parseInt(temp[1]));


                    await fetchNotifications(user_id);
                }
                getProfileInfo(localStorage.getItem('token')).then((resp) => {
                    setProfile(resp.data.message?.profile_picture_url ?? "");
                }, (error) => {
                    //console.log(error);
                });

            } catch { }
        };
        fetchData();
        return () => { };
    }, [user_id]);

    //console.log(path);
    //const dollarsString:string= "$"+new Intl.NumberFormat('en-us',{maximumFractionDigits:2,minimumFractionDigits:2}).format(dollars);
    //const creditsString:string= "$"+new Intl.NumberFormat('en-us',{maximumFractionDigits:2,minimumFractionDigits:2}).format(credits);

    let pathsAndTitles = new Map<String, String>();
    // If your page needs a blank header, one with just the logo in the top left, add it to the list here
    // Add blank headers here as necessary with title, any additional changes should be done by other components
    //
    //                   Your page's           Your Page's 
    //                  vvv Path vvv  ,      vvv Title vvv
    pathsAndTitles.set("/refer-friend", "Invite Friends. Compete for Trophies");
    pathsAndTitles.set("/responsible-gaming", "");
    pathsAndTitles.set("/communication-preferences", "Account");
    pathsAndTitles.set("/withdrawal", "Secure Withdrawal");
    pathsAndTitles.set("/withdrawal-FAQ", "");
    pathsAndTitles.set("/personal-information", "Account");
    pathsAndTitles.set('/responsible-gaming2', "");
    pathsAndTitles.set('/about', "");
    pathsAndTitles.set('/privacy-policy', "");
    pathsAndTitles.set("/financial-center/balances", "Account");
    pathsAndTitles.set("/financial-center/transaction-history", "Account");
    pathsAndTitles.set("/financial-center/taxes", "Account");
    pathsAndTitles.set("/financial-center/deposit-methods", "Account");
    pathsAndTitles.set("/customer-support", "");
    pathsAndTitles.set("/contact-us", "");
    pathsAndTitles.set("/financial-center/taxes-faq/faq1", "");
    pathsAndTitles.set("/financial-center/taxes-faq/faq2", "");
    pathsAndTitles.set("/login-security/login-security-menu", "Account");
    pathsAndTitles.set("/login-security/change-email", "Account");
    pathsAndTitles.set("/login-security/update-password", "Account");
    pathsAndTitles.set("/terms-and-conditions", "");
    pathsAndTitles.set("/about", "About Next Play Games");
    pathsAndTitles.set("/refer-friend-tc", "");
    pathsAndTitles.set("/card-game", "");
    pathsAndTitles.set("/rules-and-scoring-MLB-classic", "");
    pathsAndTitles.set("/rules-and-scoring-MLB-single", "");
    pathsAndTitles.set("/rules-and-scoring-NFL-classic", "");
    pathsAndTitles.set("/rules-and-scoring-NFL-single", "");

    let blankMobileHeaders = new Set<String>();

    //mobile screen still needs functionality
    if (width > 480) {

    if (pathsAndTitles.has(path))
        return (
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    {username && <a href="/contest-lobby" className={styles.icongraphy}><img src={baseballLogo} alt="Baseball" className={styles.trophy} /></a>}
                    {username && <a href="/contest-lobby" className={styles.icongraphy}><img src={logo} alt="Next Play Fantasy" className={styles.logo} /></a>}
                    {!username && <a href="/landing" className={styles.icongraphy}><img src={baseballLogo} alt="Baseball" className={styles.trophy} /></a>}
                    {!username && <a href="/landing" className={styles.icongraphy}><img src={logo} alt="Next Play Fantasy" className={styles.logo} /></a>}
                </div>
                {children == null && <span className={styles.title} >{pathsAndTitles.get(path)}</span>}
                {children != null && <div className={styles.title} >{children}</div>}
            </header>
        );

        if (username) {
            return (
                <header className={styles.header}>
                    <div className={styles.logoContainer}>

                    <a href="/contest-lobby" className={styles.icongraphy}><img src={baseballLogo} alt="Baseball" className={styles.trophy} /></a>
                    <a href="/contest-lobby" className={styles.icongraphy}><img src={logo} alt="Next Play Fantasy" className={styles.logo} /></a>
                </div>
                <div className={styles.divideRows}>
                    <div className={styles.topRow}>
                        <span className={styles.dailyFantasyBorder}>DAILY FANTASY</span>
                        <div className={styles.loginInfo}>
                            <a href="/refer-friend" className={styles.referralLinkCentered}>Invite a Friend!</a>
                            {profile === "" && <img src={ProfilePic} ref={dropdownRef_3} className={styles.profilePic} onClick={() => setOpenProfile((prev) => !prev)} />}
                            {profile !== "" && <img src={profile} ref={dropdownRef_3} className={styles.profilePic}  onClick={() => setOpenProfile((prev) => !prev)} />}
                            <span className={styles.username} ref={dropdownRef_2} onClick={() => setOpenProfile((prev) => !prev)}>{username}</span>
                            <FontAwesomeIcon icon={faAngleDown} className={styles.downIcon} ref={dropdownRef} onClick={() => setOpenProfile((prev) => !prev)} />
                            {/*<FontAwesomeIcon icon={faBell} className={styles.bellIcon} ref={bellIconRef} onClick={() => setNotifsPopup((prev) => !prev)} />*/}
                            {/*notifications.length > 0 && <div className={styles.numNotifications}>{notifications.length}</div>*/}
                        </div>
                    </div>
                    <div className={styles.bottomRow}>
                        <div className={styles.nav}>
                            <span
                                className={path === '/contest-lobby' ? styles.onNavPage : styles.navItem}
                                style={{width:"3.125vw"}}
                                onClick={() => { navigate('/contest-lobby') }}>
                                Lobby
                            </span>
                            <span
                                className={path.startsWith("/my-contests") ? styles.onNavPage : styles.navItem}
                                style={{width:"6.45833vw"}}
                                onClick={path.startsWith("/my-contests")? () => navigate(path):() => { navigate('/my-contests/upcoming') }}>
                                My Contests
                            </span>

                            </div>
                            <div className={styles.money}>
                                <div className={styles.creditInfo}>
                                    <span className={styles.creditType}>1ST PLACE TROPHIES</span>
                                    <div className={styles.creditAmount}>
                                        <span className={styles.dollar}>{trophiesFirst}</span>
                                        <div className={styles.infoIconContainer}>
                                            <FontAwesomeIcon icon={faCircleInfo} className={styles.infoIcon} />
                                            <div className={styles.popup}><LobbyPopup19 /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.creditInfo}>
                                    <span className={styles.creditType}>TOTAL TROPHIES</span>
                                    <div className={styles.creditAmount}>
                                        <span className={styles.credit}>{trophiesTotal}</span>
                                        <div className={styles.infoIconContainer}>
                                            <FontAwesomeIcon icon={faCircleInfo} className={styles.infoIcon} />
                                            <div className={styles.popup}><LobbyPopup18 /></div>
                                        </div>
                                    </div>
                                </div>
                                <button className={styles.depositButton} onClick={() => { navigate("/leaderboard") }}>
                                    LEADERBOARD
                                    <FontAwesomeIcon icon={faAngleDown} className={styles.rightIcon} onClick={(event) => setOpenProfile((prev) => !prev)} />
                                </button>  {/* UPDATE */}

                        </div>
                        <div className='profile' ref={profileRef}>
                            {openProfile && <LobbyDropdownMenu />}
                        </div>
                        <div style={{ zIndex: 3 }} ref={notifsPopupRef}>
                            {openNotifsPopup && <NotificationsPopUp />}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <a href="/landing" className={styles.icongraphy}><img src={baseballLogo} alt="Baseball" className={styles.trophy} onClick={() => { navigate("/landing") }} /></a>
                <a href="/landing" className={styles.icongraphy}><img src={logo} alt="Next Play Fantasy" className={styles.logo} onClick={() => { navigate("/landing") }} /></a>
            </div>
            <div className={styles.divideRows}>
                <div className={styles.topRow}>
                    <span className={styles.dailyFantasy}>DAILY FANTASY</span>
                    <div className={styles.loginInfo}>
                        <a href="/refer-friend" className={styles.referralLink} >Invite a Friend!</a>
                        <button className={hover?styles.signUpButton:styles.signUpButtonNoHover } 
                            onClick={() => { navigate((path == "/signup" || path == "/landing")?"/login":"/signup") }}
                            onMouseOut={()=>{if(!hover) setHover(true)}}
                            onMouseEnter={()=>{if(!hover && startHover) setHover(true)}}>
                            {(path == "/signup" || path == "/landing"|| path=='/' || path=='' || path==null)?"Login":"Sign up"}
                        </button>
                        <div className={styles.notificationsGap} />
                    </div>
                </div>
                <div className={styles.bottomRow}>
                    <div className={styles.nav}>
                        <span className={styles.myContests}></span>
                    </div>
                </div>
            </div>
        </header>
    );
    }
    else
    {
        if(!username)
        {
            return (
                <header className={stylesMobile.header}>
                    <div className={stylesMobile.topRow}>
                        <a href={username?"/contest-lobby":"/landing"}><img src={baseballLogo} alt="Baseball" className={stylesMobile.trophy} /></a>
                        <a href={username?"/contest-lobby":"/landing"}><img src={logo} alt="Next Play Fantasy" className={stylesMobile.logo} /></a>
                        {(path=='/landing' || path=='/' || path=='' || path==null) && <button className={stylesMobile.loginButton} onClick={() => { navigate("/login") }}>Login</button>}
                    </div>
                </header>
            );
        }
        if(path=="/contest-lobby" || path.startsWith("/my-contests") || path=="/leaderboard")
            return (
                <header className={stylesMobile.header}>
                    <div className={stylesMobile.topRow}>
                        <img src={mobileMenu} alt="Menu" className={stylesMobile.menu} onClick={()=>{navigate('/user-profile')}}/>
                        <a href={username?"/contest-lobby":"/landing"}><img src={baseballLogo} alt="Baseball" className={stylesMobile.trophy} /></a>
                        <a href={username?"/contest-lobby":"/landing"}><img src={logo} alt="Next Play Fantasy" className={stylesMobile.logo} /></a>

                        {/*<FontAwesomeIcon icon={faBell} ref={bellIconRef} className={stylesMobile.bell} onClick={() => {console.log("Bell icon clicked"); navigate('/notifications')}} />*/}
                        {/*notifications.length > 0 && <div className={stylesMobile.numNotifications}>{notifications.length}</div>*/}
                    </div>
                    <div className={stylesMobile.nav}>
                        <div className={stylesMobile.navItem}>
                            <div style={{width:"10vw"}} className={path === '/contest-lobby' ? stylesMobile.onNavPage : stylesMobile.navItemText} onClick={() => { navigate('/contest-lobby') }}>
                                Lobby
                            </div>
                        </div>
                        <div className={stylesMobile.navItem}>
                            <div style={{width:"20vw"}} className={path.startsWith("/my-contests") ? stylesMobile.onNavPage : stylesMobile.navItemText} onClick={() => { navigate('/my-contests/upcoming') }}>
                                My Contests
                            </div>
                        </div>
                        <div className={stylesMobile.navItem}>
                            <div style={{width:"20vw"}} className={path === '/leaderboard' ? stylesMobile.onNavPage : stylesMobile.navItemText} onClick={() => { navigate('/leaderboard') }}>
                                Leaderboard
                            </div>
                        </div>
                </div>
                </header>
            );

        if (pathsAndTitles.has(path))
            return (
                <header className={stylesMobile.header}>
                    <div className={stylesMobile.topRow}>
                        <a href={username ? "/contest-lobby" : "/landing"}><img src={baseballLogo} alt="Baseball" className={stylesMobile.trophy} /></a>
                        <a href={username ? "/contest-lobby" : "/landing"}><img src={logo} alt="Next Play Fantasy" className={stylesMobile.logo} /></a>
                    </div>
                </header>
            );
        return (
            <header className={stylesMobile.header}>
                <div className={stylesMobile.topRow}>
                    <img src={mobileMenu} alt="Menu" className={stylesMobile.menu} onClick={()=>{navigate('/user-profile')}}/>
                    <a href={username?"/contest-lobby":"/landing"}><img src={baseballLogo} alt="Baseball" className={stylesMobile.trophy} /></a>
                    <a href={username?"/contest-lobby":"/landing"}><img src={logo} alt="Next Play Fantasy" className={stylesMobile.logo} /></a>
                    {/*<FontAwesomeIcon icon={faBell} ref={bellIconRef} className={stylesMobile.bell} style={{ zIndex: 5 }} onClick={() => {console.log("Bell icon clicked"); navigate('/notifications')}} />*/}
                    {/* notifications.length > 0 && <div className={stylesMobile.numNotifications}>{notifications.length}</div> */}
                </div>
            </header>
        );

    }

}


export default Header;
