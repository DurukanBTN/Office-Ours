import { APIProvider, Map, InfoWindow, Marker } from '@vis.gl/react-google-maps'
import { useState } from 'react';
import "./Maps.css"

const googleapikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ubcCoord = { lat: 49.262, lng: -123.247};

const ubcBounds = {
    north: 49.275,  
    south: 49.248,  
    east: -123.226, 
    west: -123.263   
};

const sessions = [
    {
        id: 1,
        position: {lat: 49.2613, lng:-123.2489},
        title: "CPSC 110",
        comment: "Review for midterm"
    }
]

const mapStyles = [
    {
        "featureType": "all",
        "stylers": [
            {
                "saturation": 0
            },
            {
                "hue": "#e7ecf0"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "saturation": -70
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            }
        ]
    }
];
function MapComponent() {

    const [selectedSession, setSelectedSession] = useState(null);

    return (
        <>
            <APIProvider apiKey={googleapikey}>
                <div id="map">
                    <Map
                        defaultCenter = {ubcCoord}
                        defaultZoom = {15}
                        disableDefaultUI = {true}
                        styles = {mapStyles}
                        mapRestriction = {{
                            latlngBounds: ubcBounds,
                            strictBounds: true
                        }}
                        minZoom={13}
                        maxZoom={18}
                        mapID = "StormHacks2025"
                    >
                        {sessions.map(marker => (
                            <Marker
                                key={marker.id}
                                position={marker.position}
                                title={marker.title}
                                onClick={() => setSelectedSession(marker)}
                                // icon={"src\assets\react.svg"}
                            />
                        ))}

                        {selectedSession?.position && (
                            <InfoWindow
                                position={selectedSession.position}
                                onCloseClick={() => setSelectedSession(null)}
                            >
                                <div style={{ padding: '10px' }}>
                                    <h3>{selectedSession.title}</h3>
                                    <p>{selectedSession.comment}</p>
                                </div>
                            </InfoWindow>
                          )}
                    </Map>
                </div>
            </APIProvider>
        </>
    )
}

export default MapComponent;