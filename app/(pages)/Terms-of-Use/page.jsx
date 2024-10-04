
"use client" ;
import { useTranslation } from '@/app/context/TranslationContext'
import FooterOne from '@/components/layout/footers/FooterOne'
import FooterTwo from '@/components/layout/footers/FooterTwo'
import Header1 from '@/components/layout/header/Header1'
import Link from 'next/link'


const TermsofUse = () => {

  const {translate} = useTranslation();
   
  return (
    <>
    <Header1 />
    <div className='container'>
      <br /><br /><br /><br />
    <h1 className='text-start'>AGB</h1>    
    <p className="text-center">{translate("General Terms and Conditions of Mekka Booking GmbH")}</p>

    <p className="text-start"><b> 1 {translate("scope")}</b></p><br/>

    <p className="text-start">(1) {translate("These terms and conditions apply in the version valid at the time of conclusion of the contract to the contract between you (hereinafter: customer) and us, Mekka Booking GmbH (Frankfurter Str. 92, 65760 Eschborn, HRB 116404, VAT ID no. DE4022834347) (hereinafter: Mekkabooking), represented by Mr. Kagan Kahraman, via our website")} (<Link href='/' className='text-primary'>https://mekkabooking.dehttps://mekkabooking.de</Link>) </p>

    <p className="text-start">(2) {translate("These terms and conditions apply exclusively at all times. Any terms and conditions of the customer that deviate from, supplement or conflict with these terms and conditions will only become part of the contract if and to the extent that we have expressly agreed to their validity in writing")}.</p>

    <p className="text-start">(3) {translate("The following conditions apply exclusively to the provision of third-party services and are part of the brokerage agreement concluded between you and Mekkabooking. We expressly point out that only the respective third-party provider as tour operator will be your contractual partner for the services booked. No contract for the provision of third-party services is concluded with Mekkabooking.")}</p>

    <p className="text-start">(4) {translate("These terms and conditions do not affect the respective terms and conditions of the third-party providers that apply to the provision of the booked services in the relationship between you and the third-party provider.")}</p>

    <hr />

    <p className="text-start"><b> 2 {translate("Conclusion of the contract with third-party providers")}</b></p><br/>

    <p className="text-start">(1) {translate("The presentation of third-party services on our website as well as the third-party services presented by us by telephone or email do not constitute a legally binding offer, but rather an invitation to book (invitatio ad offerendum).")}</p>

    <p className="text-start">(2) {translate("If you book via our website, you authorize Mekkabooking to arrange the third-party services displayed in the booking overview by clicking the 'Submit booking' button in the last step of the booking process. At the same time, by clicking the 'Submit booking' button, you submit a binding offer to the third-party provider to conclude a contract for the services displayed.")}</p>

    <p className="text-start">(3) {translate("Mekkabooking is authorized to declare acceptance of the offer on behalf of the respective third-party provider. A contract with the third-party provider is concluded when the third-party provider or Mekkabooking accepts the booking of the services by a separate email or sends you an invoice or booked travel documents.")}</p>

    <p className="text-start">(4) {translate("In the case of special and charter flights arranged through us, the terms and conditions of the respective third-party provider apply. All special and charter flights must be reconfirmed by you with the respective airline or other third-party provider at least 48 hours before departure. If this reconfirmation is not made, you have no right to transport.")}</p>

    <p className="text-start">(5) {translate("The contract terms with information on the third-party services booked will be sent to you by email upon acceptance of the contract offer by the respective third-party provider or Mekkabooking or with notification of this. The contract terms and your order data will be stored by MEKKABOOKING for contract processing.")}</p>

    <p className="text-start">(6) {translate("The language available for concluding the contract is exclusively German.")}</p>

    <hr />

    <p className="text-start"><b> 3 {translate("Technical steps of the ordering process")}</b></p><br/>

    <p className="text-start">(1) {translate("As part of the booking process, you can select various tourism services from third-party providers on our website by clicking on the 'Show availability' button. An overview page will then open showing the details of the tourism service. By clicking on the 'Complete booking' button, you will be taken to a page where you can enter your details and select the payment method.")}</p>

    <p className="text-start">(2) {translate("In the last step, an overview page opens where you can check your details and correct any input errors (e.g. regarding payment method or data). If you want to cancel the booking process completely, you can simply close your browser window. Otherwise, after clicking the confirmation button 'Submit booking', your declaration becomes binding within the meaning of Section 2 Paragraph 2 of these Terms and Conditions.")}</p>

    <hr />

    <p className="text-start"><b> 4 {translate("Subject matter of the contract")}</b></p><br/>

    <p className="text-start">(1) {translate("On our website we arrange travel, flight, hotel services and other tourist services (hereinafter: tourist services) from various tour operators, airlines and other third-party providers. Mekkabooking acts exclusively as an agent and arranges contracts for tourist services in the name and on behalf of the respective provider.")}</p>
    
    <p className="text-start">(2) {translate("The subject of the brokerage contract concluded with us is the commissioning of Mekkabooking to broker tourism services from third-party providers. The mutual rights and obligations of you and us arise, unless mandatory legal provisions conflict with this, from the agreements made individually in each individual case, these terms and conditions and, in addition, the relevant legal provisions on the contract in accordance with §§ 662 ff. BGB.")}</p>

    <p className="text-start">(3) {translate("The rights and obligations of the customer towards the respective third-party provider are governed solely by the agreements concluded with the latter, in particular the general terms and conditions used by the latter.")}</p>

    <p className="text-start">(4) {translate("If the respective third-party provider uses general terms and conditions, we will make these available to you before booking. The respective third-party providers are solely responsible for the content of these terms and conditions. In the case of booking transport services, the transport conditions and tariff regulations issued on a legal basis by the responsible transport authority or on the basis of international agreements apply, subject to special agreements.")}</p>

    <p className="text-start">(5) {translate("A booking of tourism services arranged through Mekkabooking is only possible once you have acquired full legal capacity.")}</p>

    <p className="text-start">(6) {translate("Information about tourism services and third-party providers is based on the information we receive from the respective third-party providers. The respective third-party provider is responsible for the completeness, accuracy and timeliness of the information. This does not apply to incorrect information that arises due to a technical error in our booking system, unless we are not responsible for the technical error.")}</p>

    <hr />

    <p className="text-start"><b> 5 {translate("Travel documents")}</b></p><br/>

    <p className="text-start">(1) {translate("With regard to the transmission of travel documents, we refer to the relevant provisions in the travel conditions of the respective third-party provider, which will be made available to you before booking.")}</p>

    <p className="text-start">(2) {translate("If the travel documents are not sent to you directly by the third-party provider, they will be sent electronically by Mekkabooking unless you are entitled to a travel confirmation in paper form in accordance with Art. 250 § 6 Para. 1 Sentence 2 EGBGB.")}</p>

    <p className="text-start">(3) {translate("In the case of booking a package holiday in accordance with §§ 651a ff. BGB, you are equally obliged to check the contract and other documents of the third-party provider relating to the package holiday that we have sent you, in particular booking confirmations, flight tickets, hotel vouchers, insurance certificates and other documents, for accuracy and completeness, in particular for compliance with the booking and the brokerage order. A package holiday is a combination of at least two different types of travel services for the purpose of the same trip (§ 651a para. 1 BGB).")}</p>

    <p className="text-start">(4) {translate("We would like to point out that airlines offer an electronic ticket (e-ticket) instead of a paper ticket. This usually involves sending an electronic booking code in text form (usually by email), which you must state or present at check-in together with an identification document (identity card or passport). Please check this with the airline in question before you travel.")}</p>

    <p className="text-start">(5) {translate("In accordance with EU Regulation No. 2111/2005 on the establishment of a Community list of air carriers, Mekkabooking is obliged to inform you of the identity of the operating airline when arranging air transport services. If the operating airline has not yet been determined at the time of booking, Mekkabooking will provide you with the information available from the third-party provider about the airline that is likely to operate the flight. If the airline changes, you will be informed of the change immediately. The Community list of airlines banned from flying in the European Union is available on the website")} <Link href='https://transport.ec.europa.eu/index_en'>http://ec.europa.eu/transport/modes/air/safety/air-ban/index_de.htm</Link> .</p>

    <hr />

    <p className="text-start"><b> 6 {translate("Service Center")}</b></p><br/>

    <p className="text-start">{translate("Our service center is available to answer any questions you may have about the tourism services we offer. You can reach this center via the contact page in the service area on our website or via the telephone numbers provided in the imprint every day during the times stated there.")}</p>

    <hr />

    <p className="text-start"><b>7 {translate("Right of withdrawal")}</b></p><br/>

    <p className="text-start">{translate("As a consumer, you have a right of withdrawal in accordance with the instructions set out in the appendix. A consumer is any natural person who concludes a legal transaction for purposes that can predominantly be attributed neither to their commercial nor to their independent professional activity.")}</p>

    <hr />

    <p className="text-start"><b> 8 {translate("Customer's obligation to cooperate")}</b></p><br/>

    <p className="text-start">(1) {translate("You are solely responsible for the completeness and accuracy of all data entered or otherwise transmitted by you during the booking process. You must inform us immediately of any changes to the data entered or otherwise transmitted.")}</p>

    <p className="text-start">(2) {translate("In your own interest, you are requested to inform us of any special needs or restrictions with regard to the tourism services requested.")}</p>

    <p className="text-start">(3) {translate("In the event of intentionally false or untrue data being transmitted, we reserve the right to demand compensation for any damage caused as a result.")}</p>

    <hr />

    <p className="text-start"><b> 9 {translate("Processing of personal data")}</b></p><br/>

    <p className="text-start">{translate("We may process and store the data in question to fulfill our contractual obligations within the framework of the applicable legal regulations. For information on the processing of your data, please read our data protection information, which you can access at the following link")} <Link rel="stylesheet" href="" >https://mekkabooking.de/Datenschutz</Link> .</p>

    <hr />

    <p className="text-start"><b> 10 {translate("Prices and payment terms")}</b></p><br/>

    <p className="text-start">(1) {translate("All prices stated on our website are gross prices including statutory sales tax.")}</p>

    <p className="text-start">(2) {translate("The following applies to prices for arranging truck transport services from airlines:")}</p>

    <p className='text-start pl-5'>a) {translate("The prices indicated and invoiced are airline prices and do not include any commission or other fee charged by the airline for Mekkabooking's activities.")}</p>

    <p className='text-start pl-5'>b) {translate("The remuneration of Mekkabooking for the provision of the brokerage activity within the framework of the booking fee to be paid by the customer.")}</p>

    <p className='text-start pl-5'>c) {translate("The service fees incurred by Mekkabooking for its brokerage activities in connection with the flight booking result, unless otherwise agreed in individual cases, from the fees communicated to the customer during the booking process.")}</p>

    <p className="text-start">(3) {translate("The payment of service fees for the provision of other tourism services by the customer requires an appropriate express agreement. Subject to such an agreement, the brokerage activity is free of charge.")}</p>

    <p className="text-start">(4) {translate("Mekkabooking's claim to service fees remains unaffected by service disruptions or changes, in particular rebooking, name changes, withdrawal, cancellation or termination of the brokered contract by the provider or the customer. This does not apply if the customer is entitled to a claim for damages against us due to a breach of the advisory or brokerage obligations.")}</p>

    <hr />

    <p className="text-start"><b> 11 {translate("Payment terms of third-party providers")}</b></p><br/>

    <p className="text-start">(1) {translate("The remuneration and payment of the booked tourism services is determined according to the agreements with the respective third-party provider.")}</p>

    <p className="text-start">(2) {translate("The third-party provider can demand part of the agreed remuneration from the customer in advance as a deposit. In the case of trips within the meaning of §§ 651a ff. BGB, a deposit may only be demanded against or after submission of a security certificate with the name and contact details of the third-party provider's customer money insurer.")}</p>

    <p className="text-start">(3) {translate("The due date of payment depends on the respective agreements with the third-party provider. Remaining payments for trips within the meaning of §§ 651a ff. BGB are due at the latest upon delivery or receipt of the travel plan or travel documents. Deviating from the above, payments for air transport contracts are usually due immediately upon receipt of the airline's confirmation, unless otherwise agreed. The same applies to rental cars.")}</p>

    <p className="text-start">(4) {translate("Depending on the tourism services booked, payment is collected by the respective third-party provider, by Mekkabooking or by a service provider appointed to collect the debt. If Mekkabooking or a service provider appointed by it to collect payments invoices tourism services and collects payments, this is done in the name and on behalf of the respective third-party provider. If Mekkabooking is the third-party provider's authorized collection agent, the above regulations apply accordingly to cancellation costs (cancellation compensation) and other legally or contractually justified claims of the third-party provider.")}

    </p>

    <p className="text-start">(5) {translate("In the case of paragraph 4, payment for the booked tourist services can be made by")}</p>

    <p className="text-start pl-5">- {translate("by Maestro or credit card (VISA, MasterCard, American Express) or")}</p>

    <p className="text-start pl-5">- {translate("by SEPA direct debit.")}</p>

    <p>{translate("Details of the payment methods offered by the third-party provider can be found in the booking history and the terms and conditions of the respective third-party provider.")}</p>
    
    <p>(6) {translate("Mekkabooking is entitled to claim the price for the booked tourism services from the customer on behalf of the third-party provider. Mekkabooking assures that it has the authority to collect the payment.")}</p>

    <p>{translate("Mekkabooking assures that it has the authority to collect payments.")}

    (7) {translate("We reserve the right to charge the customer any chargeback fees for unredeemed credit card charges or bank direct debits.")}</p>
    <hr />

    <p><b> 12 {translate("Contract change with the third-party provider")}</b></p>

    <p>(1) {translate("After the contract with the third-party provider has been concluded, the conditions for any contract changes you request or request (e.g. rebooking) are based on the conditions of the respective third-party provider. Mekkabooking is entitled to invoice you for the rebooking fee requested by the tour operator on behalf of the respective third-party provider and to collect the amount.")}</p>

    <p>(2) {translate("Mekkabooking only accepts special requests for forwarding to the third-party provider. Unless otherwise expressly agreed, Mekkabooking is not responsible for fulfilling such special requests. Nor are they a condition or contractual basis for the brokerage order or for the booking declaration to be sent by Mekkabooking to the third-party provider of a package tour. We expressly point out that special requests generally only become part of the contractual obligations if expressly confirmed by the third-party provider of the package tour.")}</p>

    <p>(3) {translate("If you have booked special and charter flights, you can have a third party replace you in the execution of the trip up until the start of the trip. Any additional costs incurred as a result of this will be at your expense. The amount of the additional costs is always determined by the third party provider and can vary greatly depending on how close the departure date is. The third party provider can object to the change in the person of the traveler if the third party does not meet the special travel requirements or if legal regulations or official orders conflict with this.")}</p>

    <p>(4) {translate("In any case, the terms and conditions agreed with the respective third-party provider shall prevail.")}</p>
    <hr />

    <p><b> 13 {translate("Termination of contract with third-party provider")}</b></p>

    <p>(1) {translate("In the case of a package tour arranged by us, you are entitled to withdraw from the contract with the respective third-party provider at any time before the start of the trip. We would like to point out that the tour operator can demand appropriate compensation from you (cancellation fee), unless unavoidable, extraordinary circumstances occur at the destination or in its immediate vicinity that significantly affect the implementation of the trip or the transport of people to the destination.")}</p>

    <p>(2) {translate("The conditions for termination of the contract, in particular through withdrawal and/or cancellation, are based exclusively on the contractual conditions with the respective third-party provider.")}</p>

    <p>(3) {translate("Mekkabooking is authorized to accept declarations of withdrawal and/or cancellation on behalf of the third-party provider.")}</p>

    <p>(4) {translate("Please note that in the event of cancellation of booked scheduled flights, cancellation fees may be charged by the respective airline (IATA guidelines).")}</p>
    <hr />

    <p><b> 14 {translate("Travel insurance")}</b></p>

    <p>(1) {translate("In order to minimize the risk of costs in the event of cancellations by you, we would like to point out the possibility of taking out travel cancellation insurance when booking the tourism services.")}</p>

    <p>(2) {translate("We would also like to point out that travel cancellation insurance does not usually cover the damage that may arise if you cancel your package holiday after it has started - even if this is not your fault. Travel cancellation insurance must usually be taken out separately.")}</p>

    <p>(3) {translate("We also recommend that you ensure you have adequate international health insurance coverage when travelling outside of Europe.")}</p>

    <p>(4) {translate("The insurance terms and conditions agreed with the insurer are decisive for the conclusion and scope of travel insurance. We would like to point out that these terms and conditions may contain special contractual conditions and/or obligations to cooperate, in particular exclusions of liability (e.g. in the case of pre-existing medical conditions), the obligation to cancel immediately, as well as deadlines for reporting damages and deductibles.")}</p>

    <p>(5) {translate("In the case of travel insurance brokerage, Mekkabooking is not liable for the insurance event that has occurred, provided that we have not provided false information regarding the insurance conditions and the insurer has the right to refuse payment to you due to effectively agreed insurance conditions.")}</p>
    <hr />

    <p><b> 15 {translate("Liability")}</b></p>

    <p>(1) {translate("We assume no liability for the accuracy, completeness and reliability of other third-party content, in particular maps, automatic translations, customer reviews, editorial texts and images of places and regions. Geodata displayed on our website, in particular map representations, are intended solely as a non-binding guide to the local position of the offer. However, the location information provided to you in the offer during the online booking process and/or in the travel confirmation is the only decisive factor for the conclusion of the contract. The exclusion does not apply if we were aware of incorrect and/or inaccurate information or should have been aware of it if we had exercised the necessary care.")}</p>

    <p>(2) {translate("We are liable for damages and reimbursement of expenses in the event of culpable injury to life, body or health as well as in the event of intent and gross negligence. The same applies to the liability of our legal representatives or vicarious agents.")}</p>

    <p>(3) {translate("We are also liable for slightly negligent breach of a material contractual obligation (cardinal obligation). Material contractual obligations are those whose fulfilment enables the proper execution of the contract in the first place and whose compliance the customer can regularly rely on. In the event of a breach of material contractual obligations, however, liability is limited to compensation for the damage typically foreseeable under the contract.")}</p>

    <p>(4) {translate("Any further liability for damages and reimbursement of expenses - regardless of the legal basis - is excluded, in particular liability without fault is excluded. Liability under the Product Liability Act and liability for booking errors under Section 651x of the German Civil Code remain unaffected.")}</p>

    <p>(5) {translate("The above provisions also apply to our legal representatives and vicarious agents if claims are asserted directly against them. We would like to point out that the third-party providers we use are not vicarious agents or legal representatives of us.")}</p>

    <p>(6) {translate("Mekkabooking is not liable for the violation of contractual obligations from the contract concluded with the respective third-party provider for the provision of tourism services. All contractual or legal claims arising from this contract must be asserted against the respective third-party provider. With regard to any claims made by the customer against the third-party provider, Mekkabooking is not obliged to advise on the type, scope, amount, eligibility requirements and deadlines to be observed or other legal provisions.")}</p>

    <p>(7) {translate("If the travel services arranged are a package tour within the meaning of Section 651a of the German Civil Code (BGB), we are deemed to be authorized by the tour operator (third-party provider) to accept notifications of defects and other statements from the customer regarding the package tour. Mekkabooking will immediately inform the third-party provider of such statements from the customer. However, to avoid wasting time, we recommend making the relevant statements directly to the tour guide or the third-party provider's contact point.")}</p>

    <p>(8) {translate("We are not liable for the accuracy of the information provided unless a special information contract has been concluded. An information contract with a primary contractual obligation to provide information only comes into effect if there is an express agreement to that effect.")}</p>

    <p><b> 16 {translate("Force majeure")}</b></p>

    <p>(1) {translate("In cases of force majeure, we are released from our obligation to perform for the duration and to the extent of the impact. Force majeure is any event outside our control that prevents us from fulfilling our obligations in whole or in part, including fire damage, floods, strikes and lawful lockouts, as well as operational disruptions or official orders for which we are not responsible.")}</p>

    <p>(2) {translate("We will notify you immediately of the occurrence and cessation of force majeure and will use our best efforts to remedy the force majeure and limit its effects as far as possible.")}</p>

    <p>(3) {translate("The parties will mutually agree on a deadline after which each party is entitled to withdraw from the contract if the force majeure is not ended within this deadline. The right to terminate the contract for good cause remains unaffected.")}</p>

    <p><b> 17 {translate("Copyright")}</b></p>

    <p>{translate("We are the sole owner of all copyrights or other industrial property rights to images, films and texts published in our online shop or our services. The contract with the customer does not constitute the granting of such rights. The use of images, films and texts is not permitted without our express consent.")}</p>

    <p><b> 18 {translate("Offsetting and retention rights")}</b></p>

    <p>(1) {translate("You are not entitled to offset your claims against ours unless your counterclaims have been legally established or are undisputed.")}</p>

    <p>(2) {translate("You may only exercise a right of retention if your counterclaim arises from the same contract.")}</p>

    <p><b> 19 {translate("Applicable Law")}</b></p>

    <p>{translate("The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the International Sale of Goods, if")}</p>

    <p className="pl-5">(a) {translate("You have your habitual residence in Germany, or")}</p>
    <p className="pl-5">(b) {translate("Your habitual residence is in a country which is not a member of the European Union.")}</p>

    <p>{translate("In the event that you have your habitual residence in a member state of the European Union, German law also applies, without affecting any mandatory provisions of the state in which you have your habitual residence.")}</p>

    <p><b> 20 {translate("Jurisdiction, Online Dispute Resolution and Final Provisions")}</b></p>

    <p>(1) Soweit Sie bei Abschluss des Vertrags Ihren Wohnsitz oder gewöhnlichen Aufenthalt in Deutschland hatten und entweder zum Zeitpunkt der Klageerhebung durch uns aus Deutschland verlegt haben oder Ihr Wohnsitz oder Ihr gewöhnlicher Aufenthaltsort zu diesem Zeitpunkt unbekannt ist, ist Gerichtsstand für alle Streitigkeiten der Sitz unseres Unternehmens in Much.</p>

    <p>(2) Die Europäische Kommission stellt unter<Link href='https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage'> http://ec.europa.eu/consumers/odr/</Link> eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit oder verpflichtet an einem Online-Streitbeteiligungsverfahren teilzunehmen.</p>

    <p>(3) Zur Teilnahme an einem Streitbeilegungsverfahren nach dem Verbraucherstreitbeilegungsgesetz (VSBG) sind wir nicht verpflichtet und nicht bereit.</p>

    <p>(4) Sollten einzelne Bestimmungen dieses Vertrages unwirksam sein, so wird hierdurch der Vertrag im Übrigen nicht berührt. Anstelle der unwirksamer Bestimmungen treten, soweit vorhanden, die gesetzlichen Vorschriften.</p>

    <p><b>Anhang</b></p>

    <h2 className="text-center">WIDERRUFSBELEHRUNG</h2>

    <h2>WIDERRUFSRECHT</h2>

    <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses</p>

    <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>

    <h2 className="text-center">Mekka Booking GmbH</h2>
    <h2 className="text-center">Frankfurter Str. 92</h2>
    <h2 className="text-center">65760 Eschborn am Taunus</h2>
    <h2 className="text-center">E-Mail: info@mekkabooking.de</h2>

    <p>mittels einer eindeutigen Erklärung (zB ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.</p>

    <p>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>

    <h2>FOLGEN DES WIDERRUFS</h2>

    <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.</p>

    <p>Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der den Anteil der bis zum Zeitpunkt, an dem Sie uns von der Ausübung Ihres Widerrufsrechts hinsichtlich dieses Vertrages unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.</p>

    <h3>Muster-Widerrufsformular</h3>

    <p>Wenn Sie Ihren Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie per Post oder E-Mail an uns zurück.</p>

    <p>An:</p>

    <p>Mekka Booking GmbH</p>

    <p>Frankfurter Str. 92</p>

    <p>65760 Eschborn am Taunus</p>

    <p>E-Mail: info@mekkabooking.de</p>

    <p>Hiermit widerrufe/n ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf folgender Waren/die Erbringung der folgenden Dienstleistung/en (*):</p>
        <p className="border border-dark">Bestellt am(*)/erhalten am(*):</p>
        <p className="border border-dark">Name des/der Verbraucher/s: </p>
        <p className="border border-dark">Anschrift des/der Verbraucher/s:</p>
        <p className="border border-dark">Unterschrift des/der Verbraucher/s(nur bei Mitteilung auf Papier):</p>
        <p className="border border-dark">Datum:</p>

        <p>(*) Unzutreffendes streichen.</p>
    </div>
    <FooterTwo />
    </>
  )
}

export default TermsofUse