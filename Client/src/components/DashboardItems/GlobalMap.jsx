import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './GlobalMap.css'; // Import your CSS file here
import LanguageIcon from '@mui/icons-material/Language';

const GlobalMap = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([20, 0], 2);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Define markers
    const markers = [
      { lat: 37.7749, lng: -122.4194, count: 3 },
      { lat: 51.1657, lng: 10.4515, count: 18 },
      { lat: 55.3781, lng: -3.4360, count: 6 },
      { lat: 45.4215, lng: -75.6972, count: 4 },
      { lat: 40.4637, lng: -3.7492, count: 3 },
      { lat: 46.6034, lng: 1.8883, count: 2 },
      { lat: 35.8617, lng: 104.1954, count: 2 },
    ];

    // Add markers to the map
    markers.forEach((marker) => {
      L.circleMarker([marker.lat, marker.lng], {
        radius: 10,
        fillColor: '#00aaff',
        color: '#00aaff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .bindPopup(`Count: ${marker.count}`)
        .addTo(map);
    });

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="bg-gray-100 p-4" >
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <i className="fas fa-globe mr-2"><LanguageIcon /></i>
            <span className="font-medium">Companies</span>
          </div>
          <button className="flex items-center text-gray-600 border border-gray-300 rounded px-3 py-1 hover:bg-gray-200">
            <i className="fas fa-eye mr-2"></i>
            See all companies
          </button>
        </div>
        <div id="map" className="map-container"></div>
        <div className="legend mt-4" >
          <div className="legend-item">
            <img src="https://placehold.co/20x20/ff0000/ff0000.png" alt="US flag" />
            <span>US 24</span>
          </div>
          <div className="legend-item">
            <img src="https://placehold.co/20x20/000000/000000.png" alt="DE flag" />
            <span>DE 18</span>
          </div>
          <div className="legend-item">
            <img src="https://placehold.co/20x20/ff0000/ff0000.png" alt="UK flag" />
            <span>UK 6</span>
          </div>
          <div className="legend-item">
            <img src="https://placehold.co/20x20/ff0000/ff0000.png" alt="CA flag" />
            <span>CA 4</span>
          </div>
          <div className="legend-item">
            <img src="https://placehold.co/20x20/ff0000/ff0000.png" alt="ES flag" />
            <span>ES 3</span>
          </div>
          <div className="legend-item">
            <img src="https://placehold.co/20x20/ff0000/ff0000.png" alt="FR flag" />
            <span>FR 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;
