import React from 'react'
import { FaRegClipboard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCurtainsClosed } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import Header1 from '@/components/layout/header/Header1';
import FooterOne from '@/components/layout/footers/FooterOne';


const Impressum = () => {
  return (
    <>
    <Header1 />
    <div className="container">
    <br /><br /><br /><br />
        <h1>Impressum</h1>

        <p className="text-center">Haftungs- und Datenschutzhinweise</p>

       <div className='d-flex flex-row justify-content-center '>
       <div>
       <div className='d-flex gap-4 align-items-center  py-3 m-3 ' style={{border : "2px solid black"}}>
            <div className='mx-3'><FaRegClipboard size={50}/></div>
            <div><p><b>Steuernummer</b></p><p>043 239 18079</p></div>
        </div>
        <div className='d-flex flex-row gap-4 align-items-center p-3 m-3' style={{border : "2px solid black"}}>
            <div className='mx-3'><FaPhoneAlt size={50}/></div>
            <div><p><b>Steuernummer</b></p><p>043 239 18079</p></div>
        </div>
        <div className='d-flex flex-row gap-4 align-items-center p-3 m-3' style={{border : "2px solid black"}}>
            <div className='mx-3'><IoLocationOutline size={50}/></div>
            <div><p><b>Steuernummer</b></p><p>043 239 18079</p></div>
        </div>
       </div>
       <div>
       <div className='d-flex flex-row gap-4 align-items-center p-3 m-3' style={{border : "2px solid black"}}>
            <div className='mx-3'><MdOutlineCurtainsClosed size={50}/></div>
            <div><p><b>Steuernummer</b></p><p>043 239 18079</p></div>
        </div>
        <div className='d-flex flex-row gap-4 align-items-center p-3 m-3' style={{border : "2px solid black"}}>
            <div className='mx-3'><FaUserTie size={50}/></div>
            <div><p><b>Steuernummer</b></p><p>043 239 18079</p></div>
        </div>
       </div>
       </div>

       <p>Durch Nutzung der Webseite und des Kontaktformulars des Anbieters www.mekkabooking.de kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande.</p><br />

       <p>Sofern Sie uns persönliche Daten mitteilen, werden wir diese mit Sorgfalt und entsprechend der Datenschutzrechtlinien Bestimmungen behandeln. Für Fragen und Anregungen stehen wir Ihnen selbstverständlich gerne zur Verfügung.</p><br />

       <p>Ihre Daten werden nicht an dritte weitergegeben. Sofern Sie ausdrücklich zugestimmt haben, werden wir Ihre Daten verwenden um Sie zukünftig über neue Produkte und Neuheiten zu informieren. Sie können Ihre Einwilligung dazu jederzeit widerrufen. Sie haben die Möglichkeit, die über Sie gespeicherten Daten bei uns kostenfrei abzufragen sowie diese ändern oder löschen zu lassen.</p><br />

       <p>Warenzeichen und Marken werden in der Regel nicht als solche kenntlich gemacht. Das Fehlen einer solchen Kennzeichnung bedeutet nicht, dass es sich um einen freien Namen im Sinne des Waren- und Markenzeichenrechts handelt.</p><br />

       <p>Die Informationen auf dieser Webseite sind sorgfältig geprüft und werden regelmäßig aktualisiert. Es wird keine Garantie für die Vollständigkeit, Richtigkeit, und Aktualität gegeben. Alle angaben können jederzeit, ohne gesonderte Ankündigung, entfernt oder geändert werden.</p><br />

       <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p><br />

       <p>Alle Texte, Illustrationen und Fotos stehen im geistigen Eigentum von www.mekkabooking.de und dürfen nicht kopiert oder vervielfältigt werden.</p><br />
        
    </div>
    <FooterOne />
    </>
  ) 
}

export default Impressum