import { FunctionComponent } from 'react';
import styles from './TermAndConditions.module.css';
import Header from '../../components/LoginHeader/LoginHeader';
import LoginFooter from '../../components/LoginFooter/LoginFooter';

const newTerms = `
The website located at nextplayfantasy.com (the “Site”) is a copyrighted work belonging to Next Play Games 
(“Company”, “us”, “our”, and “we”). Certain features of the Site may be subject to additional guidelines, terms, or 
rules, which will be posted on the Site in connection with such features. All such additional terms, guidelines, and 
rules are incorporated by reference into these Terms. <br /><br />

<b>THESE TERMS OF USE (THESE “TERMS”) SET FORTH THE LEGALLY BINDING TERMS AND 
CONDITIONS THAT GOVERN YOUR USE OF THE SITE. BY ACCESSING OR USING THE SITE, YOU 
ARE ACCEPTING THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU 
REPRESENT), AND YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, 
AND CAPACITY TO ENTER INTO THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY THAT 
YOU REPRESENT). YOU MAY NOT ACCESS OR USE THE SITE OR ACCEPT THE TERMS IF YOU ARE 
NOT AT LEAST 18 YEARS OLD. IF YOU DO NOT AGREE WITH ALL OF THE PROVISIONS OF THESE 
TERMS, DO NOT ACCESS AND/OR USE THE SITE.</b><br /><br />

<b>PLEASE BE AWARE THAT SECTION 10.2 CONTAINS PROVISIONS GOVERNING HOW TO 
RESOLVE DISPUTES BETWEEN YOU AND COMPANY. AMONG OTHER THINGS, SECTION 10.2 
INCLUDES AN AGREEMENT TO ARBITRATE WHICH REQUIRES, WITH LIMITED EXCEPTIONS, 
THAT ALL DISPUTES BETWEEN YOU AND US SHALL BE RESOLVED BY BINDING AND FINAL 
ARBITRATION. SECTION 10.2 ALSO CONTAINS A CLASS ACTION AND JURY TRIAL WAIVER.  
PLEASE READ SECTION 10.2 CAREFULLY.</b><br /><br />

<b>UNLESS YOU OPT OUT OF THE AGREEMENT TO ARBITRATE WITHIN 30 DAYS:</b><br />
(1) YOU WILL ONLY BE PERMITTED TO PURSUE DISPUTES OR CLAIMS AND SEEK RELIEF AGAINST US ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION; AND <br />
(2) YOU ARE WAIVING YOUR RIGHT TO PURSUE DISPUTES OR CLAIMS AND SEEK RELIEF IN A COURT OF LAW AND TO HAVE A JURY TRIAL.<br /><br />

<b>1. ACCOUNTS</b><br />
<b>1.1 Account Creation.</b> In order to use certain features of the Site, you must register for an account 
(“Account”) and provide certain information about yourself as prompted by the account registration form. You 
represent and warrant that: (a) all required registration information you submit is truthful and accurate; (b) you will 
maintain the accuracy of such information. You may delete your Account at any time, for any reason, by following 
the instructions on the Site. Company may suspend or terminate your Account in accordance with Section 8. <br /><br />

<b>1.2 Account Responsibilities.</b> You are responsible for maintaining the confidentiality of your 
Account login information and are fully responsible for all activities that occur under your Account. You agree to 
immediately notify Company of any unauthorized use, or suspected unauthorized use of your Account or any other 
breach of security. Company cannot and will not be liable for any loss or damage arising from your failure to 
comply with the above requirements.<br /><br />

<b>2. ACCESS TO THE SITE</b><br />
<b>2.1 License.</b> Subject to these Terms, Company grants you a non-transferable, non-exclusive, 
revocable, limited license to use and access the Site solely for your own personal, noncommercial use. <br /><br />

<b>2.2 Certain Restrictions.</b> The rights granted to you in these Terms are subject to the following 
restrictions: (a) you shall not license, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially 
exploit the Site, whether in whole or in part, or any content displayed on the Site; (b) you shall not modify, make 
derivative works of, disassemble, reverse compile or reverse engineer any part of the Site; (c) you shall not access 
the Site in order to build a similar or competitive website, product, or service; and (d) except as expressly stated 
herein, no part of the Site may be copied, reproduced, distributed, republished, downloaded, displayed, posted or 
transmitted in any form or by any means. Unless otherwise indicated, any future release, update, or other addition to 
functionality of the Site shall be subject to these Terms. All copyright and other proprietary notices on the Site (or 
on any content displayed on the Site) must be retained on all copies thereof.<br /><br />

<b>2.3 Modification.</b> Company reserves the right, at any time, to modify, suspend, or discontinue the 
Site (in whole or in part) with or without notice to you. You agree that Company will not be liable to you or to any 
third party for any modification, suspension, or discontinuation of the Site or any part thereof.<br /><br />

<b>2.4 No Support or Maintenance.</b> You acknowledge and agree that Company will have no obligation 
to provide you with any support or maintenance in connection with the Site.<br /><br />

<b>2.5 Ownership.</b> Excluding any User Content that you may provide (defined below), you 
acknowledge that all the intellectual property rights, including copyrights, patents, trade marks, and trade secrets, in 
the Site and its content are owned by Company or Company’s suppliers. Neither these Terms (nor your access to 
the Site) transfers to you or any third party any rights, title or interest in or to such intellectual property rights, except 
for the limited access rights expressly set forth in Section 2.1. Company and its suppliers reserve all rights not 
granted in these Terms. There are no implied licenses granted under these Terms.<br /><br />

<b>2.6 Feedback.</b> If you provide Company with any feedback or suggestions regarding the Site 
(“Feedback”), you hereby assign to Company all rights in such Feedback and agree that Company shall have the 
right to use and fully exploit such Feedback and related information in any manner it deems appropriate. Company 
will treat any Feedback you provide to Company as non-confidential and non-proprietary. You agree that you will 
not submit to Company any information or ideas that you consider to be confidential or proprietary.<br /><br />

<b>3. USER CONTENT</b><br />
<b>3.1 User Content.</b> “User Content” means any and all information and content that a user submits to, 
or uses with, the Site (e.g., content in the user’s profile or postings). You are solely responsible for your User 
Content. You assume all risks associated with use of your User Content, including any reliance on its accuracy, 
completeness or usefulness by others, or any disclosure of your User Content that personally identifies you or any 
third party. You hereby represent and warrant that your User Content does not violate our Acceptable Use Policy 
(defined in Section 3.3). You may not represent or imply to others that your User Content is in any way provided, 
sponsored or endorsed by Company. Since you alone are responsible for your User Content, you may expose 
yourself to liability if, for example, your User Content violates the Acceptable Use Policy. Company is not 
obligated to backup any User Content, and your User Content may be deleted at any time without prior notice. You 
are solely responsible for creating and maintaining your own backup copies of your User Content if you desire.<br /><br />

<b>3.2 License.</b> You hereby grant (and you represent and warrant that you have the right to grant) to 
Company an irrevocable, nonexclusive, royalty-free and fully paid, worldwide license to reproduce, distribute, 
publicly display and perform, prepare derivative works of, incorporate into other works, and otherwise use and 
exploit your User Content, and to grant sublicenses of the foregoing rights, solely for the purposes of including your 
User Content in the Site. You hereby irrevocably waive (and agree to cause to be waived) any claims and assertions 
of moral rights or attribution with respect to your User Content.<br /><br />

<b>3.3 Acceptable Use Policy.</b> The following terms constitute our “Acceptable Use Policy”: <br />
(a) You agree not to use the Site to collect, upload, transmit, display, or distribute any User 
Content (i) that violates any third-party right, including any copyright, trademark, patent, trade secret, moral right, 
privacy right, right of publicity, or any other intellectual property or proprietary right, (ii) that is unlawful, 
harassing, abusive, tortious, threatening, harmful, invasive of another’s privacy, vulgar, defamatory, false, 
intentionally misleading, trade libelous, pornographic, obscene, patently offensive, promotes racism, bigotry, 
hatred, or physical harm of any kind against any group or individual or is otherwise objectionable, (iii) that is 
harmful to minors in any way, or (iv) that is in violation of any law, regulation, or obligations or restrictions 
imposed by any third party. <br />
(b) In addition, you agree not to: (i) upload, transmit, or distribute to or through the Site any 
computer viruses, worms, or any software intended to damage or alter a computer system or data; (ii) send through 
the Site unsolicited or unauthorized advertising, promotional materials, junk mail, spam, chain letters, pyramid 
schemes, or any other form of duplicative or unsolicited messages, whether commercial or otherwise; (iii) use the 
Site to harvest, collect, gather or assemble information or data regarding other users, including e-mail addresses, 
without their consent; (iv) interfere with, disrupt, or create an undue burden on servers or networks connected to 
the Site, or violate the regulations, policies or procedures of such networks; (v) attempt to gain unauthorized access 
to the Site (or to other computer systems or networks connected to or used together with the Site), whether through 
password mining or any other means; (vi) harass or interfere with any other user’s use and enjoyment of the Site; or 
(vii) use software or automated agents or scripts to produce multiple accounts on the Site, or to generate automated 
searches, requests, or queries to (or to strip, scrape, or mine data from) the Site (provided, however, that we 
conditionally grant to the operators of public search engines revocable permission to use spiders to copy materials 
from the Site for the sole purpose of and solely to the extent necessary for creating publicly available searchable 
indices of the materials, but not caches or archives of such materials, subject to the parameters set forth in our 
robots.txt file).<br /><br />

<b>3.4 Enforcement.</b> We reserve the right (but have no obligation) to review, refuse and/or remove any 
User Content in our sole discretion, and to investigate and/or take appropriate action against you in our sole 
discretion if you violate the Acceptable Use Policy or any other provision of these Terms or otherwise create 
liability for us or any other person. Such action may include removing or modifying your User Content, terminating 
your Account in accordance with Section 8, and/or reporting you to law enforcement authorities.<br /><br />

<b>4. INDEMNIFICATION.</b> You agree to indemnify and hold Company (and its officers, employees, and agents) 
harmless, including costs and attorneys’ fees, from any claim or demand made by any third party due to or arising 
out of (a) your use of the Site, (b) your violation of these Terms, (c) your violation of applicable laws or regulations 
or (d) your User Content. Company reserves the right, at your expense, to assume the exclusive defense and control 
of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of these 
claims. You agree not to settle any matter without the prior written consent of Company. Company will use 
reasonable efforts to notify you of any such claim, action or proceeding upon becoming aware of it.<br /><br />

<b>5. THIRD-PARTY LINKS & ADS; OTHER USERS</b><br />
<b>5.1 Third-Party Links & Ads.</b> The Site may contain links to third-party websites and services, 
and/or display advertisements for third parties (collectively, “Third-Party Links & Ads”). Such Third-Party Links 
& Ads are not under the control of Company, and Company is not responsible for any Third-Party Links & Ads.  
Company provides access to these Third-Party Links & Ads only as a convenience to you, and does not review, 
approve, monitor, endorse, warrant, or make any representations with respect to Third-Party Links & Ads. You use 
all Third-Party Links & Ads at your own risk, and should apply a suitable level of caution and discretion in doing so. 
When you click on any of the Third-Party Links & Ads, the applicable third party’s terms and policies apply, 
including the third party’s privacy and data gathering practices. You should make whatever investigation you feel 
necessary or appropriate before proceeding with any transaction in connection with such Third-Party Links & Ads.<br /><br />

<b>5.2 Other Users.</b> Each Site user is solely responsible for any and all of its own User Content. Since 
we do not control User Content, you acknowledge and agree that we are not responsible for any User Content, 
whether provided by you or by others. We make no guarantees regarding the accuracy, currency, suitability, 
appropriateness, or quality of any User Content. Your interactions with other Site users are solely between you and 
such users. You agree that Company will not be responsible for any loss or damage incurred as the result of any 
such interactions. If there is a dispute between you and any Site user, we are under no obligation to become 
involved.<br /><br />

<b>5.3 Release.</b> You hereby release and forever discharge Company (and our officers, employees, 
agents, successors, and assigns) from, and hereby waive and relinquish, each and every past, present and future 
dispute, claim, controversy, demand, right, obligation, liability, action and cause of action of every kind and nature 
(including personal injuries, death, and property damage), that has arisen or arises directly or indirectly out of, or 
that relates directly or indirectly to, the Site (including any interactions with, or act or omission of, other Site users 
or any Third-Party Links & Ads). <b>IF YOU ARE A CALIFORNIA RESIDENT, YOU HEREBY WAIVE 
CALIFORNIA CIVIL CODE SECTION 1542 IN CONNECTION WITH THE FOREGOING, WHICH STATES: 
“A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR OR RELEASING 
PARTY DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF 
EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER MUST HAVE MATERIALLY 
AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR OR RELEASED PARTY.”</b><br /><br />

<b>6. DISCLAIMERS</b><br />
<b>THE SITE IS PROVIDED ON AN “AS-IS” AND “AS AVAILABLE” BASIS, AND COMPANY (AND OUR 
SUPPLIERS) EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES AND CONDITIONS OF ANY KIND, 
WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ALL WARRANTIES OR CONDITIONS OF 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, 
ACCURACY, OR NON-INFRINGEMENT. WE (AND OUR SUPPLIERS) MAKE NO WARRANTY THAT THE 
SITE WILL MEET YOUR REQUIREMENTS, WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, 
SECURE, OR ERROR-FREE BASIS, OR WILL BE ACCURATE, RELIABLE, FREE OF VIRUSES OR OTHER 
HARMFUL CODE, COMPLETE, LEGAL, OR SAFE. IF APPLICABLE LAW REQUIRES ANY WARRANTIES 
WITH RESPECT TO THE SITE, ALL SUCH WARRANTIES ARE LIMITED IN DURATION TO 90 DAYS 
FROM THE DATE OF FIRST USE.</b><br /><br />

SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE 
EXCLUSION MAY NOT APPLY TO YOU. SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS ON 
HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.<br /><br />

<b>7. LIMITATION ON LIABILITY</b><br />
<b>TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY (OR OUR 
SUPPLIERS) BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS, LOST DATA, 
COSTS OF PROCUREMENT OF SUBSTITUTE PRODUCTS, OR ANY INDIRECT, CONSEQUENTIAL, 
EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO 
THESE TERMS OR YOUR USE OF, OR INABILITY TO USE, THE SITE, EVEN IF COMPANY HAS BEEN 
ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE OF, THE SITE IS AT 
YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE 
TO YOUR DEVICE OR COMPUTER SYSTEM, OR LOSS OF DATA RESULTING THEREFROM.</b><br /><br />

TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOTWITHSTANDING ANYTHING TO THE 
CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM OR 
RELATED TO THESE TERMS (FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF 
THE ACTION), WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF FIFTY US DOLLARS. THE 
EXISTENCE OF MORE THAN ONE CLAIM WILL NOT ENLARGE THIS LIMIT. YOU AGREE THAT OUR 
SUPPLIERS WILL HAVE NO LIABILITY OF ANY KIND ARISING FROM OR RELATING TO THESE 
TERMS.<br /><br />

Some jurisdictions do not allow the limitation or exclusion of liability for 
incidental or consequential damages, so the above limitation or exclusion may 
not apply to you.<br /><br />

<b>8. TERM AND TERMINATION.</b> Subject to this Section, these Terms will remain in full force and effect while 
you use the Site. We may suspend or terminate your rights to use the Site (including your Account) at any time for 
any reason at our sole discretion, including for any use of the Site in violation of these Terms. Upon termination of 
your rights under these Terms, your Account and right to access and use the Site will terminate immediately. You 
understand that any termination of your Account may involve deletion of your User Content associated with your 
Account from our live databases. Company will not have any liability whatsoever to you for any termination of 
your rights under these Terms, including for termination of your Account or deletion of your User Content. Even 
after your rights under these Terms are terminated, the following provisions of these Terms will remain in effect: 
Sections 2.2 through 2.6, Section 3 and Sections 4 through 10.<br /><br />

<b>9. COPYRIGHT POLICY.</b> Company respects the intellectual property of others and asks that users of our Site do the same. In connection with 
our Site, we have adopted and implemented a policy respecting copyright law that provides for the removal of any 
infringing materials and for the termination, in appropriate circumstances, of users of our online Site who are repeat 
infringers of intellectual property rights, including copyrights. If you believe that one of our users is, through the 
use of our Site, unlawfully infringing the copyright(s) in a work, and wish to have the allegedly infringing material 
removed, the following information in the form of a written notification (pursuant to 17 U.S.C. § 512(c)) must be 
provided to our designated Copyright Agent:<br />
1. your physical or electronic signature;<br />
2. identification of the copyrighted work(s) that you claim to have been infringed;<br />
3. identification of the material on our services that you claim is infringing and that you request us to remove;<br />
4. sufficient information to permit us to locate such material;<br />
5. your address, telephone number, and e-mail address;<br />
6. a statement that you have a good faith belief that use of the objectionable material is not authorized by the 
copyright owner, its agent, or under the law; and<br />
7. a statement that the information in the notification is accurate, and under penalty of perjury, that you are 
either the owner of the copyright that has allegedly been infringed or that you are authorized to act on 
behalf of the copyright owner.<br /><br />

Please note that, pursuant to 17 U.S.C. § 512(f), any misrepresentation of material fact (falsities) in a written 
notification automatically subjects the complaining party to liability for any damages, costs and attorney’s fees 
incurred by us in connection with the written notification and allegation of copyright infringement.<br /><br />

<b>10. GENERAL</b><br />
<b>10.1 Changes.</b> These Terms are subject to occasional revision, and if we make any substantial 
changes, we may notify you by sending you an e-mail to the last e-mail address you provided to us (if any), and/or 
by prominently posting notice of the changes on our Site. You are responsible for providing us with your most 
current e-mail address. In the event that the last e-mail address that you have provided us is not valid, or for any 
reason is not capable of delivering to you the notice described above, our dispatch of the e-mail containing such 
notice will nonetheless constitute effective notice of the changes described in the notice. Continued use of our Site 
following notice of such changes shall indicate your acknowledgement of such changes and agreement to be bound 
by the terms and conditions of such changes.<br /><br />

<b>10.2 Dispute Resolution.</b> Please read the following arbitration agreement in this Section (the 
“Arbitration Agreement”) carefully. It requires you to arbitrate disputes with Company, its parent companies, 
subsidiaries, affiliates, successors and assigns and all of their respective officers, directors, employees, agents, and 
representatives (collectively, the “Company Parties”) and limits the manner in which you can seek relief from the 
Company Parties.<br /><br />

(a) Applicability of Arbitration Agreement.</b> You agree that any dispute between you and 
any of the Company Parties relating in any way to the Site, the services offered on the Site (the “Services”) or 
these Terms will be resolved by binding arbitration, rather than in court, except that (1) you and the Company 
Parties may assert individualized claims in small claims court if the claims qualify, remain in such court and 
advance solely on an individual, non-class basis; and (2) you or the Company Parties may seek equitable relief in 
court for infringement or other misuse of intellectual property rights (such as trademarks, trade dress, domain 
names, trade secrets, copyrights, and patents). This Arbitration Agreement shall survive the expiration or 
termination of these Terms and shall apply, without limitation, to all claims that arose or were asserted 
before you agreed to these Terms (in accordance with the preamble) or any prior version of these 
Terms. This Arbitration Agreement does not preclude you from bringing issues to the attention of federal, state or 
local agencies. Such agencies can, if the law allows, seek relief against the Company Parties on your behalf. For 
purposes of this Arbitration Agreement, “Dispute” will also include disputes that arose or involve facts occurring 
before the existence of this or any prior versions of the Agreement as well as claims that may arise after the 
termination of these Terms.<br /><br />

<b>(b) Informal Dispute Resolution.</b> There might be instances when a Dispute arises between 
you and Company. If that occurs, Company is committed to working with you to reach a reasonable resolution. 
You and Company agree that good faith informal efforts to resolve Disputes can result in a prompt, low‐cost and 
mutually beneficial outcome. You and Company therefore agree that before either party commences arbitration 
against the other (or initiates an action in small claims court if a party so elects), we will personally meet and 
confer telephonically or via videoconference, in a good faith effort to resolve informally any Dispute covered by 
this Arbitration Agreement (“Informal Dispute Resolution Conference”). If you are represented by counsel, your 
counsel may participate in the conference, but you will also participate in the conference. 
The party initiating a Dispute must give notice to the other party in writing of its intent to initiate an Informal 
Dispute Resolution Conference (“Notice”), which shall occur within 45 days after the other party receives such 
Notice, unless an extension is mutually agreed upon by the parties. Notice to Company that you intend to initiate an 
Informal Dispute Resolution Conference should be sent by email or by regular 
mail to 3079 S Baldwin Rd Unit #3062, Lake Orion, Michigan 48359. The Notice must include: (1) your name, 
telephone number, mailing address, e‐mail address associated with your account (if you have one); (2) the name, 
telephone number, mailing address and e‐mail address of your counsel, if any; and (3) a description of your Dispute.  
The Informal Dispute Resolution Conference shall be individualized such that a separate conference must be held 
each time either party initiates a Dispute, even if the same law firm or group of law firms represents multiple users 
in similar cases, unless all parties agree; multiple individuals initiating a Dispute cannot participate in the same 
Informal Dispute Resolution Conference unless all parties agree. In the time between a party receiving the Notice 
and the Informal Dispute Resolution Conference, nothing in this Arbitration Agreement shall prohibit the parties 
from engaging in informal communications to resolve the initiating party’s Dispute. Engaging in the Informal 
Dispute Resolution Conference is a condition precedent and requirement that must be fulfilled before commencing 
arbitration. The statute of limitations and any filing fee deadlines shall be tolled while the parties engage in the 
Informal Dispute Resolution Conference process required by this section.<br /><br />

<b>(c) Arbitration Rules and Forum.</b> These Terms evidence a transaction involving 
interstate commerce; and notwithstanding any other provision herein with respect to the applicable substantive law, 
the Federal Arbitration Act, 9 U.S.C. § 1 et seq., will govern the interpretation and enforcement of this Arbitration 
Agreement and any arbitration proceedings. If the Informal Dispute Resolution Process described above does not 
resolve satisfactorily within 60 days after receipt of your Notice, you and Company agree that either party shall 
have the right to finally resolve the Dispute through binding arbitration. The Federal Arbitration Act governs the 
interpretation and enforcement of this Arbitration Agreement. The arbitration will be conducted by JAMS, an 
established alternative dispute resolution provider. Disputes involving claims and counterclaims with an amount in 
controversy under $250,000, not inclusive of attorneys’ fees and interest, shall be subject to JAMS’ most current 
version of the Streamlined Arbitration Rules and procedures available at http://www.jamsadr.com/rules-
streamlined-arbitration/; all other claims shall be subject to JAMS’s most current version of the Comprehensive 
Arbitration Rules and Procedures, available at http://www.jamsadr.com/rules-comprehensive-arbitration/. JAMS’s 
rules are also available at www.jamsadr.com or by calling JAMS at 800-352-5267. A party who wishes to initiate 
arbitration must provide the other party with a request for arbitration (the “Request”). The Request must include: 
(1) the name, telephone number, mailing address, e‐mail address of the party seeking arbitration and the account 
username (if applicable) as well as the email address associated with any applicable account; (2) a statement of the 
legal claims being asserted and the factual bases of those claims; (3) a description of the remedy sought and an 
accurate, good‐faith calculation of the amount in controversy in United States Dollars; (4) a statement certifying 
completion of the Informal Dispute Resolution process as described above; and (5) evidence that the requesting 
party has paid any necessary filing fees in connection with such arbitration. 
If the party requesting arbitration is represented by counsel, the Request shall also include counsel’s name, 
telephone number, mailing address, and email address. Such counsel must also sign the Request. By signing the 
Request, counsel certifies to the best of counsel’s knowledge, information, and belief, formed after an inquiry 
reasonable under the circumstances, that: (1) the Request is not being presented for any improper purpose, such as to 
harass, cause unnecessary delay, or needlessly increase the cost of dispute resolution; (2) the claims, defenses and 
other legal contentions are warranted by existing law or by a nonfrivolous argument for extending, modifying, or 
reversing existing law or for establishing new law; and (3) the factual and damages contentions have evidentiary 
support or, if specifically so identified, will likely have evidentiary support after a reasonable opportunity for further 
investigation or discovery.<br /><br />

Unless you and Company otherwise agree, or the Batch Arbitration process discussed in Subsection 10.2(h) is 
triggered, the arbitration will be conducted in the county where you reside. Subject to the JAMS Rules, the arbitrator 
may direct a limited and reasonable exchange of information between the parties, consistent with the expedited 
nature of the arbitration. If the JAMS is not available to arbitrate, the parties will select an alternative arbitral forum. 
Your responsibility to pay any JAMS fees and costs will be solely as set forth in the applicable JAMS Rules. 
You and Company agree that all materials and documents exchanged during the arbitration proceedings shall be 
kept confidential and shall not be shared with anyone except the parties’ attorneys, accountants, or business 
advisors, and then subject to the condition that they agree to keep all materials and documents exchanged during the 
arbitration proceedings confidential.<br /><br />

<b>(d) Authority of Arbitrator.</b> The arbitrator shall have exclusive authority to resolve all 
disputes subject to arbitration hereunder including, without limitation, any dispute related to the interpretation, 
applicability, enforceability or formation of this Arbitration Agreement or any portion of the Arbitration 
Agreement, except for the following: (1) all Disputes arising out of or relating to the subsection entitled “Waiver of 
Class or Other Non-Individualized Relief,” including any claim that all or part of the subsection entitled “Waiver of 
Class or Other Non-Individualized Relief” is unenforceable, illegal, void or voidable, or that such subsection 
entitled “Waiver of Class or Other Non-Individualized Relief” has been breached, shall be decided by a court of 
competent jurisdiction and not by an arbitrator; (2) except as expressly contemplated in the subsection entitled 
“Batch Arbitration,” all Disputes about the payment of arbitration fees shall be decided only by a court of 
competent jurisdiction and not by an arbitrator; (3) all Disputes about whether either party has satisfied any 
condition precedent to arbitration shall be decided only by a court of competent jurisdiction and not by an 
arbitrator; and (4) all Disputes about which version of the Arbitration Agreement applies shall be decided only by a 
court of competent jurisdiction and not by an arbitrator. The arbitration proceeding will not be consolidated with 
any other matters or joined with any other cases or parties, except as expressly provided in the subsection entitled 
“Batch Arbitration.” The arbitrator shall have the authority to grant motions dispositive of all or part of any claim 
or dispute. The arbitrator shall have the authority to award monetary damages and to grant any non-monetary 
remedy or relief available to an individual party under applicable law, the arbitral forum’s rules, and these Terms 
(including the Arbitration Agreement). The arbitrator shall issue a written award and statement of decision 
describing the essential findings and conclusions on which any award (or decision not to render an award) is based, 
including the calculation of any damages awarded. The arbitrator shall follow the applicable law. The award of the 
arbitrator is final and binding upon you and us. Judgment on the arbitration award may be entered in any court 
having jurisdiction.<br /><br />

<b>(e) Waiver of Jury Trial.</b> EXCEPT AS SPECIFIED IN SECTION 10.2(A) YOU AND 
THE COMPANY PARTIES HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO 
SUE IN COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY. You and the Company Parties 
are instead electing that all covered claims and disputes shall be resolved exclusively by arbitration under this 
Arbitration Agreement, except as specified in Section 10.2(a) above. An arbitrator can award on an individual basis 
the same damages and relief as a court and must follow these Terms as a court would. However, there is no judge 
or jury in arbitration, and court review of an arbitration award is subject to very limited review.<br /><br />

<b>(f) Waiver of Class or Other Non-Individualized Relief.</b> YOU AND COMPANY 
AGREE THAT, EXCEPT AS SPECIFIED IN SUBSECTION 10.2(H) EACH OF US MAY BRING CLAIMS 
AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT ON A CLASS, REPRESENTATIVE, 
OR COLLECTIVE BASIS, AND THE PARTIES HEREBY WAIVE ALL RIGHTS TO HAVE ANY DISPUTE 
BE BROUGHT, HEARD, ADMINISTERED, RESOLVED, OR ARBITRATED ON A CLASS, COLLECTIVE, 
REPRESENTATIVE, OR MASS ACTION BASIS. ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND 
DISPUTES OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR 
CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER. Subject to this Arbitration 
Agreement, the arbitrator may award declaratory or injunctive relief only in favor of the individual party seeking 
relief and only to the extent necessary to provide relief warranted by the party’s individual claim. Nothing in this 
paragraph is intended to, nor shall it, affect the terms and conditions under the Subsection 10.2(h) entitled “Batch 
Arbitration.” Notwithstanding anything to the contrary in this Arbitration Agreement, if a court decides by means 
of a final decision, not subject to any further appeal or recourse, that the limitations of this subsection, “Waiver of 
Class or Other Non-Individualized Relief,” are invalid or unenforceable as to a particular claim or request for relief 
(such as a request for public injunctive relief), you and Company agree that that particular claim or request for 
relief (and only that particular claim or request for relief) shall be severed from the arbitration and may be litigated 
in the state or federal courts located in the State of Michigan. All other Disputes shall be arbitrated or litigated in 
small claims court. This subsection does not prevent you or Company from participating in a class-wide settlement 
of claims.<br /><br />

<b>(g) Attorneys’ Fees and Costs.</b> The parties shall bear their own attorneys’ fees and costs in 
arbitration unless the arbitrator finds that either the substance of the Dispute or the relief sought in the Request was 
frivolous or was brought for an improper purpose (as measured by the standards set forth in Federal Rule of Civil 
Procedure 11(b)). If you or Company need to invoke the authority of a court of competent jurisdiction to compel 
arbitration, then the party that obtains an order compelling arbitration in such action shall have the right to collect 
from the other party its reasonable costs, necessary disbursements, and reasonable attorneys’ fees incurred in 
securing an order compelling arbitration. The prevailing party in any court action relating to whether either party 
has satisfied any condition precedent to arbitration, including the Informal Dispute Resolution Process, is entitled 
to recover their reasonable costs, necessary disbursements, and reasonable attorneys’ fees and costs.<br /><br />

<b>(h) Batch Arbitration.</b> To increase the efficiency of administration and resolution of 
arbitrations, you and Company agree that in the event that there are 100 or more individual Requests of a 
substantially similar nature filed against Company by or with the assistance of the same law firm, group of law 
firms, or organizations, within a 30 day period (or as soon as possible thereafter), the JAMS shall (1) administer the 
arbitration demands in batches of 100 Requests per batch (plus, to the extent there are less than 100 Requests left 
over after the batching described above, a final batch consisting of the remaining Requests); (2) appoint one 
arbitrator for each batch; and (3) provide for the resolution of each batch as a single consolidated arbitration with 
one set of filing and administrative fees due per side per batch, one procedural calendar, one hearing (if any) in a 
place to be determined by the arbitrator, and one final award (“Batch Arbitration”).<br /><br />

All parties agree that Requests are of a “substantially similar nature” if they arise out of or relate to the same event 
or factual scenario and raise the same or similar legal issues and seek the same or similar relief. To the extent the 
parties disagree on the application of the Batch Arbitration process, the disagreeing party shall advise the JAMS, and 
the JAMS shall appoint a sole standing arbitrator to determine the applicability of the Batch Arbitration process 
(“Administrative Arbitrator”). In an effort to expedite resolution of any such dispute by the Administrative 
Arbitrator, the parties agree the Administrative Arbitrator may set forth such procedures as are necessary to resolve 
any disputes promptly. The Administrative Arbitrator’s fees shall be paid by Company.<br /><br />

You and Company agree to cooperate in good faith with the JAMS to implement the Batch Arbitration process 
including the payment of single filing and administrative fees for batches of Requests, as well as any steps to 
minimize the time and costs of arbitration, which may include: (1) the appointment of a discovery special master to 
assist the arbitrator in the resolution of discovery disputes; and (2) the adoption of an expedited calendar of the 
arbitration proceedings.<br /><br />

This Batch Arbitration provision shall in no way be interpreted as authorizing a class, collective and/or mass 
arbitration or action of any kind, or arbitration involving joint or consolidated claims under any circumstances, 
except as expressly set forth in this provision.<br /><br />

<b>(i) 30-Day Right to Opt Out.</b> You have the right to opt out of the provisions of this 
Arbitration Agreement by sending a timely written notice of your decision to opt out to the following address: 
[3079 S Baldwin Rd Unit #3062, Lake Orion, Michigan 48359, or email within 30 
days after first becoming subject to this Arbitration Agreement. Your notice must include your name and address 
and a clear statement that you want to opt out of this Arbitration Agreement. If you opt out of this Arbitration 
Agreement, all other parts of these Terms will continue to apply to you. Opting out of this Arbitration Agreement 
has no effect on any other arbitration agreements that you may currently have with us, or may enter into in the 
future with us.<br /><br />

<b>(j) Invalidity, Expiration.</b> Except as provided in the subsection entitled “Waiver of Class 
or Other Non-Individualized Relief”, if any part or parts of this Arbitration Agreement are found under the law to 
be invalid or unenforceable, then such specific part or parts shall be of no force and effect and shall be severed and 
the remainder of the Arbitration Agreement shall continue in full force and effect. You further agree that any 
Dispute that you have with Company as detailed in this Arbitration Agreement must be initiated via arbitration 
within the applicable statute of limitation for that claim or controversy, or it will be forever time barred. Likewise, 
you agree that all applicable statutes of limitation will apply to such arbitration in the same manner as those statutes 
of limitation would apply in the applicable court of competent jurisdiction.<br /><br />

<b>(k) Modification.</b> Notwithstanding any provision in these Terms to the contrary, we agree 
that if Company makes any future material change to this Arbitration Agreement, you may reject that change 
within 30 days of such change becoming effective by writing Company at the following address: [3079 S Baldwin 
Rd Unit #3062, Lake Orion, Michigan 48359, or email. Unless you reject the 
change within 30 days of such change becoming effective by writing to Company in accordance with the 
foregoing, your continued use of the Site and/or Services, including the acceptance of products and services offered 
on the Site following the posting of changes to this Arbitration Agreement constitutes your acceptance of any such 
changes. Changes to this Arbitration Agreement do not provide you with a new opportunity to opt out of the 
Arbitration Agreement if you have previously agreed to a version of these Terms and did not validly opt out of 
arbitration. If you reject any change or update to this Arbitration Agreement, and you were bound by an existing 
agreement to arbitrate Disputes arising out of or relating in any way to your access to or use of the Services or of 
the Site, any communications you receive, any products sold or distributed through the Site, the Services, or these 
Terms, the provisions of this Arbitration Agreement as of the date you first accepted these Terms (or accepted any 
subsequent changes to these Terms) remain in full force and effect. Company will continue to honor any valid opt 
outs of the Arbitration Agreement that you made to a prior version of these Terms.<br /><br />

<b>10.3 Export.</b> The Site may be subject to U.S. export control laws and may be subject to export or 
import regulations in other countries. You agree not to export, reexport, or transfer, directly or indirectly, any U.S. 
technical data acquired from Company, or any products utilizing such data, in violation of the United States export 
laws or regulations.<br /><br />

<b>10.4 Disclosures.</b> Company is located at the address in Section 10.8. If you are a California resident, 
you may report complaints to the Complaint Assistance Unit of the Division of Consumer Product of the California 
Department of Consumer Affairs by contacting them in writing at 400 R Street, Sacramento, CA 95814, or by 
telephone at (800) 952-5210.<br /><br />

<b>10.5 Electronic Communications.</b> The communications between you and Company use electronic 
means, whether you use the Site or send us emails, or whether Company posts notices on the Site or communicates 
with you via email. For contractual purposes, you (a) consent to receive communications from Company in an 
electronic form; and (b) agree that all terms and conditions, agreements, notices, disclosures, and other 
communications that Company provides to you electronically satisfy any legal requirement that such 
communications would satisfy if it were be in a hardcopy writing. The foregoing does not affect your non-waivable 
rights.<br /><br />

<b>10.6 Entire Terms.</b> These Terms constitute the entire agreement between you and us regarding the use 
of the Site. Our failure to exercise or enforce any right or provision of these Terms shall not operate as a waiver of 
such right or provision. The section titles in these Terms are for convenience only and have no legal or contractual 
effect. The word “including” means “including without limitation”. If any provision of these Terms is, for any 
reason, held to be invalid or unenforceable, the other provisions of these Terms will be unimpaired and the invalid or 
unenforceable provision will be deemed modified so that it is valid and enforceable to the maximum extent 
permitted by law. Your relationship to Company is that of an independent contractor, and neither party is an agent 
or partner of the other. These Terms, and your rights and obligations herein, may not be assigned, subcontracted, 
delegated, or otherwise transferred by you without Company’s prior written consent, and any attempted assignment, 
subcontract, delegation, or transfer in violation of the foregoing will be null and void. Company may freely assign 
these Terms. The terms and conditions set forth in these Terms shall be binding upon assignees.<br /><br />

<b>10.7 Copyright/Trademark Information.</b> Copyright © 2024 Next Play Games. All rights reserved.  
All trademarks, logos and service marks (“Marks”) displayed on the Site are our property or the property of other 
third parties. You are not permitted to use these Marks without our prior written consent or the consent of such third 
party which may own the Marks.<br /><br />

<b>10.8 Contact Information:</b><br />
Address: <br />
3079 S Baldwin Rd Unit #3062<br />
Lake Orion, Michigan 48359<br />
`;

const TermAndConditions: FunctionComponent = () => {
  return (
    <div className={styles.termsAndConditions}>
      <Header >
        <div className={styles.headerTitle}>Terms and Conditions</div>
        <div className={styles.headerSubtitle}>Next Play Games</div>
      </Header>
      
      <div className={styles.mainFrame}>
          <div className={styles.termsContent}>
            <div className={styles.termsHeader}>
              <div className={styles.termsTitle}>WEBSITE TERMS OF USE</div>
              <div className={styles.lastUpdate}>(Last Update: July 20, 2024)</div>
            </div>

            <div className={styles.termsBody}>
              <div dangerouslySetInnerHTML={{ __html: newTerms }} />
            </div>
          </div>
      </div>
      <LoginFooter />
    </div>
  );
};

export default TermAndConditions;
