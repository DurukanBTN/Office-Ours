import { APIProvider, Map } from '@vis.gl/react-google-maps'
import "./Maps.css"

const googleapikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ubcCoord = { lat: 49.2593, lng: -123.2475};

const sessions = []

const mapStyles = [
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
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
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
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];

function MapComponent() {

    return (
        <>
            <APIProvider apiKey={googleapikey}>
                <div id="map">
                    <Map
                        defaultCenter={ubcCoord}
                        defaultZoom={14}
                        disableDefaultUI = "true"
                        styles = {mapStyles}
                    />
                </div>
            </APIProvider>
        </>
    )
}

export default MapComponent;