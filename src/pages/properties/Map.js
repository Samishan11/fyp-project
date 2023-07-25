import React, { useState } from 'react'
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import axios from 'axios';
import { useContext } from 'react';
import { ListingContext } from '../../context/listingContext';
import { useEffect } from 'react';

function LocationMarker(props) {

    const iconPerson = new L.Icon({
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/678111-map-marker-512.png",
        iconSize: [35, 35],
        iconAnchor: [20, 35],
        popupAnchor: [0, -35]
    });

    const [listingData, setListingData] = useContext(ListingContext)
    const [position, setPosition] = useState(null)
    const [geolocation, setGeolocation] = useState()

    // console.log(props.position)

    useEffect(()=>{
        // console.log(props.property)
    },[])
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng)
            listingData.lat = e.latlng.lat
            listingData.lng = e.latlng.lng
            setListingData(listingData)
            axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`).then(function (res) {
                console.log(res)
                setGeolocation(`${res.data.address?.road}, ${res.data.address?.suburb}, ${res.data.address?.city} - ${res.data.address.postcode}`)
            })
        }
    })

    return position === null ? null : (
        <Marker position={position} icon={iconPerson}>
            <Popup>{geolocation}</Popup>
        </Marker>
    )
}

const Map = () => {

    const position = [27.700769, 85.300140]

    return (
        <MapContainer onClick={(e) => console.log(e)} center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <p position={position}>Place</p> */}
            <LocationMarker></LocationMarker>
        </MapContainer>
    )
}

export default Map