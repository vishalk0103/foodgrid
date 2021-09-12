import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoidmlzaGFsNzg5OSIsImEiOiJja3Q4YmVtZWkxMHFtMm9sYXlsMDIybHVwIn0.wlqyFdeNAF2RXZ1rv8CEJA";

export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(15);


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: props.location.coordinates,
      zoom: zoom,
    });
    const marker = new mapboxgl.Marker({
      color: "black",
      draggable: false,
    })
      .setLngLat(props.location.coordinates)
      .addTo(map.current);
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
