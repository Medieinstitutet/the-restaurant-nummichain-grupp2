
import { NavLink, Routes, Route } from 'react-router-dom';
import CreateRestaurant from '../components/RestaurantCreator';
import '../styles/admin.scss';
import ManageBookings from './ManageBookings';

export const Admin = () => {
    
    return (
        <div className='admin-Page'>
        <div className="admin-container">
            <nav className="admin-sidebar">
                <ul>
                    <li><NavLink to="/admin/create-restaurant">Create Restaurant</NavLink></li>
                    <li><NavLink to="/admin/manage-bookings">Manage Bookings</NavLink></li>
                </ul>
            </nav>
            <main className="admin-content">
                <Routes>
                    <Route path="/create-restaurant" element={<CreateRestaurant />} />
                    <Route path="/manage-bookings" element={<ManageBookings />} />
                </Routes>
            </main>
        </div>
        </div>
    );
};
