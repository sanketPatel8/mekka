'use client'

import React, { useState } from 'react';
import Image from "next/image";
import '@/public/css'

const RadioButton = () => {
    const [roomType, setRoomType] = useState('');
  
    return (
        <div>
            <div className="d-flex items-center justify-between">
                <div className="d-flex items-center">
                    <div className="form-radio">
                        <input
                            type="radio"
                            name="roomType"
                            value="4Bettzimmer"
                            checked={roomType === "4Bettzimmer"}
                            onChange={(e) => setRoomType(e.target.value)}
                        />
                        <div className="form-radio__mark">
                            <div className="form-radio__icon">
                                <Image
                                    width="10"
                                    height="8"
                                    src="/img/icons/check.svg"
                                    alt="icon"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ml-10">4 Bettzimmer (Standard)</div>
                </div>
                <div className="text-14">€ 0,00</div>
            </div>
            <div className="d-flex items-center justify-between">
                <div className="d-flex items-center">
                    <div className="form-radio">
                        <input
                            type="radio"
                            name="roomType"
                            value="3Bettzimmer"
                            checked={roomType === "3Bettzimmer"}
                            onChange={(e) => setRoomType(e.target.value)}
                        />
                        <div className="form-radio__mark">
                            <div className="form-radio__icon">
                                <Image
                                    width="10"
                                    height="8"
                                    src="/img/icons/check.svg"
                                    alt="icon"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ml-10">3 Bettzimmer</div>
                </div>
                <div className="text-14">+100,00€</div>
            </div>
            <div className="d-flex items-center justify-between">
                <div className="d-flex items-center">
                    <div className="form-radio">
                        <input
                            type="radio"
                            name="roomType"
                            value="2Bettzimmer"
                            checked={roomType === "2Bettzimmer"}
                            onChange={(e) => setRoomType(e.target.value)}
                        />
                        <div className="form-radio__mark">
                            <div className="form-radio__icon">
                                <Image
                                    width="10"
                                    height="8"
                                    src="/img/icons/check.svg"
                                    alt="icon"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ml-10">2 Bettzimmer</div>
                </div>
                <div className="text-14">+230,00€</div>
            </div>
            <div className="d-flex items-center justify-between">
                <div className="d-flex items-center">
                    <div className="form-radio">
                        <input
                            type="radio"
                            name="roomType"
                            value="1Bettzimmer"
                            checked={roomType === "1Bettzimmer"}
                            onChange={(e) => setRoomType(e.target.value)}
                        />
                        <div className="form-radio__mark">
                            <div className="form-radio__icon">
                                <Image
                                    width="10"
                                    height="8"
                                    src="/img/icons/check.svg"
                                    alt="icon"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ml-10">1 Bettzimmer</div>
                </div>
                <div className="text-14">+450,00€</div>
            </div>
        </div>
    );
}

export default RadioButton;
