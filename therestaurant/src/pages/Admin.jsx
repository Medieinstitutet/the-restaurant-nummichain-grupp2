import Login from "../components/Admin/Login";
import NewAdmin from "../components/Admin/NewAdmin";
import SeatingChart from"../UI/Seatings/SeatingChart";
import AdminBookings from "../components/Admin/AdminBookings"
import '../styles/login.scss'
export const Admin = () => {
    return (
        <>
        <h1>Admin</h1>
        <Login/>
        <NewAdmin/>
        <AdminBookings/>
        <SeatingChart/>
        </>
    );
  }