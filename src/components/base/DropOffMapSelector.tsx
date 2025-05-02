import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

type Props = {
  onLocationSelect: (lat: number, lng: number) => void;
};

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 6.5244, // Default center (Lagos, for example)
  lng: 3.3792,
};

const DropOffMapSelector: React.FC<Props> = ({ onLocationSelect }) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDAEVtSkMAzJ27Y6ea2rvJQVXTobTNsLik  ', // Replace this
  });

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarker({ lat, lng });
      onLocationSelect(lat, lng);
    }
  }, [onLocationSelect]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker || center}
      zoom={13}
      onClick={onMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
};

export default DropOffMapSelector;
