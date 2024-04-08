import React, { useState, useEffect } from 'react';
import { useContracts } from '../hooks/useContract';

const RestaurantCreator = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantExists, setRestaurantExists] = useState(false);
  const [readContract, writeContract] = useContracts();

  const checkRestaurantExists = async () => {
    try {
      const exists = (await readContract.restaurantCount()) > 0;
      setRestaurantExists(exists);
    } catch (error) {
      console.error('Error checking restaurant existence:', error);
    }
  };

  useEffect(() => {
    checkRestaurantExists();
  });

  const createRestaurant = async () => {
    if (!writeContract) return;

    if (restaurantExists) {
      alert('Restaurant already exists');
      return;
    }

    try {
      const tx = await writeContract.createRestaurant(restaurantName);
      await tx.wait();
      alert('Restaurant created successfully');
      setRestaurantExists(true); 
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
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
        onClick={createRestaurant}
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
