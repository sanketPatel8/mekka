import React from 'react'
import { FaMattressPillow } from "react-icons/fa6";

const Extras = () => {
  return (
    <>
        <div className="">
            <h2>Extras</h2><br/>
            <h5>Possible additional services per person:</h5>
            <p>(You can book these individually for each traveler on the next page)</p>

        <div className="my-3">
            <div className="d-flex align-items-center">
                <p className='mx-5'><FaMattressPillow className='mx-2' size={20} color='##DAC04F'/>3 Bettzimmer</p>
                <p>+100,00€</p>
            </div>
            <div className="d-flex align-items-center">
                <p className='mx-5'><FaMattressPillow className='mx-2'size={20} color='##DAC04F'/>2 Bettzimmer</p>
                <p>+230,00€</p>
            </div>
            <div className="d-flex align-items-center ">
                <p className='mx-5'><FaMattressPillow className='mx-2' size={20} color='##DAC04F'/>1 Bettzimmer</p>
                <p>+450,00€</p>
            </div>
        </div>
        </div>
    </>
  )
}

export default Extras