import React from 'react';
import styles from './CardGame.module.css';
import stylesMobile from './CardGameMobile.module.css';
import nextPlayLogo from '../../assets/logos/next_play_logo_letter.png';
import baseballLogo from '../../assets/logos/baseball_logo.png';
import footballCardGameImage from '../../assets/images/card_game.png';
import amazonIcon from '../../assets/images/amazon_icon.png';
import { useNavigate } from 'react-router-dom'; 
import Header from '../../components/LoginHeader/LoginHeader';
import LoginFooter from '../../components/LoginFooter/LoginFooter';

const CardGame: React.FC = () => {
  const navigate = useNavigate();
  let width = window.screen.width;

  if(width>500)
  return (
    <div className={styles.cardGame}>
      <Header>
          <div className={styles.headerTitle}>Next Play Football Edition</div>
          <div className={styles.headerSubtitle}>Card Game</div>
        </Header>
        
        <main className={styles.mainFrame}>
          <img className={styles.cardGameImage} alt="Card Game" src={footballCardGameImage} />
          <div className={styles.description}>
            <h2>Next Play Football Edition Card Game</h2>
            <p>
              <a href="https://www.amazon.com/dp/B07GDC86HN" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' ,  color: '#005982'}}>
                <i>Next Play Football Edition</i>
              </a> is a card game you play while watching a football game on TV.
              The player with the most points at the end of the game is the winner. You earn points if you win the
              <i> "Live Zone."</i>
            </p>
            <p>
            Perfect for kids & adults, 2-6 players, ages 7+. The game is easy to learn, good for groups, and a fun strategic way to complement your football game.
            </p>
            <a className={styles.shopButton} onClick={() => window.open("https://www.amazon.com/dp/B07GDC86HN", 'toolbar=no,resizable=yes,location=no,menubar=yes')}>
              <img className={styles.amazonIcon} alt="Amazon Icon" src={amazonIcon} />
              <div className={styles.amazonText}>
                <span className={styles.shop}>Shop on </span>
                <br /><br />
                <span className={styles.amazon}>Amazon</span>
              </div>
            </a>
          </div>
        </main>
        <LoginFooter/>
      </div>
    );
  else
    return (
      <div>
        <Header/>
        <div className={stylesMobile.contents}>
          <div className={stylesMobile.header}>Next Play Football Edition Card Game</div>
          <img className={stylesMobile.cardGameImage} alt="Card Game" src={footballCardGameImage} />
          <div className={stylesMobile.text}>
            <a href="https://www.amazon.com/dp/B07GDC86HN" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
              <i>Next Play Football Edition</i>
            </a> is a card game you play while watching a football game on TV.
            The player with the most points at the end of the game is the winner. You earn points if you win the
            <i> "Live Zone."</i>
            <br/><br/>
            The play in the football game determines the winner(s) of the <i>“Live Zone.”</i> The game is easy to learn, good for groups, and a fun strategic way to complement your football game.
          </div>
          <button className={stylesMobile.shopButton} onClick={() => window.open("https://www.amazon.com/dp/B07GDC86HN")}>
            <img className={stylesMobile.amazonLogo} alt="Amazon Icon" src={amazonIcon} />
            <span className={stylesMobile.shopOn}>Shop on Amazon</span>
          </button>
        </div>
        <LoginFooter/>
      </div>
    );
};

export default CardGame;
