import { useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline } from "google-maps-react";
import { PageBreadcrumb } from "../../../../components";

interface MapContainerProps {
  google: any;
}
const polyline = [
  { lat: 37.789411, lng: -122.422116 },
  { lat: 37.785757, lng: -122.421333 },
  { lat: 37.789352, lng: -122.415346 }
];

const BasicGoogleMap = ({ google }: MapContainerProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Basic Example</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="gmaps-basic" className="gmaps relative overflow-hidden">
            <Map
              google={google}
              initialCenter={{ lat: -12.043333, lng: -77.028333 }}
              zoomControlOptions={{
                position: google.maps.ControlPosition.LEFT_TOP,
              }}
            ></Map>
          </div>
        </div>
      </div>
    </div>
  )
}

const MapWithMarkers = ({ google }: MapContainerProps) => {
  const [activeMarker, setActiveMarker] = useState<any>({});
  const [selectedPlace, setSelectedPlace] = useState<any>({});
  const [showingInfoWindow, setShowingInfoWindow] = useState<boolean>(false);

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  // handles operation on marker click
  const onBasicMarkerClick = () => {
    alert("You clicked in this marker");
  };

  // handles operation on marker click
  const onMarkerClick = (props: any, marker: any) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
    setShowingInfoWindow(true);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Markers Google Map</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="gmaps-markers" className="gmaps relative overflow-hidden">
            <Map
              google={google}
              zoom={18}
              initialCenter={{ lat: 21.569874, lng: 71.5893798 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
              zoomControlOptions={{
                position: google.maps.ControlPosition.LEFT_TOP,
              }}
            >
              <Marker
                title={'This is sweet home.'}
                name={'Home sweet home!'}
                position={{ lat: 21.569874, lng: 71.5893798 }}
                onClick={onBasicMarkerClick}
              ></Marker>

              <Marker
                name="Current location"
                title={"Marker with InfoWindow"}
                position={{ lat: 21.56969, lng: 71.5893798 }}
                onClick={onMarkerClick}

              ></Marker>
              <InfoWindow
                marker={activeMarker}
                onClose={onInfoWindowClose}
                visible={showingInfoWindow}
              >
                <div>
                  <p>{selectedPlace.name}</p>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      </div>
    </div>
  )
}

const StreetViewMap = ({ google }: MapContainerProps) => {
  let mapRef: any = useRef();

  /**
   * Activate the street view
   */
  const activateStreetView = (position: { lat: number; lng: number }) => {
    if (mapRef) {
      const mapObj = mapRef.map.getStreetView();
      mapObj.setPov({ heading: 34, pitch: 10 });
      mapObj.setPosition(position);
      mapObj.setVisible(true);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Street View Panoramas Google Map</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="panorama" className="gmaps relative overflow-hidden">
            <Map
              google={google}
              ref={(map: any) => (mapRef = map)}
              zoom={14}
              initialCenter={{ lat: 40.7295174, lng: -73.9986496 }}
              style={{ width: "100%", height: "100%", position: "relative" }}
              streetViewControl={true}
              onReady={() => {
                activateStreetView({ lat: 40.7295174, lng: -73.9986496 });
              }}
            ></Map>
          </div>
        </div>
      </div>
    </div>
  )
}

const PolyLineMap = ({ google }: MapContainerProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Poly Line Map</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="gmaps-types" className="gmaps relative overflow-hidden">
            <Map
              className="map"
              google={google}
              zoom={14}
              style={{ width: "100%", height: "100%", position: "relative" }}
              zoomControlOptions={{
                position: google.maps.ControlPosition.LEFT_TOP,
              }}
            >
              <Polyline
                fillColor="#0000FF"
                fillOpacity={0.35}
                path={polyline}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}
              />
            </Map>
          </div>
        </div>
      </div>
    </div>
  )
}

const LightStyledMap = ({ google }: MapContainerProps) => {
  const mapStyles = [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }, { lightness: 17 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 18 }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 16 }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#dedede" }, { lightness: 21 }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }],
    },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#fefefe" }, { lightness: 20 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
    },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Ultra Light With Labels</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="ultra-light" className="gmaps relative overflow-hidden">
            <Map
              google={google}
              initialCenter={{ lat: -12.043333, lng: -77.028333 }}
              style={{ width: "100%", height: "100%", position: "relative" }}
              styles={mapStyles}
              zoomControlOptions={{
                position: google.maps.ControlPosition.LEFT_TOP,
              }}
            ></Map>
          </div>
        </div>
      </div>
    </div>
  )
}

const DarkStyledMap = ({ google }: MapContainerProps) => {
  const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Dark</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="dark" className="gmaps relative overflow-hidden">
            <Map
              google={google}
              initialCenter={{ lat: -12.043333, lng: -77.028333 }}
              style={{ width: "100%", height: "100%", position: "relative" }}
              styles={mapStyles}
              zoomControlOptions={{
                position: google.maps.ControlPosition.LEFT_TOP,
              }}
            ></Map>
          </div>
        </div>
      </div>
    </div>
  )
}
const GoogleMaps = ({ google }: MapContainerProps) => {
  return (
    <>
      <PageBreadcrumb title="Google" name="Google" breadCrumbItems={["Konrix", "Maps", "Google"]} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <BasicGoogleMap google={google} />
        <MapWithMarkers google={google} />
        <StreetViewMap google={google} />
        <PolyLineMap google={google} />
        <LightStyledMap google={google} />
        <DarkStyledMap google={google} />
      </div>
    </>
  )
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA",
})(GoogleMaps)