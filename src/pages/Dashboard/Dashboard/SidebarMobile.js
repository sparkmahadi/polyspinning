import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveNav } from '../../../redux/features/dashboard/dashboardSlice';

const SidebarMobile = ({classNames}) => {
    const dispatch = useDispatch();
    const {navItems: navigation, activeNav} = useSelector(state => state.dashboard);
    return (
        <nav className="mt-5 space-y-1 px-2">
            {navigation.map((item) => (
                <Link
                onClick={()=>dispatch(setActiveNav(item.name))}
                    key={item.name}
                    to={item.link}
                    className={classNames(
                        item.name === activeNav
                            ? 'bg-indigo-800 text-white'
                            : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    )}
                >
                    <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

export default SidebarMobile;