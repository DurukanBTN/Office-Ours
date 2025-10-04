import { APIProvider, Map, Markers } from '@vis.gl/react-google-maps'

const googleapikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ubcCoord = { lat: 49.2593, lng: -123.2475};

const sessions = []

function MapComponent() {

    return (
        <>
            <APIProvider apiKey={googleapikey}>
            <div style={{ height: "500px", width: "100%" }}>
                <Map
                    defaultCenter={ubcCoord}
                    defaultZoom={14}
                    disableDefaultUI = "true"
                />
            </div>
            <div>
            </div>
            </APIProvider>
        </>
    )
}

export default MapComponent;