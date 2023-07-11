import React from 'react';
import logo from "../../../images/polyspinning logo.png"
import {  Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNav } from '../../../redux/features/dashboard/dashboardSlice';

const SidebarDesktop = ({classNames}) => {
  const dispatch = useDispatch();
  
  const {activeNav, navItems: navigation} = useSelector(state => state.dashboard);
  
    return (
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-indigo-700">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <Link to={'/'} className="flex flex-shrink-0 items-center px-4">
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt="PolySpinning"
                />
              </Link>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                  onClick={()=>dispatch(setActiveNav(item.name))}
                    key={item.name}
                    to={item.link}
                    className={classNames(
                      item.name === activeNav ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
              <Link to={'profile'} className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Tom Cook</p>
                    <p className="text-xs font-medium text-indigo-200 group-hover:text-white">View profile</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
    );
};

export default SidebarDesktop;