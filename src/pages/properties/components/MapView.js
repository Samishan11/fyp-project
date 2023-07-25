import React, { useState } from 'react'
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import axios from 'axios';
import { useEffect } from 'react';

function LocationMarker(props) {

    const iconPerson = new L.Icon({
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/678111-map-marker-512.png",
        iconSize: [35, 35],
        iconAnchor: [20, 35],
        popupAnchor: [0, -35]
    });

    const [position, setPosition] = useState(null)
    const [geolocation, setGeolocation] = useState()

    // console.log(props.position)

    useEffect(() => {
        setPosition(props.position)
        axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${props.position.lat}&lon=${props.position?.lng}`).then(function (res) {
            console.log(res)
            setGeolocation(`${res.data.address?.road}, ${res.data.address?.suburb}, ${res.data.address?.city} - ${res.data.address.postcode}`)
        })
    }, [])

    return position === null ? null : (
        <Marker position={position} icon={iconPerson}>
            <Popup>{geolocation}</Popup>
        </Marker>
    )
}

const MapView = (props) => {

    const position = [props.position.lat, props.position.lng]

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <p position={position}>Place</p> */}
            <LocationMarker position={props.position}></LocationMarker>
        </MapContainer>
    )
}

export default MapView