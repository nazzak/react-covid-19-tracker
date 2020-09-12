import React from 'react'
import "./Map.css"
import { Map as LeafletMap, TileLayer} from "react-leaflet"
import { showDataOnMap } from '../util'


const Map = (props) => {
    return (
        <div className="map">
            <LeafletMap center={props.center} zoom={props.zoom}>
            <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* loop through countries and draw cercles */}
        {showDataOnMap(props.countries, props.casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
