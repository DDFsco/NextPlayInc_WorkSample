import { FunctionComponent, useCallback } from 'react';
import styles from './ReferFriendTC.module.css';
import nextPlayLogo from '../../assets/logos/baseball_logo.png';
import nextPlayText from '../../assets/logos/next_play_logo_letter.png';
import { useNavigate } from 'react-router-dom'; 
import Header from '../../components/LoginHeader/LoginHeader';
import LoginFooter from '../../components/LoginFooter/LoginFooter';
 

const ReferFriendTC: FunctionComponent = () => {
  const navigate = useNavigate();


  return (
    <div className={styles.referFriendtc}>
      <Header/>
      <div className={styles.mainFrame}>
        <div className={styles.tableOfContents}>
          <div className={styles.header}>
            <h1>“Refer a Friend” Terms and Conditions</h1>
            <p>(Last Update: June 12, 2024)</p>
          </div>
          <ol>
            <li><a href="#about">1. About the program</a></li>
            <li><a href="#eligibility">2. Eligibility</a></li>
            <li><a href="#rewards">3. Rewards for Qualified Reward Referrals who created an account on or after July 1, 2024</a></li>
            <li><a href="#distribution">4. Distribution of Commissions and Rewards</a></li>
            <li><a href="#additional">5. Additional Terms Applicable to All Referrals</a></li>
          </ol>
        </div>
        <div className={styles.content}>
          <section id="about">
            <h2>1. About the program</h2>
            <p>
              The Next Play referral program allows all Next Play players to financially participate and benefit in the growth of the site by receiving rewards for players they refer to Next Play. From time to time, Next Play makes changes to this program. Next Play reserves the right to make changes to the referral program (including terminating the program entirely) in the future. Next Play will always post the current Terms and Conditions in the referral center, and will notify participants in the referral program about changes to the program in advance of implementing those changes.
            </p>
          </section>
          <section id="eligibility">
            <h2>2. Eligibility</h2>
            <p>
              All registered Next Play players are eligible for the Referral Program, except in cases where an account has been suspended from Next Play or from participation in the referral program.
            </p>
          </section>
          <section id="rewards">
            <h2>3. Rewards for Qualified Reward Referrals who created an account on or after July 1, 2024</h2>
            <ul>
              <li>
                Next Play users who refer a Qualifying Reward Referral (as defined below) will receive ten dollars ($10) to use for play in Next Play contests for each Qualifying Reward Referral (as defined below) supplied. In addition, each Qualifying Reward Referral will receive ten dollars ($10) to use for play in Next Play contests. Next Play users are limited to five (5) Qualified Reward Referrals per month. The rewards are intended for use in Next Play contests. Users must play through rewards before withdrawal. Rewards will expire 14 days from issue date and any unused bonus may be removed from your account. Both the referring Next Play user and the Qualified Reward Referral must have “Live” accounts at the time of Reward Bonus.
              </li>
              <li>
                Qualifying Reward Referral - A Qualified Reward Referral is a person, other than the referrer, who is new to Next Play and creates a Next Play account on or after July 1, 2024 by clicking the referring user's unique promotional referral link, successfully verifies their identity, and plays through $5 within 30 days of registration date.
              </li>
            </ul>
          </section>
          <section id="distribution">
            <h2>4. Distribution of Commissions and Rewards</h2>
            <p>
              Determination of whether a Next Play user successfully obtained any Qualifying Referrals, and the distribution of awards will occur at least once per month, generally within ten days of the end of each month. Payment will be made directly into the user's Next Play account.
            </p>
          </section>
          <section id="additional">
            <h2>5. Additional Terms Applicable to All Referrals</h2>
            <ul>
              <li>
                <strong>Tracking Referrals:</strong> Referral bonus amount to be credited will be based on the values set forth by the live Next Play referral program at the time of the Qualifying Reward Referral's registration date. Referrals will only be credited if they create a Next Play account after clicking on a referral link. Referral links are available in the Next Play Referral Center, and can be provided via an email generated from the Referral Center, shared via Facebook or Twitter from the Referral Center, or via a system generated challenge link for a specific contest. If a player signs up without using a referral link, we will not be able to manually credit a user for the referral.
              </li>
              <li>
                <strong>Disqualifications:</strong> Users will not receive credit for referring themselves, or any member of their immediate family or household. Qualifying Referrals cannot have an existing Next Play account. An account established for the primary purpose of collecting referral fees will not receive credit for referrals. Payment and withdrawal information may be reviewed in order to ensure that the referrer is not funding the referred in order to take advantage of the referral program. Referrals determined not to follow these rules may have payments suspended at any time. Commissions earned from referred players who have not followed program rules may be retroactively removed from user accounts, and user's violating program rules may face suspension from the Next Play referral program. If one of your referrals is deemed (through the use of a promo code or other tracking) to have been introduced to Next Play via another source, we will not pay referral fees to you for that user. All referrals and accounts are subject to review. Next Play reserves the right, in its sole discretion, to suspend or disqualify an account from the referral program or nullify the payment of certain referral credits if it determines such referrals to be inconsistent with the proper spirit of the Next Play Referral Program.
              </li>
              <li>
                <strong>Taxes:</strong> You are responsible for paying any sales, use or other taxes related to any commissions awarded to you in connection with the Referral Program. Next Play reserves the right to withhold taxes from commissions, as appropriate.
              </li>
              <li>
                <strong>Marketing:</strong> All marketing activities conducted as part of your recruiting efforts for the Next Play referral program must meet the following requirements:
                <ol>
                  <li>Follow all applicable laws.</li>
                  <li>Do not use any incentivized marketing that provides potential referrals financial incentives to sign up with you, beyond those that are standard parts of the Next Play Referral Program.</li>
                  <li>Do not engage in spamming activities via email, facsimile, social media sites such as Facebook and Twitter, or any other means. Engaging in such activities may result (at Next Play's discretion) in non-payment of commissions.</li>
                  <li>Do not recruit or use recruiting materials that in any way promote inappropriate content (such as that promoting violence, discrimination, or lewd or pornographic material) or that use deceptive, unethical or illegal means of soliciting referrals.</li>
                  <li>Do not engage in unauthorized use of any third-party trademarks or other third party intellectual property in your recruiting activities.</li>
                  <li>Do not use paid advertising to promote your referral link. If you want to become involved in paid promotion for the site please apply to join our affiliate program.</li>
                </ol>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <LoginFooter/>
    </div>
  );
};

export default ReferFriendTC;
