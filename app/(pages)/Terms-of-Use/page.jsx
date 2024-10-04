
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

    <p className="text-start">(1) Für die Vollständigkeit und Richtigkeit sämtlicher von Ihnen im Rahmen des Buchungsprozesses eingegebenen oder sonst übermittelten Daten sind ausschließlich Sie verantwortlich. Änderungen der eingegebenen oder sonst übermittelten Daten haben Sie uns unverzüglich mitzuteilen.</p>

    <p className="text-start">(2) Sie werden in Ihrem eigenen Interesse gebeten, uns auf besondere Bedürfnisse oder Einschränkungen im Hinblick auf die nachgefragten Touristikleistungen hinzuweisen.</p>

    <p className="text-start">(3) Im Fall der Übermittlung vorsätzlich falscher oder unwahrer Daten behalten wir uns vor, den Ersatz für dadurch eingetretene Schäden zu verlangen.</p>

    <hr />

    <p className="text-start"><b>§ 9 Verarbeitung personenbezogener Daten</b></p><br/>

    <p className="text-start">Wir dürfen die betreffenden Daten zur Erfüllung unserer vertraglichen Pflichten im Rahmen der geltenden gesetzlichen Vorschriften verarbeiten und speichern. Für Informationen zur Verarbeitung Ihrer Daten lesen Sie bitte unsere Datenschutzinformation, die Sie unter folgendem Link <Link rel="stylesheet" href="" >https://mekkabooking.de/Datenschutz</Link> abrufen können.</p>

    <hr />

    <p className="text-start"><b>§ 10 Preise und Zahlungsbedingungen</b></p><br/>

    <p className="text-start">(1) Sämtliche Preisangaben auf unserer Website sind Bruttopreise inklusive der gesetzlichen Umsatzsteuer.</p>

    <p className="text-start">(2) Für die Preise bei der Vermittlung von Flugbeförderungsleistungen von Fluggesellschaften gilt:</p>

    <p className='text-start pl-5'>a) Die angegebenen und in Rechnung gestellten Preise sind Preise der Fluggesellschaften, die keine Provision oder ein sonstiges Entgelt der Fluggesellschaft für die Tätigkeit von Mekkabooking beinhalten.</p>

    <p className='text-start pl-5'>b) Die Vergütung von Mekkabooking für die Erbringung der Vermittlungstätigkeit im Rahmen des vom Kunden zu bezahlenden Buchungsentgelt.</p>

    <p className='text-start pl-5'>c) Das für die Vermittlungstätigkeit von Mekkabooking anfallende Serviceentgelte im Zusammenhang mit der Flugbuchung ergibt sich, soweit im Einzelfall nichts anderes vereinbart ist, aus den dem Kunden im Buchungsprozess bekannt gegebenen Entgelten.</p>

    <p className="text-start">(3) Die Zahlung von Serviceentgelten für die Vermittlung sonstiger Touristikleistungen durch den Kunden, bedarf einer entsprechenden ausdrücklichen Vereinbarung. Vorbehaltlich einer solchen Vereinbarung erfolgt die Vermittlungstätigkeit unentgeltlich.</p>

    <p className="text-start">(4) Der Anspruch von Mekkabooking auf Serviceentgelte bleibt durch Leistungsstörungen oder Änderungen, insbesondere Umbuchung, Namenswechsel, Rücktritt, Stornierung oder Kündigung des vermittelten Vertrages durch den Anbieter oder den Kunden unberührt. Dies gilt nicht, soweit dem Kunden ein Schadensersatzanspruch gegen uns wegen Verletzung der Beratungs- oder Vermittlungspflichten zusteht.</p>

    <hr />

    <p className="text-start"><b>§ 11 Zahlungsbedingungen der Drittanbieter</b></p><br/>

    <p className="text-start">(1) Die Vergütung und Zahlung der gebuchten Touristikleistungen bestimmt sich nach den Vereinbarungen mit dem jeweiligen Drittanbieter.</p>

    <p className="text-start">(2) Der Drittanbieter kann vom Kunden einen Teil der vereinbarten Vergütung im Voraus als Anzahlung verlangen. Soweit es sich um Reisen im Sinne der §§ 651a ff. BGB handelt, darf eine Anzahlung nur gegen bzw. nach Übermittlung eines Sicherungsscheines mit Namen und Kontaktdaten des Kundengeldabsicherers des Drittanbieters verlangt werden.</p>

    <p className="text-start">(3) Die Fälligkeit der Zahlung richtet sich nach den jeweiligen Vereinbarungen mit dem Drittanbieter. Restzahlungen auf Reisen im Sinne der §§ 651a ff. BGB werden spätestens mit Aushändigung oder Zugang des Reiseplans bzw. der Reiseunterlagen fällig. Abweichend von Vorstehendem werden Zahlungen für Luftbeförderungsverträge vorbehaltlich anderweitiger Vereinbarungen im Regelfall sofort bei Zugang der Bestätigung der Fluggesellschaft fällig. Entsprechendes gilt bei Mietwagen.</p>

    <p className="text-start">(4) Abhängig von den gebuchten Touristikleistungen erfolgt der Zahlungseinzug durch den jeweiligen Drittanbieter, durch Mekkabooking oder durch einen zum Forderungseinzug eingesetzten Dienstleister. Soweit Mekkabooking oder ein von ihr zum Zahlungseinzug eingesetzter Dienstleister Touristikleistungen in Rechnung stellt und Zahlungen einzieht, geschieht dies im Namen und auf Rechnung des jeweiligen Drittanbieters. Ist Mekkabooking Inkassobevollmächtigte des Drittanbieters, gelten die vorstehenden Regelungen entsprechend für Stornokosten (Rücktrittsentschädigungen) und sonstige gesetzlich oder vertraglich begründete Forderungen des vermittelten Drittanbieters.

    </p>

    <p className="text-start">(5) Die Bezahlung der gebuchten Touristikleistungen kann im Falle des Abs. 4 per</p>

    <p className="text-start pl-5">- per Maestro- oder Kreditkarte (VISA, MasterCard, American Express) oder</p>

    <p className="text-start pl-5">- per SEPA-Banklastschrift erfolgen.</p>

    <p>Einzelheiten zu den vom Drittanbieter angebotenen Zahlungsmitteln können Sie den Angaben im Buchungsverlauf und en Geschäftsbedingungen des jeweiligen Drittanbieters entnehmen.</p>
    
    <p>(6) Mekkabooking ist berechtigt, im Namen des Drittanbieters den Preis für die gebuchten Touristikleistungen gegenüber dem Kunden geltend zu machen. Mekkabooking versichert, Inkassovollmacht zu besitzen.</p>

    <p>geltend zu machen. Mekkabooking versichert, Inkassovollmacht zu besitzen.

    (7) Wir behalten uns das Recht vor, etwaige Rückbelastungsentgelte bei nicht eingelösten Kreditkartenbelastungen oder Banklastschriften dem Kunden in Rechnung zu stellen.</p>
    <hr />

    <p><b>§ 12 Vertragsänderung beim Drittanbieter</b></p>

    <p>(1) Nach Abschluss des Vertrages mit dem Drittanbieter richten sich die Bedingungen für von Ihnen veranlasste oder gewünschte Vertragsänderungen (z.B. Umbuchung) nach den Bedingungen des jeweiligen Drittanbieters. Mekkabooking ist berechtigt, Ihnen das vom Reiseveranstalter hierfür verlangte Umbuchungsentgelt im Namen des jeweiligen Drittanbieters in Rechnung zu stellen und den Betrag einzuziehen.</p>

    <p>(2) Sonderwünsche nimmt Mekkabooking nur zur Weiterleitung an den zu vermittelnden Drittanbieter entgegen. Soweit nichts anderes ausdrücklich vereinbart ist, hat Mekkabooking für die Erfüllung solcher Sonderwünsche nicht einzustehen. Diese sind auch nicht Bedingung oder Vertragsgrundlage für den Vermittlungsauftrag oder für von Mekkabooking an den Drittanbieter einer Pauschalreise zu übermittelnde Buchungserklärung. Wir weisen Sie ausdrücklich darauf hin, dass Sonderwünsche im Regelfall nur durch ausdrückliche Bestätigung des Drittanbieters der Pauschalreise zum Inhalt der vertraglichen Verpflichtungen werden.</p>

    <p>(3) Sofern Sie Sonder- und Charterflüge gebucht haben, können Sie sich bis zum Reisebeginn bei der Durchführung der Reise durch einen Dritten ersetzen lassen. Hierdurch entstehende Mehrkosten gehen zu Ihren Lasten. Die Höhe der Mehrkosten wird stets durch den Drittanbieter bestimmt und kann je nach zeitlicher Nähe des Abreisetages sehr stark variieren. Der leistende Drittanbieter kann dem Wechsel in der Person des Reisenden widersprechen, wenn der Dritte den besonderen Reiseerfordernissen nicht genügt oder gesetzliche Vorschriften oder behördliche Anordnungen entgegenstehen.</p>

    <p>(4) In jedem Fall haben die mit dem jeweiligen Drittanbieter vereinbarten Bedingungen Vorrang.</p>
    <hr />

    <p>§ 13 Vertragsbeendigung mit Drittanbieter</p>

    <p>(1) Im Falle einer vermittelten Pauschalreise sind Sie berechtigt jederzeit vor Reisebeginn vom Vertrag mit dem jeweiligen Drittanbieter zurückzutreten. Wir weisen Sie daraufhin, dass der Reiseveranstalter von Ihnen eine angemessene Entschädigung verlangen kann (Rücktrittsgebühr), es sei denn, dass am Bestimmungsort oder in dessen unmittelbarer Nähe unvermeidbare, außergewöhnliche Umstände auftreten, die die Durchführung der Reise oder die Personenbeförderung an den Bestimmungsort erheblich beeinträchtigen.</p>

    <p>(2) Die Bedingungen für die Vertragsbeendigung, insbesondere durch Rücktritt und/oder Stornierungen richten sich ausschließlich nach denn Vertragsbedingungen mit dem jeweiligen Drittanbieter.</p>

    <p>(3) Mekkabooking ist ermächtigt, Rücktritts- und/oder Stornierungserklärungen für den Drittanbieter entgegenzunehmen.</p>

    <p>(4) Wir weisen Sie darauf hin, dass im Falle der Stornierung von gebuchten Linienflügen Stornogebühren bei der jeweiligen Fluggesellschaft (IATA-Richtlinie) anfallen können.</p>
    <hr />

    <p><b>§ 14 Reiseversicherungen</b></p>

    <p>(1) Zur Minimierung eines Kostenrisikos bei von Ihnen erklärten Stornierungen, weisen wir auf die Möglichkeit zum Abschluss einer Reiserücktrittskostenversicherung bei Buchung der Touristikleistungen hin.</p>

    <p>(2) Wir weisen weiterhin darauf hin, dass eine Reiserücktrittskostenversicherung üblicherweise nicht den entstehenden Schaden abdeckt, der Ihnen durch einen - auch unverschuldeten - Abbruch der Inanspruchnahme der Pauschalreise nach deren Antritt entstehen kann. Eine Reiseabbruchversicherung ist in der Regel gesondert abzuschließen.</p>

    <p>(3) Wir empfehlen bei Reisen ins nichteuropäische Ausland zudem auf einen ausreichenden Auslandskrankenversicherungsschutz zu achten.</p>

    <p>(4) Maßgeblich für den Abschluss und Umfang von Reiseversicherungen sind die mit dem Versicherer vereinbarten Versicherungsbedingungen. Wir weisen Sie darauf hin, dass diese Bedingungen besondere Vertragsbedingungen und/oder Mitwirkungspflichten, insbesondere Haftungsausschlüsse (z.B. bei Vorerkrankungen), die Obliegenheit zur unverzüglichen Stornierung sowie Fristen für die Schadensanzeige und Selbstbehalte enthalten können.</p>

    <p>(5) Im Fall der Vermittlung von Reiseversicherungen haftet Mekkabooking nicht für den eingetretenen Versicherungsfall, soweit wir keine Falschauskunft bezüglich der Versicherungsbedingungen getätigt haben und dem Versicherer aufgrund wirksam vereinbarter Versicherungsbedingungen ein Leistungsverweigerungsrecht gegenüber Ihnen zusteht.</p>
    <hr />

    <p><b>§ 15 Haftung</b></p>

    <p>(1) Wir übernehmen keinerlei Gewähr für die Richtigkeit, Vollständigkeit und Zuverlässigkeit von sonstigen Inhalten Dritter, insbesondere Landkarten, automatischen Übersetzungen, Kundenbewertungen, redaktionellen Texten und Bildern zu Orten und Regionen. Auf unserer Website angezeigte Geodaten, insbesondere Kartendarstellungen, dienen lediglich der unverbindlichen Orientierung über die örtliche Position des Angebots. Maßgeblich für den Vertragsschluss sind jedoch allein die Ortsangaben, die Ihnen im Angebot innerhalb des Online- Buchungsvorgangs und/oder in der Reisebestätigung gemacht werden. Der Ausschluss gilt nicht, soweit uns fehlerhafte und/oder unrichtige Angaben bekannt waren oder bei Anwendung der erforderlichen Sorgfalt hätten bekannt sein müssen.</p>

    <p>(2) Wir haften auf Schadens- und Aufwendungsersatz bei schuldhafter Verletzung des Lebens, des Körpers und der Gesundheit sowie bei Vorsatz und grober Fahrlässigkeit. Gleiches gilt für die Haftung unserer gesetzlichen Vertreter oder Erfüllungsgehilfen.</p>

    <p>(3) Wir haften ferner bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht). Wesentliche Vertragspflichten sind solche, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf. Bei der Verletzung wesentlicher Vertragspflichten ist die Haftung jedoch der Höhe nach auf den Ersatz des vertragstypisch vorhersehbaren Schadens begrenzt.</p>

    <p>(4) Jede weitere Haftung auf Schadens- und Aufwendungsersatz - gleich aus welchem Rechtsgrund - ist ausgeschlossen, insbesondere ist die Haftung ohne Verschulden ausgeschlossen. Die Haftung nach dem Produkthaftungsgesetz sowie die Haftung für Buchungsfehler nach § 651x BGB bleibt davon unberührt.</p>

    <p>(5) Die vorstehenden Bestimmungen gelten auch zugunsten unserer gesetzlichen Vertreter und Erfüllungsgehilfen, wenn Ansprüche direkt gegen diese geltend gemacht werden. Wir weisen darauf hin, dass die vermittelten Drittanbieter keine Erfüllungsgehilfen oder gesetzlichen Vertreter von uns sind.</p>

    <p>(6) Mekkabooking haftet nicht für die Verletzung von Vertragspflichten aus dem mit dem jeweiligen Drittanbieter geschlossenen Vertrag über die Erbringung von Touristikleistungen. Sämtliche vertragliche oder gesetzliche Ansprüche aus diesem Vertrag sind grundsätzlich gegenüber dem jeweiligen Drittanbieter geltend zu machen. Bezüglich etwaiger Ansprüche des Kunden gegenüber dem vermittelten Drittanbieter besteht keine Pflicht von Mekkabooking zur Beratung über Art, Umfang, Höhe, Anspruchsvoraussetzungen und einzuhaltende Fristen oder sonstige rechtliche Bestimmungen.</p>

    <p>(7) Handelt es sich bei den vermittelten Touristikleistungen um eine Pauschalreise im Sinne des § 651a BGB, gelten wir als vom Reiseveranstalter (Drittanbieter) bevollmächtigt, Mängelanzeigen sowie andere Erklärungen des Kunden bezüglich der Pauschalreise entgegenzunehmen. Mekkabooking wird den Drittanbieter unverzüglich von solchen Erklärungen des Kunden in Kenntnis setzen. Zur Vermeidung von Zeitverlusten empfehlen wir jedoch entsprechende Erklärungen unmittelbar gegenüber der Reiseleitung oder der Kontaktstelle des Drittanbieters abzugeben.</p>

    <p>(8) Für die Richtigkeit erteilter Auskünfte haften wir nicht, es sei denn, dass ein besonderer Auskunftsvertrag abgeschlossen wurde. Ein Auskunftsvertrag mit einer vertraglichen Hauptpflicht zur Auskunftserteilung kommt nur bei einer entsprechenden ausdrücklichen Vereinbarung zustande.</p>

    <p><b>§ 16 Höhere Gewalt</b></p>

    <p>(1) In Fällen höherer Gewalt sind wir für die Dauer und im Umfang der Auswirkung von der Verpflichtung zur Leistung befreit. Höhere Gewalt ist jedes außerhalb des Einflussbereichs von uns liegende Ereignis, durch das wir ganz oder teilweise an der Erfüllung unserer Verpflichtungen gehindert werden, einschließlich Feuerschäden, Überschwemmungen, Streiks und rechtmäßiger Aussperrungen sowie nicht von uns verschuldeter Betriebsstörungen oder behördlicher Verfügungen.</p>

    <p>(2) Wir werden Ihnen unverzüglich den Eintritt sowie den Wegfall der höheren Gewalt anzeigen und uns nach besten Kräften bemühen, die höhere Gewalt zu beheben und in ihren Auswirkungen soweit wie möglich zu beschränken.</p>

    <p>(3) Die Parteien werden einvernehmlich eine Frist bestimmen, nach dessen Ablauf jede Partei berechtigt ist, von dem Vertrag zurückzutreten, wenn die höhere Gewalt nicht innerhalb dieser Frist beendet ist. Das Recht den Vertrag aus wichtigem Grund zu kündigen, bleibt unberührt.</p>

    <p><b>§ 17 Urheberrecht</b></p>

    <p>Alle Urheberrechte oder sonstige gewerbliche Schutzrechte an Bildern, Filmen und Texten, die in unserem Online-Shop oder unseren Dienstleistungen veröffentlicht werden, stehen ausschließlich uns zu. Der Vertrag mit dem Kunden begründet nicht die Einräumung solcher Rechte. Eine Verwendung der Bilder, Filme und Texte, ist ohne unsere ausdrückliche Zustimmung nicht gestattet.</p>

    <p><b>§ 18 Aufrechnung und Zurückbehaltungsrecht</b></p>

    <p>(1) Sie sind nicht berechtigt, gegenüber unseren Forderungen aufzurechnen, es sei denn, Ihre Gegenansprüche sind rechtskräftig festgestellt oder unbestritten.</p>

    <p>(2) Sie dürfen ein Zurückbehaltungsrecht nur dann ausüben, wenn Ihr Gegenanspruch aus demselben Vertrag herrührt.</p>

    <p><b>§ 19 Anwendbares Recht</b></p>

    <p>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts, wenn</p>

    <p className="pl-5">(a) Sie Ihren gewöhnlichen Aufenthalt in Deutschland haben, oder</p>
    <p className="pl-5">(b) Ihr gewöhnlicher Aufenthalt in einem Staat ist, der nicht Mitglied der Europäischen Union ist.</p>

    <p>Für den Fall, dass Sie Ihren gewöhnlichen Aufenthalt in einem Mitgliedsland der Europäischen Union haben, gilt ebenfalls die Anwendbarkeit des deutschen Rechts, wobei zwingende Bestimmungen des Staates, in dem Sie Ihren gewöhnlichen Aufenthalt haben, unberührt bleiben.</p>

    <p><b>§ 20 Gerichtsstand, Online-Streitbeilegung und Schlussbestimmung</b></p>

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