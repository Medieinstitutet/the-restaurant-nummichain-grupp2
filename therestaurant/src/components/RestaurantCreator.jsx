import React, { useState } from 'react';
import useRestaurantCreated from '../hooks/useRestaurantCreator';

const RestaurantCreator = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const { createRestaurant, restaurantExists } = useRestaurantCreated();

  const handleCreateRestaurant = () => {
    createRestaurant(restaurantName);
  };

  return (
    <div>
      <input
        type="text"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        placeholder="Restaurant Name"
      />
      <button
        onClick={handleCreateRestaurant}
        style={{
            background: restaurantExists ? "#ddd" : "",
            cursor: restaurantExists ? "not-allowed" : "pointer",
        }}>
        Create Restaurant
      </button>
    </div>
  );
};

export default RestaurantCreator;
