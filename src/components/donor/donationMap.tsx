import React, { useState } from 'react';

interface Location {
  id: number;
  name: string;
  address: string;
}

const DonationMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const locations: Location[] = [
    { id: 1, name: 'Community Center', address: '123 Main St' },
    { id: 2, name: 'Food Bank', address: '456 Elm St' },
    { id: 3, name: 'Shelter', address: '789 Oak St' },
  ];

  const handleLocationSelect = (id: number) => {
    setSelectedLocation(id);
  };

  return (
    <div>
      <h2>Select a Drop-Off Location</h2>
      <ul>
        {locations.map((location) => (
          <li
            key={location.id}
            style={{
              cursor: 'pointer',
              backgroundColor: selectedLocation === location.id ? '#d3f9d8' : '#fff',
              padding: '10px',
              margin: '5px 0',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
            onClick={() => handleLocationSelect(location.id)}
          >
            <strong>{location.name}</strong>
            <p>{location.address}</p>
          </li>
        ))}
      </ul>
      {selectedLocation && (
        <div>
          <h3>Selected Location:</h3>
          <p>{locations.find((location) => location.id === selectedLocation)?.name}</p>
        </div>
      )}
    </div>
  );
};

export default DonationMap;
