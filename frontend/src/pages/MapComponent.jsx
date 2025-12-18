import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";

// Marker Colors
const markerColors = {
  red: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  blue: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  green:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  orange:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  gold: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
};

const createIcon = (color) =>
  new L.Icon({
    iconUrl: markerColors[color],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

export default function MapComponent() {
  // 🌿 Source = User's Current Location
  const [source, setSource] = useState(null);

  // Destination points
  const [destinations, setDestinations] = useState([
    {
      id: 2,
      lat: 18.4961,
      lng: 73.8384,
      name: "Destination 1",
      color: "blue",
      distance: null,
      route: [],
    },
    {
      id: 3,
      lat: 18.58,
      lng: 73.77,
      name: "Destination 2",
      color: "green",
      distance: null,
      route: [],
    },
    {
      id: 4,
      lat: 18.45,
      lng: 73.9,
      name: "Destination 3",
      color: "orange",
      distance: null,
      route: [],
    },
    {
      id: 5,
      lat: 18.6,
      lng: 73.9,
      name: "Destination 4",
      color: "gold",
      distance: null,
      route: [],
    },
  ]);

  // 🌿 Get User Current Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSource({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          name: "Your Location",
          color: "red",
        });
      },
      (err) => {
        console.error("Location Error:", err);
        alert("Please enable location access in your browser.");
      }
    );
  }, []);

  // 🌿 Fetch shortest routes when source is ready
  useEffect(() => {
    if (!source) return;

    destinations.forEach((dest) => {
      const url = `https://router.project-osrm.org/route/v1/driving/${source.lng},${source.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!data.routes) return;

          const route = data.routes[0].geometry.coordinates.map((c) => [
            c[1],
            c[0],
          ]);
          const distanceKm = (data.routes[0].distance / 1000).toFixed(2);

          setDestinations((prev) =>
            prev.map((d) =>
              d.id === dest.id ? { ...d, distance: distanceKm, route } : d
            )
          );
        })
        .catch((err) => console.error("Routing error:", err));
    });
  }, [source]);

  // 🌿 Open Google Maps Directions
  const openGoogleMaps = (dest) => {
    if (!source) return;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${source.lat},${source.lng}&destination=${dest.lat},${dest.lng}&travelmode=driving`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <h2>Route Map with Google Directions</h2>

      {/* Wait until source location loads */}
      {!source ? (
        <p>Detecting your location...</p>
      ) : (
        <MapContainer
          center={[source.lat, source.lng]}
          zoom={12}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* 🌿 Source Marker (Current User Location) */}
          <Marker position={[source.lat, source.lng]} icon={createIcon("red")}>
            <Popup>
              <b>{source.name}</b> <br />
              Latitude: {source.lat} <br />
              Longitude: {source.lng}
            </Popup>
          </Marker>

          {/* 🌿 Destination Markers + Routes */}
          {destinations.map((dest) => (
            <div key={dest.id}>
              <Marker
                position={[dest.lat, dest.lng]}
                icon={createIcon(dest.color)}
              >
                <Popup>
                  <b>{dest.name}</b> <br />
                  Latitude: {dest.lat} <br />
                  Longitude: {dest.lng} <br />
                  Distance:{" "}
                  {dest.distance ? `${dest.distance} km` : "Loading..."} <br />
                  <br />
                  <button
                    onClick={() => openGoogleMaps(dest)}
                    style={{
                      padding: "6px 10px",
                      background: "#1976d2",
                      border: "none",
                      color: "white",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Open in Google Maps
                  </button>
                </Popup>
              </Marker>

              {/* Distance Circle */}
              <Circle
                center={[dest.lat, dest.lng]}
                radius={400}
                pathOptions={{
                  color: dest.color,
                  fillColor: dest.color,
                  fillOpacity: 0.1,
                }}
              />

              {/* Shortest Route */}
              {dest.route.length > 0 && (
                <Polyline
                  positions={dest.route}
                  color={dest.color}
                  weight={4}
                />
              )}
            </div>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
