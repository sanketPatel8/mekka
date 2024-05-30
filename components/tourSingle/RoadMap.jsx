import React from "react";
import "react-image-lightbox/style.css"; 
import { MdVerified } from "react-icons/md";
import HotelGallary from "./Galleries/HotelGallary";

const RoadMap = () => {
  return (
    <>
      <div>
        <h4>Hotel for Makkah</h4>
        <p>
          Dieses elegante Hotel befindet sich in einem Hochhaus an einer
          belebten Einkaufsstraße, 21 Gehminuten von der Großen Moschee von
          Mekka, 6 km vom Hochgeschwindigkeitsbahnhof Makkah Haramain und 9 km
          vom berühmten Zamzam-Brunnen entfernt. Die 900 gemütlich eingerichteten
          Zimmer und Suiten sind mit Flachbildfernseher und Minikühlschrank
          ausgestattet. WLAN-Internetzugang und 24-Stunden-Zimmerservice sind
          ebenfalls verfügbar. Das Hotel verfügt über 2 zwanglose Restaurants und
          ein Café.
        </p>
        <br />
        <p>Distance to the Kaaba</p>
        <p>The distance to the Kaaba is 500 m</p>
        <br />
        <p>Food included: </p>
        <p className="text-danger">Not included</p>

        <HotelGallary name='makka' /> 

        <br />
        <div>
          <h4>Hotel Options</h4>
          <div className="row">
            <span className="col">
              <MdVerified className="mx-2" />
              Restaurant
            </span>
            <span className="col">
              <MdVerified className="mx-2" />
              Wäsche
            </span>
            <span className="col">
              <MdVerified className="mx-2" />
              Friseur
            </span>
            <span className="col">
              <MdVerified className="mx-2" />
              Wi-Fi
            </span>
          </div>
          <span className="col">
            <MdVerified className="mx-2" />
            Fernseher
          </span>
        </div>
      </div>
      <br />
      <div>
        <h2>Hotel for Madina</h2>
        <p>
          In idealer Lage in Al Madinah bietet das View Al Madinah Hotel einen
          Concierge-Service und kostenfreie Privatparkplätze. Die Unterkunft
          befindet sich 3,7 km von der Quba-Moschee, 7,3 km von der
          Qiblatain-Moschee und 7,5 km vom Jabal Ahad Garden Park entfernt. Das
          Hotel verfügt über ein Restaurant und die Al-Masjid an-Nabawi ist 700
          m entfernt. Das Hotel bietet Ihnen klimatisierte Zimmer mit einem
          Kleiderschrank, einem Wasserkocher, einem Kühlschrank, einem Safe,
          einem Flachbild-TV und einem eigenen Bad mit Bidet. Im View Al
          Madinah Hotel genießen Sie ein Buffet oder ein kontinentales
          Frühstück. Die Mitarbeiter an der Rezeption sprechen Arabisch,
          Englisch, Türkisch und Urdu und sind Ihnen rund um die Uhr behilflich.
        </p>
        <br />
        <p>Distance to the Mescid</p>
        <p>The distance to the Mescid is 350 m</p>
        <br />
        <p>Food included: </p>
        <p className="text-danger">Breakfast</p>
        
        <HotelGallary name='madina' /> 
        <div>
          <br />
          <h3>Hotel Options</h3>
          <div className="row">
            <span className="col">
              <MdVerified className="mx-2" />
              Restaurant
            </span>
            <span className="col">
              <MdVerified className="mx-2" />
              Wäsche
            </span>
            <span className="col">
              <MdVerified className="mx-2" />
              Friseur
            </span>
            <span className="col">
              <MdVerified className="mx-2" />
              Wi-Fi
            </span>
          </div>
          <span className="col">
            <MdVerified className="mx-2" />
            Fernseher
          </span>
          <br />
        </div>
      </div>
    </>
  );
};

export default RoadMap;
