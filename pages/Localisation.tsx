
import React, { useState, useEffect } from 'react';
import { Navigation, Loader } from 'lucide-react';
import { Listing } from '../types';

interface LocalisationProps {
  listings: Listing[];
}

export const Localisation: React.FC<LocalisationProps> = ({ listings }) => {
  const [mapUrl, setMapUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listings.length > 0) {
      // Calculate bounding box to fit all listings
      let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
      listings.forEach(l => {
        if (l.location.lat < minLat) minLat = l.location.lat;
        if (l.location.lat > maxLat) maxLat = l.location.lat;
        if (l.location.lng < minLng) minLng = l.location.lng;
        if (l.location.lng > maxLng) maxLng = l.location.lng;
      });

      // Add some padding to the bbox to ensure markers are not on the edge
      const latPadding = (maxLat - minLat) * 0.1 || 0.05;
      const lngPadding = (maxLng - minLng) * 0.1 || 0.05;
      const bbox = `${minLng - lngPadding},${minLat - latPadding},${maxLng + lngPadding},${maxLat + latPadding}`;
      
      // Create marker string for the URL
      const markers = listings.map(l => `marker=${l.location.lat},${l.location.lng}`).join('&');
      
      setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markers}`);
    } else {
      // Default view centered on Cameroon if no listings are available
      const defaultBbox = "8.0,3.0,16.0,13.0"; 
      setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${defaultBbox}&layer=mapnik`);
    }
  }, [listings]);

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Create a small bounding box around the user to zoom in
          const delta = 0.05; // Zoom level
          const bbox = `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`;
          
          // Update the iframe URL to show the user's position with a marker
          setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`);
          setLoading(false);
        },
        (error) => {
          console.error("Erreur GPS", error);
          let msg = "Impossible d'accéder à votre position.";
          if (error.code === 1) msg = "Veuillez autoriser l'accès à la localisation.";
          else if (error.code === 2) msg = "Position indisponible. Vérifiez votre GPS.";
          else if (error.code === 3) msg = "Délai d'attente dépassé.";
          
          alert(msg);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Votre navigateur ne supporte pas la géolocalisation.");
    }
  };

  return (
    // Height calculation: 100vh - (TopBar 64px + BottomNav 64px) = 128px
    <div className="h-[calc(100vh-128px)] relative bg-gray-200 w-full overflow-hidden">
      
      {/* Interactive Map (Iframe) */}
      {mapUrl ? (
        <iframe 
          title="Carte des annonces"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          src={mapUrl}
          className="w-full h-full border-0"
          allow="geolocation"
        ></iframe>
      ) : (
         <div className="w-full h-full flex items-center justify-center">
            <Loader className="animate-spin text-teal-600" size={48} />
        </div>
      )}
      
      {/* GPS Controls at the bottom */}
      <div className="absolute bottom-6 left-4 right-4 z-10 flex justify-center pointer-events-none">
        <button 
            onClick={handleGetLocation}
            className="bg-teal-600 p-3 rounded-full shadow-lg flex items-center justify-center gap-2 text-white font-bold hover:bg-teal-700 transition-colors text-xs sm:text-sm pointer-events-auto"
            disabled={loading}
        >
            {loading ? <Loader className="animate-spin" size={18} /> : <Navigation size={18} />}
            {loading ? "Localisation..." : "Me localiser"}
        </button>
      </div>
    </div>
  );
};
