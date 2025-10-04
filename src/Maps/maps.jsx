import { APIProvider, Map } from '@vis.gl/react-google-maps'
import "./Maps.css"

const googleapikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ubcCoord = { lat: 49.262, lng: -123.247};

const ubcBounds = {
    north: 49.275,  
    south: 49.248,  
    east: -123.226, 
    west: -123.263   
};

const sessions = []

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
                    />
                </div>
            </APIProvider>
        </>
    )
}

export default MapComponent;