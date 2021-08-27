import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

function Maps(props) {
  const [activeMarker, setActiveMarker] = useState(null);
  if (props.data.length === 0) {
    return <h2> Loading....</h2>;
  } else {
    const handleActiveMarker = (marker) => {
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
    };

    let treesData = props.data;
    const handleOnLoad = (map) => {
        treesData.map((data) => {
        return (
          <div>
            {data.results.map((data) => {
              let position = { lat: data.latitude, lng: data.longitude };
              const bounds = new window.google.maps.LatLngBounds();
              bounds.extend(position);
              return map.fitBounds(bounds);
            })}
          </div>
        );
      });
    };

    return (
      <div>
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          mapContainerStyle={{ width: "100%", height: "700px" }}
        >
          {treesData.map((data) => {
            return (
              <div>
                {data.results.map((data) => {
                  let position = { lat: data.latitude, lng: data.longitude };
                  return (
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
                  );
                })}
              </div>
            );
          })}
        </GoogleMap>
      </div>
    );
  }
}

export default Maps;
