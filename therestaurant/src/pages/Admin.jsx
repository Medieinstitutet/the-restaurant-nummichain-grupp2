import React, { useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import CreateRestaurant from '../components/RestaurantCreator';
import '../styles/admin.scss';
import ManageBookings from '../pages/ManageBookings';
// Import other components as needed

export const Admin = () => {
    return (
        <div className="admin-container">
            <nav className="admin-sidebar">
                <ul>
                    <li><NavLink to="/admin/create-restaurant">Create Restaurant</NavLink></li>
                    <li><NavLink to="/admin/manage-bookings">Manage Bookings</NavLink></li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
            <main className="admin-content">
                <Routes>
                    <Route path="/create-restaurant" element={<CreateRestaurant />} />
                    {/* <Route path="/manage-bookings" element={<ManageBookings />} /> */}
                    {/* Define more routes as needed */}
                </Routes>
            </main>
        </div>
    );
};
