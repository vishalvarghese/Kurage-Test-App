import { Navigate, Outlet } from "react-router-dom";
import {  useSelector } from 'react-redux'


const PrivateRoute = () => {
    const { user } = useSelector((state) => state.user)

  return (
    !user ? <Navigate to="/login" /> : <Outlet />
  )
};
export default PrivateRoute;