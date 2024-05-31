'use client'

import React from 'react'
import DataTable from 'react-data-table-component'
import { Adult1Data  , ReservationData , Adult2InfoData , TotalData , BabyData } from '@/data/CustomerBookingData'

const CustomerDetaTable = () => {

    const ColumnReservation_details = [
        {
            name : 'Airline',
            selector : (row) => row.Airline
        },
        {
            name : 'From',
            selector : (row) => row.From
        },
        {
            name : 'To',
            selector : (row) => row.To
        },
        {
            name : 'Date of departure',
            selector : (row) => row.Date_of_departure
        },
        {
            name : 'Date of return flight',
            selector : (row) => row.Date_of_return_flight
        },
        {
            name : 'Offered languages',
            selector : (row) => row.Offered_languages
        },
        {
            name : 'max. luggage per person',
            selector : (row) => row.max_luggage
        },
        {
            name : 'Mekka - (hotel name)',
            selector : (row) => row.Mekka_hotel
        },
        {
            name : 'Madina - (hotel name)',
            selector : (row) => row.Madina_hotel
        },
        {
            name : 'Adult',
            selector : (row) => row.Adult
        },
    ]

    const columnAdu_1 = [
        {
            name : 'name',
            selector : (row) => row.name
        },
        {
            name : 'surname',
            selector : (row) => row.surname
        },
        {
            name : 'email',
            selector : (row) => row.email
        },
        {
            name : 'phone',
            selector : (row) => row.phone
        },
        {
            name : 'city',
            selector : (row) => row.city
        },
        {
            name : 'gender',
            selector : (row) => row.gender
        },
        {
            name : 'DOB',
            selector : (row) => row.DOB
        },
        {
            name : 'Nationality',
            selector : (row) => row.Nationality
        },
        {
            name : 'House_No',
            selector : (row) => row.House_No
        },
        {
            name : 'Zip_code',
            selector : (row) => row.Zip_code
        },
        {
            name : 'Strect',
            selector : (row) => row.Strect
        },
        {
            name : 'FRA',
            selector : (row) => row.FRA
        },
        {
            name : 'additional_services',
            selector : (row) => row.additional_services
        },
    ]

    const columnAduInfo_2 = [
        {
            name : 'name',
            selector : (row) => row.name
        },
        {
            name : 'surname',
            selector : (row) => row.surname
        },
        {
            name : 'gender',
            selector : (row) => row.gender
        },
        {
            name : 'DOB',
            selector : (row) => row.DOB
        },
        {
            name : 'Nationality',
            selector : (row) => row.Nationality
        },
        {
            name : 'additional services',
            selector : (row) => row.additional_services
        },
    ]

    const Baby = [
        {
            name : 'name',
            selector : (row) => row.name
        },
        {
            name : 'surname',
            selector : (row) => row.surname
        },
        {
            name : 'gender',
            selector : (row) => row.gender
        },
        {
            name : 'DOB',
            selector : (row) => row.DOB
        },
        {
            name : 'Nationality',
            selector : (row) => row.Nationality
        },
    ]

    const Total = [
        {
            name : 'Subtotal',
            selector : (row) => row.Subtotal
        },
        {
            name : 'Total',
            selector : (row) => row.Total
        },
        {
            name : 'Amount Paid',
            selector : (row) => row.Amount_Paid
        },
        {
            name : 'Amount Due',
            selector : (row) => row.Amount_Due
        },
    ]

  return (
    <div>
        <h3 className='py-3'>Reservation Details</h3>
    <DataTable title='Reservation Details' columns={ColumnReservation_details} data={ReservationData}  fixedHeader selectableRows highlightOnHover/>
        {/* <h3 className='py-3'></h3> */}
        <br />
    <DataTable title='Adult-1' columns={columnAdu_1} data={Adult1Data}  fixedHeader selectableRows highlightOnHover/>
        {/* <h3 className='py-3'></h3> */}
        <br />
    <DataTable title='Adult-2' columns={columnAduInfo_2} data={Adult2InfoData}  fixedHeader selectableRows highlightOnHover/>
        <br />
    <DataTable title='Adult-3' columns={columnAduInfo_2} data={Adult2InfoData}  fixedHeader selectableRows highlightOnHover/>
        <br />
    <DataTable title='child' columns={columnAduInfo_2} data={Adult2InfoData}  fixedHeader selectableRows highlightOnHover/>
        <br />
    <DataTable title='baby' columns={Baby} data={BabyData}  fixedHeader selectableRows highlightOnHover/>
        <br />
    <DataTable title='Total' columns={Total} data={TotalData}  fixedHeader selectableRows highlightOnHover/>
    </div>
  )
}

export default CustomerDetaTable