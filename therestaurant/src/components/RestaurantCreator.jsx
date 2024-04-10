import { useState } from 'react';
import useRestaurantCreated from '../hooks/useRestaurantCreator';
import '../styles/restaurantCreator.scss';

const RestaurantCreator = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const { createRestaurant, restaurantExists } = useRestaurantCreated();

  const handleCreateRestaurant = () => {
    createRestaurant(restaurantName);
  };

  return (
    <div className="restaurant-creator-container">
      <div className="restaurant-input-container">
      <input
        type="text"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        placeholder="Restaurant Name"
      />
      </div>
      <button
        className="restaurant-creator-button"
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
