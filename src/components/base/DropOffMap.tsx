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
    googleMapsApiKey: 'AIzaSyDAEVtSkMAzJ27Y6ea2rvJQVXTobTNsLik', // Replace this
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
