import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

type Props = {
  points: CollectionPoint[];
  selectedPointId: number | null;
  onPointSelect: (pointId: number) => void;
};

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '16px',
};

const manchester = {
  lat: 53.4808,
  lng: -2.2426,
};

const DropOffMapSelector = ({
  points,
  selectedPointId,
  onPointSelect,
}: Props) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'sharebite-collection-points-map',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '',
  });
  const selectedPoint = points.find((point) => point.id === selectedPointId);

  if (loadError) {
    return (
      <p role="alert">
        The map could not be loaded. You can still choose a collection point
        from the cards.
      </p>
    );
  }

  if (!isLoaded) return <p>Loading collection point map…</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        selectedPoint
          ? { lat: selectedPoint.latitude, lng: selectedPoint.longitude }
          : manchester
      }
      zoom={11}
      options={{
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      {points.map((point) => (
        <Marker
          key={point.id}
          position={{ lat: point.latitude, lng: point.longitude }}
          title={point.name}
          label={point.id === selectedPointId ? '✓' : undefined}
          onClick={() => onPointSelect(point.id)}
        />
      ))}
    </GoogleMap>
  );
};

export default DropOffMapSelector;
