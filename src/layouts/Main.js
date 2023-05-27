import React from 'react';
import Navbar from '../components/common/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;