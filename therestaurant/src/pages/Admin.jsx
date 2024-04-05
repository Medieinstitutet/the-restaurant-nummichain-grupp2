import Login from "../components/Admin/Login";
import NewAdmin from "../components/Admin/NewAdmin";

import '../styles/login.scss'
export const Admin = () => {
    return (
        <>
        <h1>Admin</h1>
        <Login/>
        <NewAdmin/>
        </>
    );
  }