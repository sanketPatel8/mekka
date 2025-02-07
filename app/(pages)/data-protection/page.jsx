"use client";
import { useTranslation } from '@/app/context/TranslationContext'
import FooterOne from '@/components/layout/footers/FooterOne'
import FooterTwo from '@/components/layout/footers/FooterTwo'
import Header1 from '@/components/layout/header/Header1'
import React, { useEffect } from 'react'

const Datenschutz = () => {
    const {translate} = useTranslation();
    
      // page title 

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Datenschutz - MekkaBooking";
    }
  }, []);

  return (
    <>
    <Header1 />
    <div className="container">
        <br /><br /><br /><br />
        <h1>{translate("Privacy policy")}</h1><br />
        <p>{translate("With this privacy policy, we would like to inform you about the type, scope and purpose of the processing of personal data (hereinafter also referred to as 'data'). Personal data is all data that has a personal reference to you, e.g. name, address, email address or your user behavior. This privacy policy applies to all data processing operations carried out by us, both in the context of our core activities and for the online media we maintain.")}</p><br />
        <h2>{translate("Who is responsible for data processing at our company")}</h2><br />
        <p>{translate("Responsible for data processing is:")}</p><br />
        <p> Mekka Booking GmbH</p>
        <p> Kagan Kahraman</p>
        <p> Frankfurter Str. 92</p>
        <p> 65760 Eschborn</p>
        <p> Deutschland</p>
        <p> +49 (0) 6196 204 72 40</p>
        <p> info@mekkabooking.com</p>
        <p> https://mekkabooking.com/Impressum</p>
        <br />
        <h2>{translate("Processing your data as part of the core activities of our company")}</h2>
        <p>{translate("If you are our customer or business partner or are interested in our services, the type, scope and purpose of the processing of your data depends on the contractual or pre-contractual relationship that exists between us. In this sense, the data we process includes all data that is or was provided by you for the purpose of using the contractual or pre-contractual services and that is required to process your inquiry or the contract concluded between us. Unless otherwise stated in the further information in this data protection declaration, the processing of your data and its transfer to third parties is limited to the data that is necessary and appropriate to answer your inquiries and/or to fulfill the contract concluded between you and us, to protect our rights and to fulfill legal obligations. We will inform you which data is required for this before or as part of the data collection. If we use third parties to provide our services, the data protection information of the respective third parties applies.")}</p>
        <p><b>{translate("Data affected:")}</b></p>
        <ul>
            <li>{translate("Inventory data (e.g. names, addresses)")}</li>
            <li>{translate("Payment data (e.g. bank details, invoices)")}</li>
            <li>{translate("Contact details (e.g. email address, telephone number, postal address)")}</li>
            <li>{translate("Contract data (e.g. subject matter of the contract, duration of the contract)")}</li>
        </ul>
        <p><span><b>{translate("Affected persons:")}</b></span>{translate("Interested parties, business and contractual partners")}</p>
        <p><span><b>{translate("Purpose of processing")}:</b></span>{translate("Processing of contractual services, communication and answering contact requests, office and organizational procedures")}</p>
        <p><span><b>{translate("Legal basis")}:</b></span>{translate("Contractual performance and pre-contractual inquiries, Art. 6 Para. 1 lit. b GDPR, legal obligation, Art. 6 Para. 1 lit. c GDPR, legitimate interest, Art. 6 Para. 1 lit. f GDPR")}</p>
        <h1>{translate("Your rights under the GDPR")}</h1>
        <p>{translate("According to the GDPR, you are entitled to the following rights, which you can assert at any time with the person responsible named in section 1 of this data protection declaration:")}</p>
        <ul>
            <li>  <p><span><b>{translate("Right to information:")} </b></span>{translate("You have the right to request information from us as to whether and which data we process about you.")}</p></li>
            <li>  <p><span><b>{translate("Right to rectification")}: </b></span>{translate("You have the right to request the correction of inaccurate data or the completion of incomplete data.")}</p></li>
            <li>  <p><span><b>{translate("Right to erasure:")} </b></span>{translate("Right to erasure:")} </p></li>
            <li>  <p><span><b>{translate("Right to restriction:")} </b></span>{translate("In certain cases, you have the right to request that we only process your data to a limited extent.")} </p></li>
            <li>  <p><span><b>{translate("Right to data portability:")} </b></span>{translate("You have the right to request that we transmit your data to you or another controller in a structured, common and machine-readable format.")} </p></li>
            <li>  <p><span><b>{translate("Right to complain")}: </b></span>{translate("You have the right to complain to a supervisory authority. The supervisory authority responsible is the supervisory authority of your usual place of residence, your place of work or our company headquarters.")}</p></li>
        </ul>

        <h1>{translate("Right of withdrawal")}</h1>
        <p>{translate("You have the right to revoke your consent to data processing at any time.")}</p>
        <h1>{translate("Right of objection")}</h1>
        <p>{translate("You have the right to object at any time to the processing of your data, which we base on our legitimate interest in accordance with Art. 6 (1) (f) GDPR. If you exercise your right of objection, we ask you to explain the reasons. We will then no longer process your personal data unless we can prove to you that compelling legitimate reasons for data processing outweigh your interests and rights.")}</p>
        <p><b>{translate("Notwithstanding the foregoing, you have the right to object at any time to the processing of your personal data for advertising and data analysis purposes.")}</b></p>
        <p>{translate("Please send your objection to the contact address of the person responsible given above.")}</p>
        <h1>{translate("When do we delete your data?")}</h1>
        <p>{translate("We delete your data when we no longer need it or when you tell us to do so. This means that - unless otherwise stated in the individual data protection notices in this data protection declaration - we delete your data,")}</p>
        <ul>
            <li>
            {translate("if the purpose of the data processing no longer applies and the respective legal basis stated in the individual data protection notices no longer exists, e.g.")} 
                <ul>
                    <li>{translate("after termination of the contractual or membership relationship between us (Art. 6 para. 1 lit. a GDPR) or")}</li>
                    <li>{translate("after our legitimate interest in further processing or storing your data no longer exists (Art. 6 para. 1 lit. f GDPR)")},</li>
                </ul>
            </li>
            <li>{translate("if you exercise your right of withdrawal and there is no other legal basis for the processing within the meaning of Art. 6 (1) lit. b-f GDPR")},</li>
            <li>{translate("if you exercise your right of objection and there are no compelling legitimate reasons that prevent the deletion.")}</li>

        </ul>
        <p>{translate("However, if we still need to retain (certain parts of) your data for other purposes, for example because this is necessary due to tax retention periods (usually 6 years for business correspondence or 10 years for accounting documents) or the assertion, exercise or defense of legal claims arising from contractual relationships (up to four years) or the data is needed to protect the rights of another natural or legal person, we will only delete (that part of) your data after these periods have expired. However, until these periods have expired, we limit the processing of this data to these purposes (fulfillment of the retention obligations).")}.</p> <br />
        <h2><b>Cookies</b></h2> <br />
        <p>{translate("Our website uses cookies. Cookies are small text files consisting of a series of numbers and letters that are saved on the device you use. Cookies are primarily used to exchange information between the device you use and our website. This includes the language settings on a website, the login status or the point at which a video was watched.")}</p>
        <p>{translate("When you visit our websites, two types of cookies are used")}:</p>
        <ul>
            <li><p><span><b>{translate("Temporary cookies (session cookies)")}:</b></span>Diese speichern eine sogenannte Session-ID, mit welcher sich verschiedene Anfragen Ihres Browsers der gemeinsamen Sitzung zuordnen lassen. Die Session-Cookies werden gelöscht, wenn Sie sich ausloggen oder Ihren Browser schließen.</p></li>
            <li><p><span><b>{translate("Permanente Cookies")}:</b></span>{translate("Permanent cookies remain stored even after you close your browser. This allows our website to recognize your computer when you return to our website. These cookies store information about language settings or log-in information, for example. These cookies can also be used to document and store your surfing behavior. This data can be used for statistical, marketing and personalization purposes.")}</p></li>
            </ul>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <FooterTwo />
    </>
  )
}

export default Datenschutz