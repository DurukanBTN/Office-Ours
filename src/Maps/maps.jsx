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

// Mock sessions for fallback
const mockSessions = [
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
function MapComponent({ onLocationSelect, selectedLocation, allowLocationSelection = false, sessions = mockSessions, highlightedSession = null, onSessionClick = null }) {

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
                        onClick={allowLocationSelection ? (event) => {
                            const lat = event.detail.latLng.lat;
                            const lng = event.detail.latLng.lng;
                            onLocationSelect({ lat, lng });
                        } : undefined}
                    >
                        {sessions.map(session => {
                            const isHighlighted = highlightedSession && highlightedSession.id === session.id;
                            return (
                                <Marker
                                    key={session.id}
                                    position={{lat: session.lat, lng: session.lng}}
                                    title={session.class}
                                    onClick={() => {
                                        if (onSessionClick) {
                                            onSessionClick(session);
                                        }
                                    }}
                                    // Add visual highlighting for selected session
                                    icon={isHighlighted ? {
                                        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="16" cy="16" r="12" fill="#ff4444" stroke="#ffffff" stroke-width="3"/>
                                                <circle cx="16" cy="16" r="6" fill="#ffffff"/>
                                            </svg>
                                        `),
                                        scaledSize: { width: 32, height: 32 }
                                    } : undefined}
                                />
                            );
                        })}

                        {/* Selected location marker for AddPage */}
                        {allowLocationSelection && selectedLocation && (
                            <Marker
                                position={selectedLocation}
                                title="Selected Location"
                            />
                        )}

                    </Map>
                </div>
            </APIProvider>
        </>
    )
}

export default MapComponent;