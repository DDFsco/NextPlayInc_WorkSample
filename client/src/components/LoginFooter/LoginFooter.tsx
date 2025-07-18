import React, { useEffect } from "react";
import styles from './LoginFooter.module.css';
import stylesMobile from './LoginFooterMobile.module.css';
import flag from '../../assets/icon/flag.png';
import facebook from '../../assets/icon/facebook.png';
import twitter from '../../assets/icon/twitter.png';
import instagram from '../../assets/icon/instagram.png';
import tiktok from '../../assets/icon/tiktok.png'
import youtube from '../../assets/icon/youtube.png';
import { useNavigate } from "react-router-dom";

const LoginFooter = () => {
  const navigate=useNavigate();
  const username = localStorage.getItem("name");


  const [width,setWidth] = React.useState(window.screen.width);

  useEffect(() => {
    window.addEventListener ('resize', () => {setWidth(window.screen.width)});
    window.removeEventListener ('resize', () => {setWidth(window.screen.width)});
}, []);

  if(width>480)
  return (
    <footer className={styles.footer}>
      <div className={styles.overlap}>

        <div className={styles.nextPlay}>Next Play Games Inc.
          <div className={styles.div}>Los Angeles, CA</div>
          <div className={styles.mediaIcon}>
            <img src={facebook} className={styles.imgFacebook} alt="Facebook" onClick={() => { window.location.assign("https://www.facebook.com/nextplaygamesco")}}/>
            <img src={twitter} className={styles.imgTwitter} alt="X" onClick={() => { window.location.assign("https://x.com/nextplaygames_")}}/>
            <img src={instagram} className={styles.imgInstagram} alt="Instagram" onClick={() => { window.location.assign("https://www.instagram.com/nextplay.games")}}/>
            <img src={tiktok} className={styles.imgTiktok} alt="Tiktok" onClick={() => { window.location.assign("https://www.tiktok.com/@nextplaycards")}}/>
            <img src={youtube} className={styles.imgYoutube} alt="Youtube"  onClick={() => { window.location.assign("https://www.youtube.com/@nextplaygamesus")}}/>
          </div>
        </div>


        <div className={styles.Company}>
          <div className={styles.textCompany}>Company</div>
          <button className={styles.links} onClick={() => {navigate("/about")}}>About Next Play</button> 
          <button className={styles.links} onClick={() => {navigate("/rules-and-scoring-NFL-classic")}}>Rules And Scoring</button>
          <button className={styles.links} onClick={() => {navigate("/careers")}}>Careers</button>
          {/* <button className={styles.links} onClick={() => {navigate("/mobile-apps")}}>Mobile Apps</button> */}
          <button className={styles.links} onClick={() => {navigate("/card-game")}}>Card Game</button>
          <button className={styles.links} onClick={() => {navigate("/refer-friend")}}>Invite a Friend</button>
          <button className={styles.links} onClick={() => {navigate("/contact-us")}}>Contact Us</button>
          <button className={styles.links} onClick={() => {navigate("/terms-and-conditions")}}>Terms Of Use</button> 
          <button className={styles.links} onClick={() => {navigate("/privacy-policy")}}>Privacy Policy</button>
          {username && <button className={styles.links} onClick={() => {navigate("/responsible-gaming")}}>Responsible Gaming</button> }
          {!username && <button className={styles.links} onClick={() => {navigate("/responsible-gaming2")}}>Responsible Gaming</button> }
        </div>

        <div className={styles.textMailAdd}>Mailing Address
          <p className={styles.textAddress}>
            3079 S Baldwin Rd. <br />
            Unit #3062
            <br />
            Lake Orion, MI 48359
          </p>
        </div>

        <div className={styles.textRequirement}>
          <span className={styles.span}><br/><br/>
            Next Play Fantasy is not a sports betting company. All of our contests cost $0 to enter.
          </span>
        </div>
      </div>




      <div className={styles.grayOverlapGroup}>
        <div className={styles.copyright}>
          <img src={flag} className={styles.imgAmericanFlag} alt="Image" />
          <p className={styles.p}>@ 2024 Next Play All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
  else
    return (
    <div className={stylesMobile.footer}>
      <div className={stylesMobile.blue}>
        <div className={stylesMobile.contents}>
          <div className={stylesMobile.nextPlay}>Next Play Games Inc. </div>
          <div className={stylesMobile.location}>Los Angeles, CA</div>
          <div className={stylesMobile.socials}>
            <img src={facebook} className={stylesMobile.imgFB} alt="Facebook" onClick={() => { window.location.assign("https://www.facebook.com/nextplaygamesco")}}/>
            <img src={twitter} className={stylesMobile.imgX} alt="X" onClick={() => { window.location.assign("https://x.com/nextplaygames_")}}/>
            <img src={instagram} className={stylesMobile.imgIG} alt="Instagram" onClick={() => { window.location.assign("https://www.instagram.com/nextplay.games")}}/>
            <img src={tiktok} className={stylesMobile.imgTT} alt="Tiktok" onClick={() => { window.location.assign("https://www.tiktok.com/@nextplaycards")}}/>
            <img src={youtube} className={stylesMobile.imgYT} alt="Youtube" onClick={() => { window.location.assign("https://www.youtube.com/@nextplaygamesus")}}/>
          </div>
          <div className={stylesMobile.info}>
            <div className={stylesMobile.nav}>
              <div className={stylesMobile.header}>Company</div>
              <button className={stylesMobile.links} onClick={() => {navigate("/about")}}>About Next Play</button> 
              <button className={stylesMobile.links} onClick={() => {navigate("/rules-and-scoring-NFL-classic")}}>Rules And Scoring</button>
              <button className={stylesMobile.links} onClick={() => {navigate("/careers")}}>Careers</button>
              {/* <button className={stylesMobile.links} onClick={() => {navigate("/mobile-apps")}}>Mobile Apps</button> */}
              <button className={stylesMobile.links} onClick={() => {navigate("/card-game")}}>Card Game</button>
              <button className={stylesMobile.links} onClick={() => {navigate("/refer-friend")}}>Invite a Friend</button>
              <button className={stylesMobile.links} onClick={() => {navigate("/contact-us")}}>Contact Us</button>
              <button className={stylesMobile.links} onClick={() => {navigate("/terms-and-conditions")}}>Terms Of Use</button> 
              <button className={stylesMobile.links} onClick={() => {navigate("/privacy-policy")}}>Privacy Policy</button>
              {username && <button className={stylesMobile.links} onClick={() => {navigate("/responsible-gaming")}}>Responsible Gaming</button> }
              {!username && <button className={stylesMobile.links} onClick={() => {navigate("/responsible-gaming2")}}>Responsible Gaming</button> }
            </div>
            <div className={stylesMobile.nav}>
              <div className={stylesMobile.header}>Mailing Address</div>
              <div className={stylesMobile.mailing}>3079 S Baldwin Rd. <br />Unit #3062<br />Lake Orion, MI 48359</div>
            </div>
          </div>
        </div>
      </div>
      <div className={stylesMobile.gray}>
        <img src={flag} className={stylesMobile.americanFlag} alt="Image" />
        <div className={stylesMobile.rights}>@ 2024 Next Play All Rights Reserved.</div>
      </div>
    </div>
    );
}

export default LoginFooter;