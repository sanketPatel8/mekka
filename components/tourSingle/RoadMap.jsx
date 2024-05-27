import { roadmapData } from "@/data/tourSingleContent";
import { MdVerified } from "react-icons/md";
import React from "react";

export default function RoadMap() {
  return (
    <>
      <div>
      <h2>Hotel for makka</h2><br /><br />
      <p>Dieses elegante Hotel befindet sich in einem Hochhaus an einer belebten Einkaufsstraße, 21 Gehminuten von der Großen Moschee von Mekka, 6 km vom Hochgeschwindigkeitsbahnhof Makkah Haramain und 9 km vom berühmten Zamzam-Brunnen entfernt. Die 900 gemütlich eingerichteten Zimmer und Suiten sind mit Flachbildfernseher und Minikühlschrank ausgestattet. WLAN-Internetzugang und 24-Stunden-Zimmerservice sind ebenfalls verfügbar. Das Hotel verfügt über 2 zwanglose Restaurants und ein Café.</p><br />
      <p>Distance to the Kaaba</p>
      <p>The distance to the Kaaba is 500 m</p><br />
      <p>Food included: </p>
      <p className="text-danger">Not included</p>
      <div className="row my-3">
            <img src='/img/hotel photo/makka-1.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px", objectFit : "cover"}}/>
            <img src='/img/hotel photo/makka-2.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px" , objectFit : "cover"}}/>
            <img src='/img/hotel photo/makka-3.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px" , objectFit : "cover"}}/>
      </div>
      <div className="row my-3">
            <img src='/img/hotel photo/makka-4.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px", objectFit : "cover"}}/>
            <img src='/img/hotel photo/makka-5.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px", objectFit : "cover"}}/>
            <img src='/img/hotel photo/makka-6.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px", objectFit : "cover"}}/>
      </div>
      <div>
        <h3>Hotel Options</h3>
        <div className="row">
          <span className="col"><MdVerified className="mx-2"/>Restaurant</span>
          <span className="col"><MdVerified className="mx-2"/>Wäsche</span>
          <span className="col"><MdVerified className="mx-2"/>Friseur</span>
          <span className="col"><MdVerified className="mx-2"/>Wi-Fi</span>
        </div>
          <span className="col"><MdVerified className="mx-2"/>Fernseher</span>
      </div>
      </div><br /><br />
      <div>
      <h2>Hotel for madina</h2><br /><br />
      <p>In idealer Lage in Al Madinah bietet das View Al Madinah Hotel einen Concierge-Service und kostenfreie Privatparkplätze. Die Unterkunft befindet sich 3,7 km von der Quba-Moschee, 7,3 km von der Qiblatain-Moschee und 7,5 km vom Jabal Ahad Garden Park entfernt. Das Hotel verfügt über ein Restaurant und die Al-Masjid an-Nabawi ist 700 m entfernt. Das Hotel bietet Ihnen klimatisierte Zimmer mit einem Kleiderschrank, einem Wasserkocher, einem Kühlschrank, einem Safe, einem Flachbild-TV und einem eigenen Bad mit Bidet. Im View Al Madinah Hotel genießen Sie ein Buffet oder ein kontinentales Frühstück. Die Mitarbeiter an der Rezeption sprechen Arabisch, Englisch, Türkisch und Urdu und sind Ihnen rund um die Uhr be</p><br />
      <p>Distance to the Mescid</p>
      <p>The distance to the Mescid is 350 m</p><br />
      <p>Food included: </p>
      <p className="text-danger">Breakfast</p>
      <div className="row my-3">
            <img src='/img/hotel photo/madina-1.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px", objectFit : "cover"}}/>
            <img src='/img/hotel photo/madina-2.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px" , objectFit : "cover"}}/>
            <img src='/img/hotel photo/madina-3.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px" , objectFit : "cover"}}/>
      </div>
      <div className="row my-3">
            <img src='/img/hotel photo/madina-4.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px", objectFit : "cover"}}/>
            <img src='/img/hotel photo/madina-5.jpeg' alt="" className="col-sm-4 rounded my-3 " style={{maxHeight : "200px", objectFit : "cover"}}/>
            <img src='/img/hotel photo/madina-6.jpeg' alt="" className="col-sm-4 rounded my-3" style={{maxHeight : "200px", objectFit : "cover"}}/>
      </div>
      <div>
        <h3>Hotel Options</h3>
        <div className="row">
          <span className="col"><MdVerified className="mx-2"/>Restaurant</span>
          <span className="col"><MdVerified className="mx-2"/>Wäsche</span>
          <span className="col"><MdVerified className="mx-2"/>Friseur</span>
          <span className="col"><MdVerified className="mx-2"/>Wi-Fi</span>
        </div>
          <span className="col"><MdVerified className="mx-2"/>Fernseher</span>
      </div>
      </div>
       
    </>
  );
}
