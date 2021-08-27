import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import treeData from "./JSON/response_tree_surveys.json";


// const markers = [
//   {
//     id: 1,
//     name: "Chicago, Illinois",
//     position: { lat: 41.881832, lng: -87.623177 }
//   },
//   {
//     id: 2,
//     name: "Denver, Colorado",
//     position: { lat: 39.739235, lng: -104.99025 }
//   },
//   {
//     id: 3,
//     name: "Los Angeles, California",
//     position: { lat: 34.052235, lng: -118.243683 }
//   },
//   {
//     id: 4,
//     name: "New York, New York",
//     position: { lat: 40.712776, lng: -74.005974 }
//   }
// ];

function Maps(props) {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

//   const handleOnLoad = (map) => {
//     const bounds = new window.google.maps.LatLngBounds();
//     markers.forEach(({ position }) => bounds.extend(position));
//     map.fitBounds(bounds);
//   };
  const handleOnLoad = (map) => 
    treeData.map((data) =>{
      return(
      <div>
          {data.results.map((data) =>{
              let position = {lat: data.latitude, lng: data.longitude}
              const bounds = new window.google.maps.LatLngBounds();
              bounds.extend(position);
              return (map.fitBounds(bounds));
            })}
      </div>
      )
  });

  return (
    <div>
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "700px" }}
    >
    {
        treeData.map((data) =>{
            return(
            <div>
                {data.results.map((data) =>{
                    let position = {lat: data.latitude, lng: data.longitude};
                    return(
                    <Marker
                    key={data.id}
                    position={position}
                    onClick={() => handleActiveMarker(data.id)}
                  >
                    {activeMarker === data.id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div>{data.tree_id}</div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                    )
                  })}
            </div>
            )
        })
    }
      {/* {
      markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))} */}
    </GoogleMap>
    </div>
  );
}

export default Maps;