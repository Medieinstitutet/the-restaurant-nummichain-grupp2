import { useState, useEffect } from 'react';
import { useContracts } from './useContract';

const useRestaurantCreated = () => {
  const [restaurantExists, setRestaurantExists] = useState(false);
  const [readContract, writeContract] = useContracts();

  const checkRestaurantExists = async () => {
    try {
      if (!readContract) return;
      const exists = (await readContract.restaurantCount()) > 0;
      setRestaurantExists(exists);
    } catch (error) {
      console.error('Error checking restaurant existence:', error);
    }
  };

  useEffect(() => {
    checkRestaurantExists();
  });

  const createRestaurant = async (restaurantName) => {
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

  return { createRestaurant, restaurantExists };
};

export default useRestaurantCreated;
