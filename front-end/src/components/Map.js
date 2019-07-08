import React, { useState, useEffect } from 'react'
import ReactMap, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/src/css/mapbox-gl.css'
import { ParkCard } from './ParkCard'

export const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 38.560954,
    longitude: -98.935240,
    zoom: 4,
    width: '100vw',
    height: '90vh'
  })
  const [selected, setSelected] = useState(null)

  const getLat = (park) => park.latLong.slice(4).split(", long:").map(num => parseFloat(num))[0]
  const getLong = (park) => park.latLong.slice(4).split(", long:").map(num => parseFloat(num))[1]

  useEffect(() => {
    const listener = e => e.key === "Escape" && setSelected(null)
    window.addEventListener("keydown", listener)
    return () => window.removeEventListener("keydown", listener)
  }, [])

  const parkMarker = park => {
    return (
      <Marker
        key={park.id}
        latitude={getLat(park)}
        longitude={getLong(park)}
      >
        <button className="marker-btn" onClick={e => {
          e.preventDefault()
          setSelected(park)
        }} >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1d/US-NationalParkService-Logo.svg"
            alt="Park Logo" />
        </button>
      </Marker>
    )
  }

  return (
    <div>
      <ReactMap
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiaGFueHUyNyIsImEiOiJjanh1ajF5bTIxNXZhM2xyczF4cXN4ZjJqIn0.058kHvghPXmU2LOnp_9bwA"
        mapStyle='mapbox://styles/hanxu27/cjxujyxc99bwq1cs1kk4duz8a'
        onViewportChange={viewport => setViewport(viewport)}
      >
        {props.parks.map(parkMarker)}
        {selected && (
          < Popup latitude={getLat(selected)} longitude={getLong(selected)} onClose={() => setSelected(null)}>
            <ParkCard park={selected} showPark={props.showPark} />
          </Popup>
        )}
      </ReactMap>
    </div >
  )
}
