import React from "react"

type TermsContent = {
    title: string
    content: string
    underlined: boolean
}

const Terms: React.FC = () => {

    const content: TermsContent[] = [
        {
            title: "1. Acceptance of Terms by User",
            underlined: false,
            content: "This site is operated by Zen Blockchain Foundation (“Horizen” or “we or “us”), a Delaware corporation. The products and services offered by Horizen, including, but not limited to, its websites, TokenMint by Horizen, sidechains, SDKs, block explorers, web wallet, forums, help desks, documentation, software, Beta Software (defined below), wallets, hosting, and other services (the “Services”) may only be used for permitted legal purposes. Some jurisdictions may impose limitations on the use of Services and Users in those jurisdictions should consult with independent legal counsel before using the Services. By using the Services, you accept these Terms of Use (\"Terms\") and the Services are offered subject to your acceptance, without modification, of all the Terms. The Terms represent a binding contract between you, an individual user, or site visitor, whether personally or on behalf of an entity and us, concerning the use of the Services, including the website as well as any other media form related, linked, or otherwise connected to the site or the Services. Horizen reserves the right to post changes to the Terms at any time, and by your continued use of the Services thereafter, you agree to be bound by the new version of the Terms without specific notice thereof. If any changes to the Terms are not acceptable to you, you must stop your use of the Services.  It is your responsibility to periodically review the Terms to stay informed of updates.  In these Terms, \"User,\" \"you\" and/or “your” refers to each user of our Services. \"ZEN\" refers to the digital currency that can be used in conjunction with certain Services.\n\nTHIS AGREEMENT IS SUBJECT TO THE SECTION ENTITLED “BINDING ARBITRATION AND CLASS ACTION A WAIVER” WHICH IMPACTS YOUR RIGHTS AS DETAILED BELOW. PLEASE READ THE AGREEMENT CAREFULLY."
        },
        {
            title: "2. Sites and Services",
            underlined: false,
            content: "Horizen does not guarantee that access to or use of this website or any of the Services will be uninterrupted or error-free, and Horizen shall not be liable for any feature not being accessible or for any unavailability of the Services. The Services may be expanded, limited, or modified at any time by Horizen without advance notice or reason. Horizen may also, in its sole and absolute sole discretion, and at any time, discontinue providing, temporarily or permanently, any or all of the Services, without notice. To access some of the content or features of the Services, Users may need to enhance or update the hardware or software in their computer systems. Horizen assumes no responsibility for any failure to access the Services, partially or fully, whether due to the User's system, Internet network, or any other cause."
        },
        {
            title: "3. Beta Software",
            underlined: false,
            content: "In connection with the Services or otherwise, Horizen may make pre-release versions of software available to you which, regardless of how labeled, is by default ‘Beta Software’. You acknowledge that the Beta Software is a pre-release version and does not represent the final product from Horizen, and may contain bugs, errors, security flaws, and other problems that could cause system or other failures or security breaches. You acknowledge that Horizen has no express or implied obligation to inform you that the Beta Software is Beta Software. Because Beta Software can be at various stages of development, operation and use of the Beta Software may be unpredictable. Horizen has no obligation to further develop or publicly release the Beta Software. Horizen may not provide technical or other support for the Beta Software. If requested by Horizen, you will provide feedback to us regarding testing and use of the Beta Software, including error or bug reports."
        },
        {
            title: "4. User Restrictions",
            underlined: false,
            content: "The User is granted permission to access, download, and use the Services, provided that the User shall:\n" +
                    " · Not use the Services for any illegal or unauthorized purpose or beyond the scope of the Services expected use;\n" +
                    " · Not intentionally interfere with the operation of the Services or with any other person’s use of the Services;\n" +
                    " · Not intentionally gain unauthorized access to the Services;\n" +
                    " · Be solely liable for User’s, including without limitation all of its employees, affiliates, consultants, and service providers, conduct, acts and omissions;\n" +
                    " · Not hack the Services; \n" +
                    " · Not remove or alter any copyright notices or other notices included in the Services; \n" +
                    " · Not decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services in an unauthorized manner;\n" +
                    " · Not intentionally transmit any viruses, bugs, worms, or any other computer code of a destructive nature or that may harm a network, computer, server, hardware, software or telephone equipment using the Services;\n" +
                    " · Not violate anyone else’s legal rights (e.g. privacy rights) or any laws (e.g. copyright laws) in User’s jurisdiction while using the Services;\n" +
                    " · Use the Services in accordance with all applicable laws;\n" +
                    " · Not use any unauthorized data mining, robots, spyware or similar data gathering and extraction methods in connection with the Services;\n" +
                    " · Not intentionally impose an unreasonable burden on the Services or network; \n" +
                    " · Not breach, or attempt to breach, or otherwise interfere with the security of the Services;\n" +
                    " · Not use the Services or export the Services in violation of U.S. export laws and regulations;\n" +
                    " · Not solicit any activity, unlawful or otherwise, that infringes Horizen’s rights or the rights of any other party; \n" +
                    " · Not enable others to violate any of these terms and conditions; and \n" +
                    " · Be at least 18 years of age or older. \n" +
                    "A violation of any of these Terms, as determined in Horizen’s’ sole discretion, may result in the termination of the User’s ability to access or use the Services.\n"
        },
        {
            title: "5. Horizen Proprietary Rights",
            underlined: false,
            content: "These Terms do not transfer from Horizen to you any Horizen or third party intellectual property, and all right, title and interest in and to such property will remain (as between the parties) solely with Horizen. “Horizen” and other Horizen graphics, logos, designs, page headers, button icons, scripts and service names are trademarks in the United States and other countries. Horizen’s trademarks and trade dress, as well as third party trademarks, logos and service marks used in conjunction with the Services, may not be used in connection with any product or service in any manner that is likely to cause confusion and may not be copied, imitated, or used, in whole or in part, without the prior written permission of Horizen. Your use of the Services grants you no right or license to reproduce or otherwise use any Horizen or third-party trademarks. To the extent Horizen elects to license its software, you will be subject to the terms and conditions set forth herein, including but not limited to the User Restrictions in Section 3. Certain logos, such as those for the operating systems and platforms Horizen supports as well as those of our sponsors and partners are copyrighted by their owners. Horizen does not own those copyrights, and use of those copyrights is not permitted without their permission."
        },
        {
            title: "6. No Investment Advice",
            underlined: false,
            content: "Horizen does not provide legal, tax, financial, or investment services. Since each User's situation is unique, a qualified professional should be consulted before making financial decisions. The Services do not constitute investment advice or a solicitation to buy, hold, invest in, own, or use ZEN or to produce, invent or mint any other token. Horizen will not be responsible for any damages, claims, or losses arising from the use of the Services, nor any use of ZEN or any other token minted by the Service, including the actions or inactions or events related to third parties, security problems during the use of any ZEN/any other token or cryptocurrency-related software or service, technical failures during the use of any such related software or service, software or data corruption problems during the use of any such-related software or service, or user errors during the use of any such-related software or service."
        },
        {
            title: "7. Industry Risks",
            underlined: false,
            content: "By using the Services, you represent that you understand the inherent risks associated with cryptographic systems; and warrant that you have an understanding of the usage and intricacies of native cryptographic tokens, smart contract based tokens, and blockchain-based software systems. You further represent that you understand that the Services could be impacted by one or more regulatory inquiries or regulatory action, which could impede or limit the ability of the Services to continue to develop, or which could impede or limit your ability to access or use the Services. You acknowledge and understand that cryptography and blockchain-based systems are progressing fields with unique risks, which could result in the theft or loss of your cryptographic tokens or property. Horizen will utilize reasonable efforts to secure the Services and your use of it, but does not guarantee or otherwise represent full security of the Services. By using the Services, you acknowledge these inherent risks."
        },
        {
            title: "8. Content Limitations",
            underlined: false,
            content: "Horizen makes no representations as to the accuracy, thoroughness or quality of the information presented to Users through the Services, which is provided only on an \"AS-IS\" and \"AS AVAILABLE\" basis at User's sole risk. Horizen shall not be responsible or liable for any errors, omissions or inaccuracies in the content. The information provided is neither comprehensive nor appropriate for every individual. Some of the information is relevant only in certain parts of the world, and may not be relevant to or compliant with the laws, regulations or other legal requirements of other countries. It is your responsibility to determine whether, how and to what extent your intended use of the Services will be technically and legally possible in the areas of the world where you intend to use them. You are advised to verify any information before using it for any personal, financial or business purpose. In addition, the opinions and views expressed in any forum post are solely those of the author(s) of the article and do not reflect the opinions of Horizen. The content may be modified at any time by Horizen, without advance notice or reason, and Horizen shall have no obligation to notify you of any corrections or changes to any content."
        },
        {
            title: "9. Responsibility of Contributors",
            underlined: false,
            content: "If you post material to the site, post links on the site, or otherwise make (or allow any third party to make) material available by means of the site (any such material, \"Content\"), You are entirely responsible for the content of, and any harm resulting from, that Content. That is the case regardless of whether the Content in question constitutes text, graphics, an audio file, or computer software. By making Content available, you represent and warrant that:\n" +
                    " · the downloading, copying and use of the Content will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark or trade secret rights, of any third party;\n" +
                    " · if your employer has rights to intellectual property you create, you have either (i) received permission from your employer to post or make available the Content, including but not limited to any software, or (ii) secured from your employer a waiver as to all rights in or to the Content;\n" +
                    " · you have fully complied with any third-party licenses relating to the Content, and have done all things necessary to successfully pass through to end users any required terms;\n" +
                    " · the Content does not contain or install any viruses, worms, malware, Trojan horses or other harmful or destructive content;\n" +
                    " · the Content is not spam, is not machine- or randomly-generated, and does not contain unethical or unwanted commercial content designed to drive traffic to third party sites or boost the search engine rankings of third party sites, or to further unlawful acts (such as phishing) or mislead recipients as to the source of the material (such as spoofing);\n" +
                    " · the Content is not pornographic, does not contain threats or incite violence, and does not violate the privacy or publicity rights of any third party;\n" +
                    " · your content is not getting advertised via unwanted electronic messages such as spam links on newsgroups, email lists, blogs and websites, and similar unsolicited promotional methods;\n" +
                    " · your content is not named in a manner that misleads your readers into thinking that you are another person or company; and\n" +
                    " · you have, in the case of Content that includes computer code, accurately categorized and/or described the type, nature, uses and effects of the materials, whether requested to do so by Horizen or otherwise.\n" +
                    "Without limiting any of those representations or warranties, Horizen has the right (though not the obligation) in Horizen’s sole discretion to (i) refuse or remove any content that, in Horizen’s reasonable opinion, violates any Horizen policy or is in any way harmful or objectionable, or (ii) terminate or deny access to and use of the Service to any individual or entity for any reason. Horizen will have no obligation to provide a refund of any amounts previously paid."
        },
        {
            title: "10. Third Party Content",
            underlined: false,
            content: "Any testimonials, opinions, advice, product or service offers, or other information or content made available on or through the Services by third parties (\"Third-Party Content'') are solely those of their respective providers and not of Horizen which does not guarantee the accuracy, completeness, reliability or usefulness of Third-Party Content. It is the responsibility of the User to evaluate Third-Party Content and Horizen shall not be liable for any damage or loss caused by the Users' reliance on or other use of Third Party Content."
        },
        {
            title: "11. Offsite Links",
            underlined: false,
            content: "As a convenience to Users, Horizen may provide links to other sites or resources. Because Horizen does not have control over such sites and resources, Horizen is not responsible or liable for use of or reliance on any content, products, services or information at such sites or resources. Inclusion of any links does not imply any endorsement, affiliation, approval, association or sponsorship by Horizen of the linked websites, resources, their operators or owners. When you select a link, you may be leaving our Services. The information available on the third parties' websites may have certain restrictions on use or distribution which differ from these Terms."
        },
        {
            title: "12. Viruses and Malware",
            underlined: false,
            content: "Horizen does not guarantee that files available for download will be free of infection or viruses or other code that may have contaminating or destructive properties. You are responsible for implementing sufficient procedures and checkpoints to satisfy your particular requirements for integrity, security and accuracy of data input and output, and for maintaining a means external to the site for the reconstruction of any lost data."
        },
        {
            title: "13. Password Protected Areas",
            underlined: false,
            content: "Some Horizen Services may be password protected and available only to Users who are registered (\"Password Protected Areas''). Registration requires Users to fully complete the account registration process. Horizen reserves the right to deny or revoke registration or access to Password Protected Areas for any User. Users are responsible for maintaining the security of the password they set. Horizen will not be liable for any loss or liability incurred as a result of an unauthorized person using a User's password."
        },
        {
            title: "14. Privacy",
            underlined: false,
            content: "The Services may collect personal information from Users. Because Horizen respects the privacy of its Users and their personal information, it has established a Privacy Policy to describe what information it collects and how that information is used. Horizen’s Privacy Policy can be found at https://horizen.io/privacy/. If you elect to leave our Services via a third party link, including Horizen social media forums like YouTube, GitHub, Facebook, etc., the terms and conditions (including privacy policies) of those sites may differ significantly from the Terms found herein."
        },
        {
            title: "15. DISCLAIMER OF WARRANTIES",
            underlined: false,
            content: "THE SERVICES ARE PROVIDED “AS-IS.” HORIZEN DISCLAIMS ALL WARRANTIES, REPRESENTATIONS AND CONDITIONS OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT, WITH RESPECT TO THE USE OF THE SERVICES, OR THE ACCURACY, COMPLETENESS, TIMELINESS OR CURRENTNESS OF ITS CONTENT, IN ANY WAY AND FOR ANY PURPOSE."
        },
        {
            title: "16. LIMITATION OF LIABILITY",
            underlined: false,
            content: "IN NO EVENT WILL HORIZEN, ITS DIRECTORS, OFFICERS, EMPLOYEES, CONTRACTORS, OR AGENTS BE LIABLE FOR ANY INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR INDIRECT DAMAGES EVEN IF HORIZEN HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR ANY DIRECT DAMAGES THAT RESULT FROM: (1) THE USE OF, OR INABILITY TO USE, THE SERVICES; (2) THE PERFORMANCE OF THE SERVICES; OR (3) ANY FAILURE IN THE SERVICES. USER ASSUMES TOTAL RESPONSIBILITY FOR THE USE OF THE SERVICES. USER’S ONLY REMEDY FOR DISSATISFACTION WITH THE SERICES IS TO STOP USING THE SERVICES. IF, NOTWITHSTANDING THE TERMS HEREIN, HORIZEN IS FOUND LIABLE TO USER FOR ANY DAMAGE OR LOSS WHICH ARISES OUT OF OR IS ANY WAY CONNECTED WITH USER’S USE OF THE SERVICES, HORIZEN’S LIABILITY SHALL IN NO EVENT EXCEED THE AMOUNT PAID BY USER TO HORIZEN DURING THE PREVIOUS TWELVE (12) MONTHS. IN ADDITION TO THE FOREGOING LIMITATIONS OF LIABILITY, USER AGREES THAT USER WILL NOT JOIN ANY CLAIM AGAINST HORIZEN WITH THE CLAIM OF ANY OTHER PERSON OR ENTITY IN A LAWSUIT OR OTHER PROCEEDING; THAT NO CLAIM USER HAS AGAINST HORIZEN SHALL BE RESOLVED ON A CLASS-WIDE BASIS; AND THAT USER WILL NOT ASSERT A CLAIM IN A REPRESENTATIVE CAPACITY AGAINST HORIZEN ON BEHALF OF ANYONE ELSE."
        },
        {
            title: "17. BINDING ARBITRATION AND CLASS ACTION WAIVER",
            underlined: false,
            content: "The parties shall use their best efforts to engage directly to settle any dispute, claim, question, or disagreement and engage in good faith negotiations which shall be a condition to either party initiating a lawsuit or arbitration.  If the parties do not reach an agreed upon solution within a period of 30 days from the time informal dispute resolution begins, then either party may initiate binding arbitration as the sole means to resolve claims, subject to the terms set forth below. Specifically, all claims arising out of or relating to these Terms (including their formation, performance and breach), the parties’ relationship with each other and/or your use of the Services shall be finally settled by binding arbitration administered by the American Arbitration Association in accordance with the provisions of its Commercial Arbitration Rules and the supplementary procedures for consumer related disputes of the American Arbitration Association (the \"AAA\"), excluding any rules or procedures governing or permitting class actions. The arbitrator, and not any federal, state or local court or agency, shall have exclusive authority to resolve all disputes arising out of or relating to the interpretation, applicability, enforceability or formation of these Terms, including, but not limited to any claim that all or any part of these Terms are void or voidable, or whether a claim is subject to arbitration. The arbitrator shall be empowered to grant whatever relief would be available in a court under law or in equity. The arbitrator’s award shall be written, and binding on the parties and may be entered as a judgment in any court of competent jurisdiction.  The parties understand that, absent this mandatory provision, they would have the right to sue in court and have a jury trial. They further understand that, in some instances, the costs of arbitration could exceed the costs of litigation and the right to discovery may be more limited in arbitration than in court.  Binding arbitration shall take place in New York. You agree to submit to the personal jurisdiction of any federal or state court in New York County, New York, in order to compel arbitration, to stay proceedings pending arbitration, or to confirm, modify, vacate or enter judgment on the award entered by the arbitrator.\n" +
                    " \n" +
                    "You further agree that any arbitration shall be conducted in your individual capacity only and not as a class action or other representative action, and you expressly waive any right to file a class action or seek relief on a class basis. YOU AGREE THAT YOU MAY BRING CLAIMS AGAINST HORIZEN ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. If any court or arbitrator determines that the class action waiver set forth in this paragraph is void or unenforceable for any reason or that an arbitration can proceed on a class basis, then the arbitration provision set forth above shall be deemed null and void in its entirety and the parties shall be deemed to have not agreed to arbitrate disputes.\n" +
                    " \n" +
                    "Notwithstanding the parties' decision to resolve all disputes through arbitration, either party may bring an action in state or federal court to protect its intellectual property rights (\"intellectual property rights\" means patents, copyrights, moral rights, trademarks, and trade secrets, but not privacy or publicity rights). Either party may also seek relief in a small claims court for disputes or claims within the scope of that court’s jurisdiction.\n" +
                    " \n" +
                    "You have the right to opt-out and not be bound by the arbitration and class action waiver provisions set forth above by sending written notice of your decision to opt-out to the following address: legal@horizen.io. The notice must be sent within 30 days of your first use of the Service or 60-days after the publication of the Terms with this Section entitled “Binding Arbirtration and Class Action Waiver” on or about April 1, 2022 (or any subsequent modification of such Section), whichever is later, otherwise you shall be bound to arbitrate disputes in accordance with the terms of those paragraphs. If you opt-out of these arbitration provisions, Horizen also will not be bound by them."
        },
        {
            title: "18. EXCLUSION OF LIMITATIONS AND DISCLAIMERS",
            underlined: false,
            content: "BECAUSE SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OF WARRANTIES, OR THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, IN SUCH JURISDICTIONS HORIZEN’S LIABILITY IS LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW."
        },
        {
            title: "19. Indemnification",
            underlined: true,
            content: "User agrees to defend, indemnify, hold harmless and defend Horizen and its directors, officers, employees, contractors, agents, subsidiaries, affiliates, licensors and suppliers from and against any and all claims, charges, complaints, damages, losses, liabilities, costs and expenses (including attorneys’ fees and expert fees) due to, arising out of or relating in any way to User’s use of, or access to, the Services."
        },
        {
            title: "20. Miscellaneous",
            underlined: false,
            content: "a.\tThese Terms and all matters arising out of or relating to these Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to any conflict of law provisions. Each party irrevocably agrees that, to the extent a claim is not subject to the Section entitled “Binding Arbirtration and Class Action Waiver,” any claim brought by it in any way arising out of the Services must be brought solely and exclusively in state or federal court located in Delaware, and each party irrevocably accepts and submits to the sole and exclusive jurisdiction of each of the aforesaid courts in personam, generally and unconditionally, with respect to any action, suit, or proceeding brought by it or against it by the other party.\n" +
                    "\n" +
                    "b.\tThese Terms shall constitute the entire agreement between Horizen and the User and contains all of the understandings and agreements of the parties in respect of the subject matter hereof. Any and all prior understanding and agreements, expressed or implied, between the parties hereto in respect of the subject matter hereof are superseded hereby. In the event any one or more of the terms or provisions contained herein shall be declared by a court of competent jurisdiction to be invalid, illegal or unenforceable in any respect, the validity, legality and enforceability of the remaining provisions herein shall not in any way be affected or impaired, except that, in such an event, these Terms shall be deemed revised in order to provide the party adversely affected by such declaration with the benefit of its expectation, evidenced by the provision(s) affected by such a declaration, to the maximum extent legally permitted.\n" +
                    "\n" +
                    "c.\tNo waiver of any breach of these Terms shall: (i) be effective unless it is in a writing which is executed by the party charged with the waiver, or (ii) constitute a waiver of a subsequent breach, whether or not of the same nature. All waivers shall be strictly construed. No delay in enforcing any right or remedy as a result of a breach of these Terms shall constitute a waiver thereof. \n" +
                    "\n" +
                    "d.\tThese Terms shall be binding upon and shall inure to the benefit of the parties hereto and their respective legal representatives, successors and permitted assigns. No right or remedy conferred by these Terms is exclusive of any other right or remedy conferred herein or by law or in equity; rather, all of such rights and remedies are cumulative of every other such right or remedy and may be exercised concurrently or separately from time-to-time.\n" +
                    "\n" +
                    "e.\tAny ambiguities herein will not be strictly construed against the drafter of the language concerned but will be resolved by applying the most reasonable interpretation under the circumstances, giving full consideration to the intentions of the parties at the time of contracting. These Terms will not be construed against any party by reason of its preparation. In the event any suit or other action is commenced by Horizen to construe or enforce any provision of these Terms, in addition to all other amounts Horizen shall be entitled to receive from User, User agrees that Horizen shall be entitled to recover its reasonable attorneys fees and court costs.\n" +
                    "\n" +
                    "f.\tThese Terms were last reviewed on April 20, 2022"
        },
    ]

    return (
            <div className="z-10">
                <main>
                    <div className={ `max-w-screen-xl ml-auto mr-auto xl:grid px-8` }>
                        <span className={ `mx-auto text-[52px] font-bold text-white text-center mt-32 mb-20` }>Terms of Use</span>
                        { content.map((cont: TermsContent) => {
                            return (
                                    <div className="mb-12 grid">
                                        <span className={(cont.underlined ? "underline italic" : "") + ` font-bold text-white text-[22px]`}>{ cont.title }</span>
                                        <span className={(cont.underlined ? "font-bold italic" : "") + ` mt-2 text-Content_gray text-lg whitespace-pre-line`}>{ cont.content }</span>
                                    </div>
                            )
                        }) }
                        <span className="mb-20 text-white text-center">[End of Terms]</span>
                    </div>
                </main>
            </div>
    )
}

export default Terms