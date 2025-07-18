import React from 'react';
import styles from './LobbyDropdownMenu.module.css';
import { Navigate , useNavigate, redirect, NavigateFunction} from "react-router-dom";
import { Signout } from "@client/utils";

const LobbyDropdownMenu = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.dropDownProfile}>
            <ul className={styles.dropDownContent}>
                <li>
                    <a href="/personal-information">Account Information</a>
                </li>
                <li>
                    <a href="rules-and-scoring-NFL-classic">Rules & Scoring</a>
                </li>
                <li>
                    <a href="/refer-friend">Invite a Friend</a>
                </li>
                <li>
                    <a href="/contact-us">Contact Us</a>
                </li>
                <li>
                    <a onClick={()=>Signout(navigate)}>Sign Out</a>
                </li>
            </ul>
        </div>
    );
};

export default LobbyDropdownMenu;
