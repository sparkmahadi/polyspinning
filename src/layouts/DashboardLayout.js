import React from 'react';
import { Outlet } from 'react-router-dom';
import ToggleBar from '../pages/Dashboard/Dashboard/ToggleBar';
import Dashboard from '../pages/Dashboard/Dashboard/Dashboard';

const DashboardLayout = () => {
    return (
        <>
            <div>
                <Dashboard />

                <div className="flex flex-1 flex-col md:pl-64">
                    <ToggleBar />

                    <main className="flex-1">
                        <div className="py-6">

                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            </div>

                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <Outlet></Outlet>
                            </div>

                        </div>
                    </main>

                </div>
            </div>
        </>
    )

};

export default DashboardLayout;