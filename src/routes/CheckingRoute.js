import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import useCheckAccType from '../hooks/useCheckAccType';
import Spinner from '../components/Spinner/Spinner';
import { toast } from 'react-hot-toast';

const CheckingRoute = ({ children }) => {
    const { user, loading, logOut } = useContext(AuthContext);
    const [accType, isAccLoading] = useCheckAccType(user?.email);
    const location = useLocation();

    if (loading || isAccLoading) {
        return <div><Spinner></Spinner></div>
    }

    if (user && accType === "Admin") {
        return children;
    }

    else{
        toast.error("Sorry, You are not allowed to access this route", {id: 'logout'})
        logOut()
        .then(() => { })
        .catch(e => console.error(e))
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default CheckingRoute;