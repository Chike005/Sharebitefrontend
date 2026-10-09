// components/base/DropOffMap.tsx

import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

type DropOffMapProps = {
  lat: number;
  lng: number;
};

const containerStyle = {
  width: '100%',
  height: '300px',
};

const DropOffMap: React.FC<DropOffMapProps> = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'sharebite-collection-points-map',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '',
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={14}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default DropOffMap;
