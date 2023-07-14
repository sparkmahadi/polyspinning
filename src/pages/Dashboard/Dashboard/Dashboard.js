import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import logo from "../../../images/polyspinning logo.png"
import { Bars3Icon, CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, XMarkIcon, } from '@heroicons/react/24/outline';
import SidebarMobile from './SidebarMobile';
import SidebarDesktop from './SidebarDesktop';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarOpen } from '../../../redux/features/dashboard/dashboardSlice';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isSidebarOpen } = useSelector(state => state.dashboard);

    const navigation = [
        { name: 'Back to Home', link: '/home', icon: HomeIcon },
        { name: 'Users', link: 'users', icon: UsersIcon },
        { name: 'Machines', link: 'machines', icon: CalendarIcon },
        { name: 'Products', link: 'products', icon: FolderIcon },
        { name: 'Documents', link: 'documents', icon: InboxIcon },
        { name: 'Reports', link: 'reports', icon: ChartBarIcon },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    // useEffect(()=>{
    //     dispatch(setNavItems(navigation));
    // },[dispatch]);

    return (
        <>
            <Transition.Root show={isSidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => dispatch(setSidebarOpen(false))}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src={"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"}
                                            alt="Your Company"
                                        />
                                    </div>

                                    <SidebarMobile classNames={classNames} navigation={navigation}></SidebarMobile>

                                </div>
                                <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
                                    <Link to={'/'} className="group block flex-shrink-0">
                                        <div className="flex items-center">
                                            <div>
                                                <img
                                                    className="inline-block h-10 w-10 rounded-full"
                                                    src={logo}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-white">Tom Cook</p>
                                                <p className="text-sm font-medium text-indigo-200 group-hover:text-white">View profile</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <SidebarDesktop classNames={classNames} navigation={navigation}/>
        </>
    );
};

export default Dashboard;